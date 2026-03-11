import api from './api';

const TESTIMONIAL_BASE_URL = '/testimonials';

/**
 * Submit a new testimonial
 * @param {Object} data - { name, role, message, rating }
 */
export const submitTestimonial = async (data) => {
  try {
    console.log('API Call: Submitting testimonial to', `${TESTIMONIAL_BASE_URL}/submit`);
    console.log('Request data:', data);
    
    const response = await api.post(`${TESTIMONIAL_BASE_URL}/submit`, data);
    
    console.log('API Response:', response);
    console.log('Response data:', response.data);
    
    return response.data;
  } catch (error) {
    console.error('API Error occurred');
    console.error('Error response:', error.response);
    console.error('Error message:', error.message);
    console.error('Full error:', error);
    
    // Better error extraction
    const errorData = error.response?.data;
    const errorStatus = error.response?.status;
    const errorMessage = errorData?.message || errorData?.error || error.message || 'Failed to submit testimonial. Please try again.';
    
    console.error('Extracted error message:', errorMessage);
    
    const errorObj = new Error(errorMessage);
    errorObj.data = errorData;
    errorObj.status = errorStatus;
    throw errorObj;
  }
};

/**
 * Get approved testimonials for public display
 */
export const getApprovedTestimonials = async () => {
  try {
    const response = await api.get(`${TESTIMONIAL_BASE_URL}/approved`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Get all testimonials (admin only)
 */
export const getAllTestimonials = async () => {
  try {
    const response = await api.get(`${TESTIMONIAL_BASE_URL}/all`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Get testimonials by status (admin only)
 * @param {string} status - 'pending', 'approved', or 'rejected'
 */
export const getTestimonialsByStatus = async (status) => {
  try {
    const response = await api.get(`${TESTIMONIAL_BASE_URL}/status/${status}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Approve a testimonial (admin only)
 * @param {string} id - Testimonial ID
 */
export const approveTestimonial = async (id) => {
  try {
    const response = await api.put(`${TESTIMONIAL_BASE_URL}/${id}/approve`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Reject a testimonial (admin only)
 * @param {string} id - Testimonial ID
 */
export const rejectTestimonial = async (id) => {
  try {
    const response = await api.put(`${TESTIMONIAL_BASE_URL}/${id}/reject`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Delete a testimonial (admin only)
 * @param {string} id - Testimonial ID
 */
export const deleteTestimonial = async (id) => {
  try {
    const response = await api.delete(`${TESTIMONIAL_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
