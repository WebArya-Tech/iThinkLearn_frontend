import React, { useState, useEffect } from 'react';
import { Star, Trash2, X, AlertCircle, Plus, Image as ImageIcon, Upload, Save, Edit, Headphones } from 'lucide-react';
import toast from 'react-hot-toast';
import { testimonialApi, adminTestimonialApi } from '../../api/testimonialApi.js';

export default function TestimonialManagement() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [actionLoading, setActionLoading] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    text: '',
    mediaUrl: '',
    name: '',
    role: 'Student',
    category: 'IGCSE',
    rating: 5
  });
  const [mediaFile, setMediaFile] = useState(null);
  const [mediaPreview, setMediaPreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  const getMediaUrl = (testimonial) => {
    const direct = testimonial.mediaUrl || testimonial.image || testimonial.videoUrl || testimonial.audioUrl || '';
    if (direct) return direct;
    const content = testimonial.content || '';
    return typeof content === 'string' && (content.startsWith('http') || content.startsWith('data:')) ? content : '';
  };

  const getMediaType = (url) => {
    if (!url || typeof url !== 'string') return 'none';
    if (url.startsWith('data:video/') || url.match(/\.(mp4|webm|mov|m4v)(\?.*)?$/i)) return 'video';
    if (url.startsWith('data:audio/') || url.match(/\.(mp3|wav|ogg|m4a)(\?.*)?$/i)) return 'audio';
    if (url.startsWith('data:image/') || url.match(/\.(jpg|jpeg|png|gif|webp)(\?.*)?$/i)) return 'image';
    return 'link';
  };

  const renderMediaPreview = (url, className = 'w-full h-full') => {
    const type = getMediaType(url);
    if (type === 'image') return <img src={url} alt="Preview" className={`${className} object-cover`} />;
    if (type === 'video') return <video src={url} className={`${className} object-cover`} controls />;
    if (type === 'audio') return <div className="w-full h-full bg-purple-50 flex items-center justify-center"><Headphones className="text-purple-600" size={24} /></div>;
    return <div className="w-full h-full bg-blue-50 flex items-center justify-center"><ImageIcon className="text-blue-600" size={24} /></div>;
  };

  useEffect(() => {
    fetchTestimonials();
  }, [selectedStatus]);

  const fetchTestimonials = async () => {
    setLoading(true);
    try {
      const response = await adminTestimonialApi.getAllTestimonials();
      const list = Array.isArray(response.data) ? response.data
        : response.data?.content || response.data?.data || [];
      setTestimonials(list);
    } catch {
      toast.error('Failed to load testimonials');
      setTestimonials([]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === 'mediaUrl') setMediaPreview(value);
  };

  const handleMediaChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const isImage = file.type.startsWith('image/');
    const maxSize = isImage ? 5 * 1024 * 1024 : 50 * 1024 * 1024;
    
    if (file.size > maxSize) {
      toast.error(`File size too large. Max ${isImage ? '5MB' : '50MB'} allowed.`);
      return;
    }

    setMediaFile(file);
    setUploading(true);
    setFormData(prev => ({ ...prev, type: 'URL', mediaUrl: '' }));

    const reader = new FileReader();
    reader.onloadend = () => {
      setMediaPreview(reader.result);
      setUploading(false);
      toast.success(`${file.type.startsWith('video/') ? 'Video' : file.type.startsWith('audio/') ? 'Audio' : 'Image'} selected. Preview ready.`);
    };
    reader.onerror = () => {
      setUploading(false);
      toast.error('Unable to read selected media. Please try another file.');
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.text && !mediaFile) {
      toast.error('Please provide at least text or media');
      return;
    }
    setActionLoading('submitting');
    try {
      const payload = {
        text: formData.text,
        mediaUrl: mediaPreview || formData.mediaUrl,
        name: formData.name,
        reviewerName: formData.name,
        role: formData.role,
        category: formData.category,
        rating: Number(formData.rating)
      };
      if (editingId) {
        await adminTestimonialApi.updateTestimonial(editingId, payload);
        toast.success('Testimonial updated successfully');
      } else {
        await adminTestimonialApi.createTestimonial(payload);
        toast.success('Testimonial added successfully');
      }
      setIsAdding(false);
      setEditingId(null);
      resetForm();
      fetchTestimonials();
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message || 'Failed to save testimonial');
    } finally {
      setActionLoading(null);
      setUploading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      text: '',
      mediaUrl: '',
      name: '',
      role: 'Student',
      category: 'IGCSE',
      rating: 5
    });
    setMediaFile(null);
    setMediaPreview(null);
  };

  const handleExport = async () => {
    try {
      toast.info('Export feature coming soon');
    } catch (error) {
      console.error('Export error:', error);
      toast.error('Failed to export testimonials');
    }
  };

  const handleSetPrimary = async (id) => {
    setActionLoading(id);
    try {
      await adminTestimonialApi.setPrimary(id);
      setTestimonials(prev =>
        prev.map(t => (t.id === id || t._id === id) ? { ...t, primary: true } : { ...t, primary: false })
      );
      toast.success('Testimonial set as primary');
    } catch {
      toast.error('Failed to set primary testimonial');
    } finally {
      setActionLoading(null);
    }
  };

  const handleEdit = (t) => {
    const id = t.id || t._id;
    setEditingId(id);
    setFormData({
      text: t.text || t.message || t.quote || t.content || '',
      mediaUrl: t.mediaUrl || t.videoUrl || t.image || '',
      name: t.name || t.reviewerName || '',
      role: t.role || 'Student',
      category: t.category || 'IGCSE',
      rating: t.rating || 5
    });
    setMediaPreview(t.mediaUrl || t.videoUrl || t.image || '');
    setIsAdding(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this testimonial?')) return;
    setActionLoading(id);
    try {
      await adminTestimonialApi.deleteTestimonial(id);
      setTestimonials(prev => prev.filter(t => t.id !== id && t._id !== id));
      toast.success('Testimonial deleted');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete testimonial');
    } finally {
      setActionLoading(null);
    }
  };

  const handleApprove = async (id) => {
    setActionLoading(`approve-${id}`);
    try {
      // update via PUT with status APPROVED
      await adminTestimonialApi.updateTestimonial(id, { status: 'APPROVED' });
      setTestimonials(prev =>
        prev.map(t => (t.id === id || t._id === id) ? { ...t, status: 'APPROVED' } : t)
      );
      toast.success('Testimonial approved');
    } catch {
      toast.error('Failed to approve testimonial');
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (id) => {
    setActionLoading(`reject-${id}`);
    try {
      await adminTestimonialApi.updateTestimonial(id, { status: 'REJECTED' });
      setTestimonials(prev =>
        prev.map(t => (t.id === id || t._id === id) ? { ...t, status: 'REJECTED' } : t)
      );
      toast.success('Testimonial rejected');
    } catch {
      toast.error('Failed to reject testimonial');
    } finally {
      setActionLoading(null);
    }
  };

  const filteredTestimonials =
    selectedStatus === 'all'
      ? testimonials
      : testimonials.filter((t) => (t.status || '').toLowerCase() === selectedStatus);

  const statusBadge = (status) => {
    const s = status ? status.toUpperCase() : 'ACTIVE';
    const map = {
      APPROVED: 'bg-green-100 text-green-800',
      ACTIVE:   'bg-green-100 text-green-800',
      REJECTED: 'bg-red-100 text-red-800',
      PENDING:  'bg-yellow-100 text-yellow-800',
    };
    return (
      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${map[s] || 'bg-gray-100 text-gray-600'}`}>
        {s}
      </span>
    );
  };

  const stats = [
    { label: 'Total', count: testimonials.length, color: 'bg-blue-900 text-white' },
    { label: 'Pending', count: testimonials.filter(t => (t.status || '').toUpperCase() === 'PENDING').length, color: 'bg-yellow-100 text-yellow-800' },
    { label: 'Approved', count: testimonials.filter(t => (t.status || '').toUpperCase() === 'APPROVED').length, color: 'bg-green-100 text-green-800' },
    { label: 'Rejected', count: testimonials.filter(t => (t.status || '').toUpperCase() === 'REJECTED').length, color: 'bg-red-100 text-red-800' },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="bg-white border-b-2 border-blue-900 rounded-xl p-4 md:p-6 mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-blue-900">Testimonial Management</h1>
          <p className="text-gray-500 text-xs md:text-sm mt-1">Review, approve, and manage student testimonials</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <button 
            onClick={handleExport}
            className="flex items-center justify-center gap-2 px-3 md:px-4 py-2 md:py-3 border-2 border-blue-900 text-blue-900 rounded-xl font-bold hover:bg-blue-50 transition-all shadow-sm text-sm"
          >
            <Upload size={18} className="rotate-180" /> Export CSV
          </button>
          {!isAdding && (
            <button 
              onClick={() => { setEditingId(null); resetForm(); setIsAdding(true); }}
              className="flex items-center justify-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-blue-900 text-white rounded-xl font-bold hover:bg-blue-800 transition-all shadow-lg shadow-blue-900/20 text-sm"
            >
              <Plus size={18} /> Add Testimonial
            </button>
          )}
        </div>
      </div>

      {/* Add/Edit Testimonial In-line Form */}
      {isAdding && (
        <div className="bg-white p-4 md:p-6 rounded-xl shadow-lg border border-blue-100 mb-8 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
            <h2 className="text-lg font-bold text-blue-900">
              {editingId ? 'Edit Testimonial' : 'Add New Testimonial'}
            </h2>
            <button onClick={() => { setIsAdding(false); setEditingId(null); resetForm(); }} className="text-gray-400 hover:text-gray-600 ml-auto sm:ml-0">
              <X size={20} />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              <div>
                <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-1">Reviewer Name *</label>
                <input 
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 md:px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 outline-none text-sm"
                  placeholder="e.g. Mrs. Bindhu"
                />
              </div>
              <div>
                <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-1">Role *</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="w-full px-3 md:px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 outline-none text-sm"
                >
                  <option value="Student">Student</option>
                  <option value="Parent">Parent</option>
                </select>
              </div>
              <div>
                <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-1">Category *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-3 md:px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 outline-none text-sm"
                >
                  <option value="IGCSE">IGCSE</option>
                  <option value="AS/A Level">AS/A Level</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
              <div>
                <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-1">Testimonial Text (Context) *</label>
                <textarea 
                  name="text" 
                  rows="5" 
                  required
                  value={formData.text} 
                  onChange={handleInputChange} 
                  className="w-full px-3 md:px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 outline-none resize-none text-sm" 
                  placeholder="Enter the context of the feedback that will appear on the card..."
                ></textarea>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-1">Rating</label>
                  <div className="flex gap-2 p-2 md:p-3 bg-gray-50 rounded-lg">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                        className="text-xl md:text-2xl transition-all hover:scale-110"
                      >
                        <span className={star <= formData.rating ? 'text-yellow-400' : 'text-gray-300'}>★</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-1">Actual Testimonial Media (Image/Video/Audio)</label>
                  <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
                    {mediaPreview ? (
                      <div className="relative w-16 h-16 md:w-20 md:h-20 overflow-hidden border border-gray-200 bg-gray-900 shadow-sm shrink-0">
                        {renderMediaPreview(mediaPreview)}
                        <button 
                          type="button" 
                          onClick={() => {
                            setMediaFile(null);
                            setMediaPreview(null);
                            setFormData(prev => ({ ...prev, mediaUrl: '' }));
                          }}
                          className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600 shadow-md"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ) : (
                      <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-50 border border-dashed border-gray-300 flex items-center justify-center text-gray-400 shrink-0">
                        <Upload size={20} className="md:size-24" />
                      </div>
                    )}
                    <label className="flex-1 cursor-pointer">
                      <div className="flex flex-col items-center justify-center gap-1 px-3 md:px-4 py-3 md:py-4 bg-blue-50 border-2 border-dashed border-blue-200 rounded-xl hover:bg-blue-100 transition-all group">
                        {uploading ? (
                          <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                          <ImageIcon size={18} className="md:size-20 text-blue-600 group-hover:scale-110 transition-transform" />
                        )}
                        <span className="text-xs text-blue-700 font-bold uppercase tracking-tight text-center">
                          {uploading ? 'Preparing...' : 'Choose Actual Media'}
                        </span>
                      </div>
                      <input 
                        type="file" 
                        className="hidden" 
                        accept="image/*,video/*,audio/*"
                        onChange={handleMediaChange}
                      />
                    </label>
                  </div>
                  {(mediaFile || mediaPreview) && (
                    <p className="mt-2 text-xs font-semibold text-green-700">
                      {mediaFile ? `${mediaFile.name} selected as actual testimonial media.` : 'Actual testimonial media preview ready.'}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-1">Or Paste Actual Media URL</label>
                  <input 
                    name="mediaUrl"
                    type="url"
                    value={formData.mediaUrl}
                    onChange={handleInputChange}
                    className="w-full px-3 md:px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 outline-none text-sm"
                    placeholder="https://example.com/actual-testimonial.jpg"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-end gap-2 md:gap-3 pt-4 border-t border-gray-100">
              <button 
                type="button" 
                onClick={() => { setIsAdding(false); setEditingId(null); resetForm(); }} 
                className="w-full sm:w-auto px-4 md:px-6 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition font-medium text-sm"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                disabled={actionLoading === 'submitting' || uploading}
                className="w-full sm:w-auto px-6 md:px-8 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition shadow-md flex items-center justify-center gap-2 disabled:opacity-70 text-sm"
              >
                {actionLoading === 'submitting' ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <Save size={16} />
                )}
                {actionLoading === 'submitting' ? 'Saving...' : editingId ? 'Update Testimonial' : 'Create Testimonial'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4 mb-6">
        {stats.map((s) => (
          <div key={s.label} className={`rounded-xl p-3 md:p-4 text-center font-semibold ${s.color}`}>
            <div className="text-xl md:text-2xl font-bold">{s.count}</div>
            <div className="text-xs md:text-sm mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 flex-wrap mb-6">
        {['all', 'pending', 'approved', 'rejected'].map((s) => (
          <button
            key={s}
            onClick={() => setSelectedStatus(s)}
            className={`px-3 md:px-4 py-1 md:py-2 rounded-lg font-semibold transition-colors text-xs md:text-sm ${selectedStatus === s
              ? 'bg-blue-900 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
          >
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-sm">Loading testimonials...</p>
        </div>
      ) : filteredTestimonials.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-xl border border-gray-200">
          <AlertCircle className="mx-auto mb-3 text-gray-400" size={40} />
          <p className="text-gray-600 text-sm">
            No {selectedStatus !== 'all' ? selectedStatus : ''} testimonials found
          </p>
        </div>
      ) : (
        <div className="rounded-xl border border-gray-200 shadow-sm overflow-x-auto">
          <table className="w-full text-xs md:text-sm">
            <thead>
              <tr className="bg-blue-900 text-white text-left">
                <th className="px-2 md:px-4 py-2 md:py-3 font-semibold">#</th>
                <th className="px-2 md:px-4 py-2 md:py-3 font-semibold">Content Preview</th>
                <th className="px-2 md:px-4 py-2 md:py-3 font-semibold hidden sm:table-cell">Media</th>
                <th className="px-2 md:px-4 py-2 md:py-3 font-semibold hidden md:table-cell">Status</th>
                <th className="px-2 md:px-4 py-2 md:py-3 font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTestimonials.map((t, idx) => {
                const id = t.id || t._id;
                const mediaUrl = getMediaUrl(t);
                const mediaType = getMediaType(mediaUrl);
                
                return (
                  <tr key={id} className="border-t border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="px-2 md:px-4 py-2 md:py-3 text-gray-500 text-xs">{idx + 1}</td>
                    <td className="px-2 md:px-4 py-2 md:py-3 text-gray-800 font-medium max-w-37.5 md:max-w-75">
                      <span className="line-clamp-2 text-xs md:text-sm">{t.text || t.message || t.quote || t.content}</span>
                    </td>
                    <td className="px-2 md:px-4 py-2 md:py-3 hidden sm:table-cell">
                      {mediaType !== 'none' ? (
                        <div className="flex items-center gap-2 md:gap-3">
                          <div className="w-10 h-10 md:w-14 md:h-14 overflow-hidden border border-gray-200 bg-gray-50">
                            {renderMediaPreview(mediaUrl)}
                          </div>
                          <span className="text-[8px] md:text-[10px] font-bold uppercase text-blue-700 bg-blue-50 px-2 py-1 rounded-lg">{mediaType}</span>
                        </div>
                      ) : (
                        <span className="text-gray-400 text-xs italic">Text Only</span>
                      )}
                    </td>
                    <td className="px-2 md:px-4 py-2 md:py-3 hidden md:table-cell">
                      <div className="flex flex-col gap-1">
                        {statusBadge(t.status)}
                        {t.primary && (
                          <span className="bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-tighter w-fit">
                            Primary
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-2 md:px-4 py-2 md:py-3">
                      <div className="flex flex-wrap gap-1 md:gap-2">
                        {t.status && t.status.toUpperCase() === 'PENDING' && (
                          <>
                            <button
                              onClick={() => handleApprove(id)}
                              disabled={actionLoading === `approve-${id}`}
                              className="flex items-center justify-center gap-0.5 md:gap-1 rounded-lg bg-green-600 px-2 md:px-3 py-1 md:py-2 text-[10px] md:text-xs font-semibold text-white transition-colors hover:bg-green-700 disabled:opacity-50"
                            >
                              <Star size={12} /> Approve
                            </button>
                            <button
                              onClick={() => handleReject(id)}
                              disabled={actionLoading === `reject-${id}`}
                              className="flex items-center justify-center gap-0.5 md:gap-1 rounded-lg bg-red-600 px-2 md:px-3 py-1 md:py-2 text-[10px] md:text-xs font-semibold text-white transition-colors hover:bg-red-700 disabled:opacity-50"
                            >
                              <X size={12} /> Reject
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => handleSetPrimary(id)}
                          disabled={actionLoading === id}
                          className="flex items-center justify-center gap-0.5 md:gap-1 rounded-lg bg-indigo-600 px-2 md:px-3 py-1 md:py-2 text-[10px] md:text-xs font-semibold text-white transition-colors hover:bg-indigo-700 disabled:opacity-50"
                        >
                          <Star size={12} /> <span className="hidden sm:inline">Featured</span>
                        </button>
                        <button
                          onClick={() => handleEdit(t)}
                          className="flex items-center justify-center gap-0.5 md:gap-1 rounded-lg bg-amber-500 px-2 md:px-3 py-1 md:py-2 text-[10px] md:text-xs font-semibold text-white transition-colors hover:bg-amber-600"
                          title="Edit details"
                        >
                          <Edit size={12} /> <span className="hidden sm:inline">Edit</span>
                        </button>
                        <button
                          onClick={() => handleDelete(id)}
                          disabled={actionLoading === id}
                          className="flex items-center justify-center gap-0.5 md:gap-1 rounded-lg bg-red-700 px-2 md:px-3 py-1 md:py-2 text-[10px] md:text-xs font-semibold text-white transition-colors hover:bg-red-800 disabled:opacity-50"
                        >
                          <Trash2 size={12} /> <span className="hidden sm:inline">Delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
