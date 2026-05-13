import React, { useState, useEffect } from 'react'
import { Pencil, Trash2, Plus, X, Check, AlertCircle, Eye, EyeOff } from 'lucide-react'
import toast from 'react-hot-toast'
import { getAllTutors, createTutor, updateTutor, deleteTutor } from '../../api/tutorApi'

const EMPTY_FORM = {
  name: '',
  qualification: '',
  position: '',
  expertise: '',       // comma-separated string in form; converted to array on save
  image: '',
  description: '',
  highlights: '',      // comma-separated string in form; converted to array on save
  active: true,
}

export default function TutorManagement() {
  const [tutors, setTutors] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState(EMPTY_FORM)
  const [saving, setSaving] = useState(false)
  const [deletingId, setDeletingId] = useState(null)
  const [previewTutor, setPreviewTutor] = useState(null)

  useEffect(() => {
    fetchTutors()
  }, [])

  const fetchTutors = async () => {
    setLoading(true)
    try {
      const data = await getAllTutors(true)
      setTutors(data || [])
    } catch (err) {
      toast.error('Failed to load tutors')
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
    ...formData,
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
        const updated = await updateTutor(editingId, payload)
        setTutors((prev) => prev.map((t) => (t.id === editingId ? updated : t)))
        toast.success('Tutor updated successfully')
      } else {
        const created = await createTutor(payload)
        setTutors((prev) => [...prev, created])
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
      await deleteTutor(id)
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
      const updated = await updateTutor(tutor.id, { ...toFormValues(tutor), active: !tutor.active, expertise: toArray(Array.isArray(tutor.expertise) ? tutor.expertise.join(', ') : tutor.expertise), highlights: toArray(Array.isArray(tutor.highlights) ? tutor.highlights.join(', ') : tutor.highlights) })
      setTutors((prev) => prev.map((t) => (t.id === tutor.id ? updated : t)))
      toast.success(`Tutor ${updated.active ? 'shown' : 'hidden'} on website`)
    } catch (err) {
      toast.error('Failed to update visibility')
    }
  }

  // ── Render ─────────────────────────────────────────────────────────────────
  const activeTutors = tutors.filter((t) => t.active !== false)
  const hiddenTutors = tutors.filter((t) => t.active === false)

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold" style={{ color: '#196d83' }}>Tutor Management</h1>
          <p className="text-gray-500 mt-1 text-sm">
            {activeTutors.length} active · {hiddenTutors.length} hidden
          </p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-white font-semibold transition hover:opacity-90"
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
          <table className="w-full bg-white text-sm">
            <thead>
              <tr style={{ backgroundColor: '#196d83', color: '#fff' }}>
                <th className="px-4 py-3 text-left w-14">#</th>
                <th className="px-4 py-3 text-left">Photo</th>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left hidden md:table-cell">Qualification</th>
                <th className="px-4 py-3 text-left hidden lg:table-cell">Position</th>
                <th className="px-4 py-3 text-center">Status</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tutors.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-16 text-gray-400">No tutors found.</td>
                </tr>
              )}
              {tutors.map((tutor, idx) => (
                <tr key={tutor.id} className={`border-b last:border-0 ${tutor.active === false ? 'opacity-50 bg-gray-50' : 'hover:bg-gray-50'}`}>
                  <td className="px-4 py-3 text-gray-500">{idx + 1}</td>
                  <td className="px-4 py-3">
                    {tutor.image ? (
                      <img src={tutor.image} alt={tutor.name} className="w-10 h-10 rounded-full object-cover border-2" style={{ borderColor: '#196d83' }} />
                    ) : (
                      <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: '#196d83' }}>
                        {getInitials(tutor.name)}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 font-semibold text-gray-800">{tutor.name}</td>
                  <td className="px-4 py-3 text-gray-600 hidden md:table-cell">{tutor.qualification}</td>
                  <td className="px-4 py-3 text-gray-500 hidden lg:table-cell max-w-xs truncate">{tutor.position}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${tutor.active !== false ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-600'}`}>
                      {tutor.active !== false ? 'Active' : 'Hidden'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-2">
                      {/* Preview */}
                      <button
                        onClick={() => setPreviewTutor(tutor)}
                        title="Preview"
                        className="p-1.5 rounded hover:bg-blue-50 text-blue-500 transition"
                      >
                        <Eye size={16} />
                      </button>
                      {/* Toggle visibility */}
                      <button
                        onClick={() => handleToggleActive(tutor)}
                        title={tutor.active !== false ? 'Hide from website' : 'Show on website'}
                        className={`p-1.5 rounded transition ${tutor.active !== false ? 'hover:bg-yellow-50 text-yellow-600' : 'hover:bg-green-50 text-green-600'}`}
                      >
                        {tutor.active !== false ? <EyeOff size={16} /> : <Check size={16} />}
                      </button>
                      {/* Edit */}
                      <button
                        onClick={() => openEdit(tutor)}
                        title="Edit"
                        className="p-1.5 rounded hover:bg-indigo-50 text-indigo-600 transition"
                      >
                        <Pencil size={16} />
                      </button>
                      {/* Delete */}
                      <button
                        onClick={() => handleDelete(tutor.id)}
                        title="Delete"
                        disabled={deletingId === tutor.id}
                        className="p-1.5 rounded hover:bg-red-50 text-red-500 transition disabled:opacity-40"
                      >
                        {deletingId === tutor.id ? (
                          <div className="animate-spin h-4 w-4 border-2 rounded-full border-red-400 border-t-transparent" />
                        ) : (
                          <Trash2 size={16} />
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b sticky top-0 bg-white z-10">
              <h2 className="text-xl font-bold" style={{ color: '#196d83' }}>
                {editingId !== null ? 'Edit Tutor' : 'Add New Tutor'}
              </h2>
              <button onClick={closeForm} className="p-1 rounded hover:bg-gray-100">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSave} className="px-6 py-5 space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name *</label>
                <input name="name" value={form.name} onChange={handleChange} required placeholder="e.g. Mr. Rohit Gupta" className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2" style={{ '--tw-ring-color': '#196d83' }} />
              </div>

              {/* Qualification */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Qualification *</label>
                <input name="qualification" value={form.qualification} onChange={handleChange} required placeholder="e.g. M.Tech (IIT Delhi), B.Ed" className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2" />
              </div>

              {/* Position */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Position / Role</label>
                <input name="position" value={form.position} onChange={handleChange} placeholder="e.g. Mathematics & Statistics Faculty" className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2" />
              </div>

              {/* Expertise */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Expertise Areas <span className="text-gray-400 font-normal">(comma-separated)</span></label>
                <input name="expertise" value={form.expertise} onChange={handleChange} placeholder="e.g. Calculus, Statistics, Linear Algebra" className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2" />
              </div>

              {/* Image URL */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Photo URL or Path</label>
                <input name="image" value={form.image} onChange={handleChange} placeholder="e.g. /tutors/ramya.jpeg  or  https://..." className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2" />
                {form.image && (
                  <div className="mt-2 flex items-center gap-3">
                    <img src={form.image} alt="preview" className="w-14 h-14 rounded-full object-cover border-2" style={{ borderColor: '#196d83' }} onError={(e) => { e.target.style.display = 'none' }} />
                    <span className="text-xs text-gray-400">Image preview</span>
                  </div>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Bio / Description</label>
                <textarea name="description" value={form.description} onChange={handleChange} rows={4} placeholder="Brief professional background..." className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 resize-none" />
              </div>

              {/* Highlights */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Key Highlights <span className="text-gray-400 font-normal">(comma-separated)</span></label>
                <input name="highlights" value={form.highlights} onChange={handleChange} placeholder="e.g. 15+ years experience, NET Qualified, IIT Graduate" className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2" />
              </div>

              {/* Active toggle */}
              <div className="flex items-center gap-3">
                <input type="checkbox" id="active" name="active" checked={form.active} onChange={handleChange} className="w-4 h-4 cursor-pointer" />
                <label htmlFor="active" className="text-sm font-semibold text-gray-700 cursor-pointer">
                  Show on website (Active)
                </label>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 py-2.5 rounded-lg text-white font-semibold transition hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2"
                  style={{ backgroundColor: '#196d83' }}
                >
                  {saving ? (
                    <><div className="animate-spin h-4 w-4 border-2 rounded-full border-white border-t-transparent" /> Saving…</>
                  ) : (
                    <><Check size={16} /> {editingId !== null ? 'Update Tutor' : 'Add Tutor'}</>
                  )}
                </button>
                <button type="button" onClick={closeForm} className="px-6 py-2.5 rounded-lg border font-semibold text-gray-700 hover:bg-gray-50 transition">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Preview Modal ── */}
      {previewTutor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b sticky top-0 bg-white">
              <h2 className="text-lg font-bold" style={{ color: '#196d83' }}>Tutor Preview</h2>
              <button onClick={() => setPreviewTutor(null)} className="p-1 rounded hover:bg-gray-100"><X size={20} /></button>
            </div>
            <div className="px-6 py-5">
              {/* Photo */}
              <div className="flex flex-col items-center mb-6">
                {previewTutor.image ? (
                  <img src={previewTutor.image} alt={previewTutor.name} className="w-32 h-32 rounded-full object-cover border-4 shadow-lg" style={{ borderColor: '#196d83' }} />
                ) : (
                  <div className="w-32 h-32 rounded-full flex items-center justify-center text-white text-4xl font-black shadow-lg border-4" style={{ backgroundColor: '#196d83', borderColor: '#ddaa2c' }}>
                    {getInitials(previewTutor.name)}
                  </div>
                )}
                <h3 className="mt-4 text-2xl font-bold" style={{ color: '#196d83' }}>{previewTutor.name}</h3>
                <p className="text-sm font-semibold mt-1" style={{ color: '#ddaa2c' }}>{previewTutor.qualification}</p>
                <p className="text-xs text-gray-500 mt-1 text-center">{previewTutor.position}</p>
              </div>

              {/* Expertise */}
              {previewTutor.expertise?.length > 0 && (
                <div className="mb-4">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Expertise</p>
                  <div className="flex flex-wrap gap-2">
                    {previewTutor.expertise.map((e, i) => (
                      <span key={i} className="px-3 py-1 rounded-full text-xs font-semibold text-white" style={{ backgroundColor: '#196d83' }}>{e}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Description */}
              {previewTutor.description && (
                <div className="mb-4">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Bio</p>
                  <p className="text-sm text-gray-700 leading-relaxed">{previewTutor.description}</p>
                </div>
              )}

              {/* Highlights */}
              {previewTutor.highlights?.length > 0 && (
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Highlights</p>
                  <ul className="space-y-1">
                    {previewTutor.highlights.map((h, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
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
