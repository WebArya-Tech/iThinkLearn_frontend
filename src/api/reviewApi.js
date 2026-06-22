import api from './api';
import { publicApi } from './api';

// ── Unwrap Axios response ────────────────────────────────
const unwrap = (promise) => promise.then(r => r.data);

// ── Public Reviews (use publicApi — no auth headers) ─────

export const getPublishedReviews = async (params = {}) => {
  return unwrap(publicApi.get('/api/reviews', { params }));
};

export const getPublishedReviewById = async (id) => {
  return unwrap(publicApi.get(`/api/reviews/${id}`));
};

export const sendReviewOtp = async (email) => {
  return unwrap(publicApi.post('/api/reviews/send-otp', { email }));
};

export const verifyReviewOtp = async (email, otp, name) => {
  const body = { email, otp };
  if (name) body.name = name;
  const result = await unwrap(publicApi.post('/api/reviews/verify-otp', body));
  if (result?.token) {
    localStorage.setItem('icfy_token', result.token);
    localStorage.setItem('icfy_user', JSON.stringify(result.user || {}));
  }
  return result;
};

export const submitReview = async (data) => {
  const token = localStorage.getItem('icfy_token');
  if (!token) throw { status: 401, message: 'Authentication required. Please verify your email first.' };
  return unwrap(api.post('/api/reviews', data));
};

export const getMyReviews = async () => {
  const token = localStorage.getItem('icfy_token');
  if (!token) throw { status: 401, message: 'Authentication required.' };
  return unwrap(api.get('/api/reviews/me'));
};

// ── Admin Reviews ─────────────────────────────────────────

export const adminReviewApi = {
  getAdminReviews: (params) => api.get('/admin/api/reviews', { params }),
  getReviewById: (id) => api.get(`/admin/api/reviews/${id}`),
  approveReview: (id) => api.post(`/admin/api/reviews/${id}/approve`),
  rejectReview: (id, data) => api.post(`/admin/api/reviews/${id}/reject`, data),
  deleteReview: (id) => api.delete(`/admin/api/reviews/${id}`),
};

// Legacy compat
export const reviewApi = { submitReview, getPublishedReviews };
export default reviewApi;
