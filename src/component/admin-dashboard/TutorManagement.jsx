import React, { useState, useEffect } from 'react'
import { Pencil, Trash2, Plus, X, Check, AlertCircle, Eye, EyeOff, Upload } from 'lucide-react'
import toast from 'react-hot-toast'
import { getAllTeachersAdmin, createTeacherAdmin, updateTeacherAdmin, deleteTeacherAdmin } from '../../api/api/teacherApi'
import { uploadToCloudinary } from '../../utils/cloudinaryUpload'

const EMPTY_FORM = {
  name: '',
  qualification: '',
  position: '',
  expertise: '',
  image: '',
  description: '',
  highlights: '',
  active: true,
}

const normalizeTeacher = (t) => ({
  id: t.id || t._id,
  name: t.fullName || t.name || '',
  qualification: t.qualification || t.mainSubject || '',
  position: t.speciality || t.specialization || t.position || '',
  expertise: Array.isArray(t.expertise) ? t.expertise : String(t.mainSubject || '').split(',').map(s => s.trim()).filter(Boolean),
  image: t.photoUrl || t.image || '',
  description: t.bio || t.description || '',
  highlights: Array.isArray(t.highlights) ? t.highlights : [],
  active: t.active !== false,
})


export default function TutorManagement() {
  const [tutors, setTutors] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState(EMPTY_FORM)
  const [saving, setSaving] = useState(false)
  const [deletingId, setDeletingId] = useState(null)
  const [previewTutor, setPreviewTutor] = useState(null)
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    fetchTutors()
  }, [])

  const fetchTutors = async () => {
    setLoading(true)
    try {
      const data = await getAllTeachersAdmin()
      const list = Array.isArray(data) ? data : data?.content || data?.data || []
      setTutors(list.map(normalizeTeacher))
    } catch (err) {
      toast.error('Failed to load teachers')
      setTutors([])
    } finally {
      setLoading(false)
    }
  }

  // ── Helpers ────────────────────────────────────────────────────────────────
  const toArray = (str) =>
    str
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)

  const toFormValues = (tutor) => ({
    name: tutor.name || '',
    qualification: tutor.qualification || '',
    position: tutor.position || '',
    expertise: Array.isArray(tutor.expertise) ? tutor.expertise.join(', ') : tutor.expertise || '',
    image: tutor.image || '',
    description: tutor.description || '',
    highlights: Array.isArray(tutor.highlights) ? tutor.highlights.join(', ') : tutor.highlights || '',
    active: tutor.active !== false,
  })

  const toApiPayload = (formData) => ({
    fullName: formData.name,
    mainSubject: formData.qualification,
    speciality: formData.position,
    bio: formData.description,
    photoUrl: formData.image,
    active: formData.active,
    expertise: toArray(formData.expertise),
    highlights: toArray(formData.highlights),
  })

  const getInitials = (name) => {
    const clean = name.replace(/^(Mr\.|Ms\.|Mrs\.|Dr\.|Prof\.)\s*/i, '').trim()
    const parts = clean.split(' ').filter(Boolean)
    if (!parts.length) return 'NA'
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase()
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
  }

  // ── Form handlers ──────────────────────────────────────────────────────────
  const openAdd = () => {
    setEditingId(null)
    setForm(EMPTY_FORM)
    setShowForm(true)
  }

  const openEdit = (tutor) => {
    setEditingId(tutor.id)
    setForm(toFormValues(tutor))
    setShowForm(true)
  }

  const closeForm = () => {
    setShowForm(false)
    setEditingId(null)
    setForm(EMPTY_FORM)
    setImageFile(null)
    setImagePreview(null)
  }

  const handleImageSelect = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file')
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size must be less than 5MB')
      return
    }
    setImageFile(file)
    const reader = new FileReader()
    reader.onload = (evt) => setImagePreview(evt.target.result)
    reader.readAsDataURL(file)
  }

  const handleImageUpload = async () => {
    if (!imageFile) return
    setUploading(true)
    try {
      const uploadedUrl = await uploadToCloudinary(imageFile)
      setForm((prev) => ({ ...prev, image: uploadedUrl }))
      setImageFile(null)
      setImagePreview(null)
      toast.success('Image uploaded successfully')
    } catch (err) {
      toast.error('Failed to upload image')
    } finally {
      setUploading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleSave = async (e) => {
    e.preventDefault()
    if (!form.name.trim()) { toast.error('Name is required'); return }
    if (!form.qualification.trim()) { toast.error('Qualification is required'); return }

    setSaving(true)
    try {
      const payload = toApiPayload(form)
      if (editingId !== null) {
        const updated = await updateTeacherAdmin(editingId, payload)
        setTutors((prev) => prev.map((t) => (t.id === editingId ? normalizeTeacher(updated) : t)))
        toast.success('Tutor updated successfully')
      } else {
        const created = await createTeacherAdmin(payload)
        setTutors((prev) => [...prev, normalizeTeacher(created)])
        toast.success('Tutor added successfully')
      }
      closeForm()
    } catch (err) {
      toast.error(err.message || 'Failed to save tutor')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this tutor? This cannot be undone.')) return
    setDeletingId(id)
    try {
      await deleteTeacherAdmin(id)
      setTutors((prev) => prev.filter((t) => t.id !== id))
      toast.success('Tutor deleted')
    } catch (err) {
      toast.error('Failed to delete tutor')
    } finally {
      setDeletingId(null)
    }
  }

  const handleToggleActive = async (tutor) => {
    try {
      const payload = toApiPayload({ ...toFormValues(tutor), active: !tutor.active })
      const updated = await updateTeacherAdmin(tutor.id, payload)
      const normalized = normalizeTeacher(updated)
      setTutors((prev) => prev.map((t) => (t.id === tutor.id ? normalized : t)))
      toast.success(`Tutor ${normalized.active ? 'shown' : 'hidden'} on website`)
    } catch (err) {
      toast.error('Failed to update visibility')
    }
  }

  // ── Render ─────────────────────────────────────────────────────────────────
  const activeTutors = tutors.filter((t) => t.active !== false)
  const hiddenTutors = tutors.filter((t) => t.active === false)

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold" style={{ color: '#196d83' }}>Tutor Management</h1>
          <p className="text-gray-500 mt-1 text-xs md:text-sm">
            {activeTutors.length} active · {hiddenTutors.length} hidden
          </p>
        </div>
        <button
          onClick={openAdd}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 md:px-5 py-2 md:py-2.5 rounded-lg text-white font-semibold transition hover:opacity-90 text-sm"
          style={{ backgroundColor: '#196d83' }}
        >
          <Plus size={18} /> Add Tutor
        </button>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="flex justify-center py-24">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2" style={{ borderColor: '#196d83', borderTopColor: '#ddaa2c' }} />
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl shadow">
          <table className="w-full bg-white text-xs md:text-sm">
            <thead>
              <tr style={{ backgroundColor: '#196d83', color: '#fff' }}>
                <th className="px-2 md:px-4 py-3 text-left w-8 md:w-14">#</th>
                <th className="px-2 md:px-4 py-3 text-left">Photo</th>
                <th className="px-2 md:px-4 py-3 text-left">Name</th>
                <th className="px-2 md:px-4 py-3 text-left hidden md:table-cell">Qualification</th>
                <th className="px-2 md:px-4 py-3 text-left hidden lg:table-cell">Position</th>
                <th className="px-2 md:px-4 py-3 text-center hidden sm:table-cell">Status</th>
                <th className="px-2 md:px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tutors.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-16 text-gray-400 text-xs md:text-sm">No tutors found.</td>
                </tr>
              )}
              {tutors.map((tutor, idx) => (
                <tr key={tutor.id} className={`border-b last:border-0 ${tutor.active === false ? 'opacity-50 bg-gray-50' : 'hover:bg-gray-50'}`}>
                  <td className="px-2 md:px-4 py-3 text-gray-500 text-xs">{idx + 1}</td>
                  <td className="px-2 md:px-4 py-3">
                    {tutor.image ? (
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border-2 shrink-0" style={{ borderColor: '#196d83' }}>
                        <img
                          src={tutor.image}
                          alt={tutor.name}
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                    ) : (
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-white text-xs md:text-sm font-bold shrink-0" style={{ backgroundColor: '#196d83' }}>
                        {getInitials(tutor.name)}
                      </div>
                    )}
                  </td>
                  <td className="px-2 md:px-4 py-3 font-semibold text-gray-800 text-xs md:text-sm">{tutor.name}</td>
                  <td className="px-2 md:px-4 py-3 text-gray-600 hidden md:table-cell text-xs md:text-sm">{tutor.qualification}</td>
                  <td className="px-2 md:px-4 py-3 text-gray-500 hidden lg:table-cell max-w-xs truncate text-xs md:text-sm">{tutor.position}</td>
                  <td className="px-2 md:px-4 py-3 text-center hidden sm:table-cell">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold inline-block ${tutor.active !== false ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-600'}`}>
                      {tutor.active !== false ? 'Active' : 'Hidden'}
                    </span>
                  </td>
                  <td className="px-2 md:px-4 py-3">
                    <div className="flex items-center justify-center gap-1 md:gap-2 flex-wrap">
                      {/* Preview */}
                      <button
                        onClick={() => setPreviewTutor(tutor)}
                        title="Preview"
                        className="p-1 md:p-1.5 rounded hover:bg-blue-50 text-blue-500 transition"
                      >
                        <Eye size={14} className="md:size-4" />
                      </button>
                      {/* Toggle visibility */}
                      <button
                        onClick={() => handleToggleActive(tutor)}
                        title={tutor.active !== false ? 'Hide from website' : 'Show on website'}
                        className={`p-1 md:p-1.5 rounded transition ${tutor.active !== false ? 'hover:bg-yellow-50 text-yellow-600' : 'hover:bg-green-50 text-green-600'}`}
                      >
                        {tutor.active !== false ? <EyeOff size={14} className="md:size-4" /> : <Check size={14} className="md:size-4" />}
                      </button>
                      {/* Edit */}
                      <button
                        onClick={() => openEdit(tutor)}
                        title="Edit"
                        className="p-1 md:p-1.5 rounded hover:bg-indigo-50 text-indigo-600 transition"
                      >
                        <Pencil size={14} className="md:size-4" />
                      </button>
                      {/* Delete */}
                      <button
                        onClick={() => handleDelete(tutor.id)}
                        title="Delete"
                        disabled={deletingId === tutor.id}
                        className="p-1 md:p-1.5 rounded hover:bg-red-50 text-red-500 transition disabled:opacity-40"
                      >
                        {deletingId === tutor.id ? (
                          <div className="animate-spin h-3 w-3 md:h-4 md:w-4 border-2 rounded-full border-red-400 border-t-transparent" />
                        ) : (
                          <Trash2 size={14} className="md:size-4" />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ── Add / Edit Form Modal ── */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3 md:p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-4 md:px-6 py-3 md:py-4 border-b sticky top-0 bg-white z-10 gap-3">
              <h2 className="text-lg md:text-xl font-bold" style={{ color: '#196d83' }}>
                {editingId !== null ? 'Edit Tutor' : 'Add New Tutor'}
              </h2>
              <button onClick={closeForm} className="p-1 rounded hover:bg-gray-100 shrink-0">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSave} className="px-4 md:px-6 py-4 md:py-5 space-y-4">
              {/* Name */}
              <div>
                <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-1">Full Name *</label>
                <input name="name" value={form.name} onChange={handleChange} required placeholder="e.g. Mr. Rohit Gupta" className="w-full border rounded-lg px-3 py-2 text-xs md:text-sm focus:outline-none focus:ring-2" style={{ '--tw-ring-color': '#196d83' }} />
              </div>

              {/* Qualification */}
              <div>
                <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-1">Qualification *</label>
                <input name="qualification" value={form.qualification} onChange={handleChange} required placeholder="e.g. M.Tech (IIT Delhi), B.Ed" className="w-full border rounded-lg px-3 py-2 text-xs md:text-sm focus:outline-none focus:ring-2" />
              </div>

              {/* Position */}
              <div>
                <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-1">Position / Role</label>
                <input name="position" value={form.position} onChange={handleChange} placeholder="e.g. Mathematics & Statistics Faculty" className="w-full border rounded-lg px-3 py-2 text-xs md:text-sm focus:outline-none focus:ring-2" />
              </div>

              {/* Expertise */}
              <div>
                <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-1">Expertise Areas <span className="text-gray-400 font-normal text-xs">(comma-separated)</span></label>
                <input name="expertise" value={form.expertise} onChange={handleChange} placeholder="e.g. Calculus, Statistics, Linear Algebra" className="w-full border rounded-lg px-3 py-2 text-xs md:text-sm focus:outline-none focus:ring-2" />
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-1">Tutor Photo</label>

                {/* Dimension info banner */}
                <div className="mb-3 flex items-start gap-2 bg-blue-50 border border-blue-200 rounded-lg px-2 md:px-3 py-2">
                  <span className="text-blue-500 mt-0.5 shrink-0 text-sm">ℹ️</span>
                  <p className="text-xs text-blue-700">
                    <strong>Required size: 224 × 224 px</strong> (square, 1:1 ratio)<br />
                    This matches the exact display size on the Our Tutors page. Use a square photo for best results. Max file size: 5MB.
                  </p>
                </div>

                {/* Current Image Display */}
                {form.image && !imagePreview && (
                  <div className="mb-3 flex flex-col sm:flex-row items-center gap-4">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 shrink-0" style={{ borderColor: '#196d83' }}>
                      <img src={form.image} alt="current" className="w-full h-full object-cover object-top" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-gray-500">Current photo</p>
                      <p className="text-xs text-gray-400 mt-0.5">Displayed at 224×224 px on website</p>
                      <button
                        type="button"
                        onClick={() => { setForm((prev) => ({ ...prev, image: '' })); toast.success('Image removed') }}
                        className="text-xs text-red-500 hover:text-red-700 font-semibold mt-1"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                )}

                {/* New image selected — fixed 224×224 preview */}
                {imagePreview ? (
                  <div className="space-y-3">
                    {/* Fixed size preview box matching website display */}
                    <div className="flex flex-col items-center gap-2">
                      <p className="text-xs font-semibold text-gray-600 self-start">Preview (224 × 224 px — exact website size):</p>
                      <div
                        className="rounded-full overflow-hidden border-4 shadow-md shrink-0"
                        style={{ width: '160px', height: '160px', maxWidth: '100%', borderColor: '#196d83' }}
                      >
                        <img
                          src={imagePreview}
                          alt="preview"
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                      <p className="text-xs text-gray-400">This is how it will appear on the website</p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2">
                      <button
                        type="button"
                        onClick={handleImageUpload}
                        disabled={uploading}
                        className="flex-1 py-2 rounded-lg text-white font-semibold transition disabled:opacity-50 flex items-center justify-center gap-2 text-xs md:text-sm"
                        style={{ backgroundColor: '#196d83' }}
                      >
                        {uploading ? (
                          <><div className="animate-spin h-4 w-4 border-2 rounded-full border-white border-t-transparent" />Uploading…</>
                        ) : (
                          <><Check size={16} />Use This Photo</>
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => { setImageFile(null); setImagePreview(null) }}
                        className="px-3 md:px-4 py-2 rounded-lg border font-semibold text-gray-700 hover:bg-gray-50 transition text-xs md:text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <label className="block border-2 border-dashed rounded-lg p-4 md:p-6 text-center cursor-pointer hover:border-blue-400 transition" style={{ borderColor: form.image ? '#e0e0e0' : '#196d83' }}>
                    <input type="file" accept="image/*" onChange={handleImageSelect} className="hidden" disabled={uploading} />
                    <Upload size={24} className="mx-auto mb-2 text-gray-400" />
                    <p className="text-xs md:text-sm font-semibold text-gray-700">Click to upload photo</p>
                    <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 5MB</p>
                    <p className="text-xs font-semibold mt-1" style={{ color: '#196d83' }}>Best: square image 224 × 224 px or larger</p>
                  </label>
                )}

                {/* Fallback: URL Input */}
                <div className="mt-3 pt-3 border-t">
                  <label className="text-xs font-semibold text-gray-600 mb-1 block">Or paste image URL</label>
                  <input
                    type="url"
                    value={form.image}
                    onChange={(e) => setForm((prev) => ({ ...prev, image: e.target.value }))}
                    placeholder="https://example.com/photo.jpg"
                    className="w-full border rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-1">Bio / Description</label>
                <textarea name="description" value={form.description} onChange={handleChange} rows={4} placeholder="Brief professional background..." className="w-full border rounded-lg px-3 py-2 text-xs md:text-sm focus:outline-none focus:ring-2 resize-none" />
              </div>

              {/* Highlights */}
              <div>
                <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-1">Key Highlights <span className="text-gray-400 font-normal text-xs">(comma-separated)</span></label>
                <input name="highlights" value={form.highlights} onChange={handleChange} placeholder="e.g. 15+ years experience, NET Qualified, IIT Graduate" className="w-full border rounded-lg px-3 py-2 text-xs md:text-sm focus:outline-none focus:ring-2" />
              </div>

              {/* Active toggle */}
              <div className="flex items-center gap-3">
                <input type="checkbox" id="active" name="active" checked={form.active} onChange={handleChange} className="w-4 h-4 cursor-pointer" />
                <label htmlFor="active" className="text-xs md:text-sm font-semibold text-gray-700 cursor-pointer">
                  Show on website (Active)
                </label>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-2 md:gap-3 pt-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 py-2 md:py-2.5 rounded-lg text-white font-semibold transition hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2 text-xs md:text-sm"
                  style={{ backgroundColor: '#196d83' }}
                >
                  {saving ? (
                    <><div className="animate-spin h-4 w-4 border-2 rounded-full border-white border-t-transparent" /> Saving…</>
                  ) : (
                    <><Check size={16} /> {editingId !== null ? 'Update Tutor' : 'Add Tutor'}</>
                  )}
                </button>
                <button type="button" onClick={closeForm} className="px-4 md:px-6 py-2 md:py-2.5 rounded-lg border font-semibold text-gray-700 hover:bg-gray-50 transition text-xs md:text-sm">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Preview Modal ── */}
      {previewTutor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3 md:p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-4 md:px-6 py-3 md:py-4 border-b sticky top-0 bg-white gap-3">
              <h2 className="text-lg md:text-xl font-bold" style={{ color: '#196d83' }}>Tutor Preview</h2>
              <button onClick={() => setPreviewTutor(null)} className="p-1 rounded hover:bg-gray-100 shrink-0"><X size={20} /></button>
            </div>
            <div className="px-4 md:px-6 py-4 md:py-5">
              {/* Photo */}
              <div className="flex flex-col items-center mb-6">
                {previewTutor.image ? (
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-xl overflow-hidden border-4 shadow-lg" style={{ borderColor: '#196d83' }}>
                    <img
                      src={previewTutor.image}
                      alt={previewTutor.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                ) : (
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-xl flex items-center justify-center text-white text-3xl md:text-4xl font-black shadow-lg border-4" style={{ backgroundColor: '#196d83', borderColor: '#ddaa2c' }}>
                    {getInitials(previewTutor.name)}
                  </div>
                )}
                <h3 className="mt-3 md:mt-4 text-lg md:text-2xl font-bold text-center" style={{ color: '#196d83' }}>{previewTutor.name}</h3>
                <p className="text-xs md:text-sm font-semibold mt-1" style={{ color: '#ddaa2c' }}>{previewTutor.qualification}</p>
                <p className="text-xs text-gray-500 mt-1 text-center">{previewTutor.position}</p>
              </div>

              {/* Expertise */}
              {previewTutor.expertise?.length > 0 && (
                <div className="mb-4">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Expertise</p>
                  <div className="flex flex-wrap gap-2">
                    {previewTutor.expertise.map((e, i) => (
                      <span key={i} className="px-2 md:px-3 py-1 rounded-full text-xs font-semibold text-white" style={{ backgroundColor: '#196d83' }}>{e}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Description */}
              {previewTutor.description && (
                <div className="mb-4">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Bio</p>
                  <p className="text-xs md:text-sm text-gray-700 leading-relaxed">{previewTutor.description}</p>
                </div>
              )}

              {/* Highlights */}
              {previewTutor.highlights?.length > 0 && (
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Highlights</p>
                  <ul className="space-y-1">
                    {previewTutor.highlights.map((h, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs md:text-sm text-gray-700">
                        <span style={{ color: '#ddaa2c' }}>✓</span> {h}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
