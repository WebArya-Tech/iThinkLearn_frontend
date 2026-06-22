import api, { publicApi } from './api';

// ============================================
// TESTIMONIAL API - Public
// ============================================

export const testimonialApi = {
  // Get all testimonials (public)
  getAll: () => publicApi.get('/api/testimonials'),
  
  // Get primary testimonials (public)
  getPrimaryTestimonials: () => publicApi.get('/api/testimonials/primary'),
};

export const submitTestimonial = (data) => publicApi.post('/api/testimonials', data);

export const getApprovedTestimonials = () => publicApi.get('/api/testimonials');

// ============================================
// TESTIMONIAL API - Admin
// ============================================

export const adminTestimonialApi = {
  // Get all testimonials (admin)
  getAllTestimonials: () => api.get('/api/admin/testimonials'),
  
  // Create testimonial (admin)
  createTestimonial: (data) => api.post('/api/admin/testimonials', data),
  
  // Update testimonial (admin)
  updateTestimonial: (id, data) => api.put(`/api/admin/testimonials/${id}`, data),
  
  // Set as primary (admin)
  setPrimary: (id) => api.post(`/api/admin/testimonials/${id}/primary`),
  
  // Delete testimonial (admin)
  deleteTestimonial: (id) => api.delete(`/api/admin/testimonials/${id}`),
};

export default testimonialApi;
