import api from './api';

// Public
export const runningClassesApi = {
  getActiveClasses: (params) => api.get('/api/classes', { params }),
  getClassById: (id) => api.get(`/api/classes/${id}`),
  enroll: (id) => api.post(`/api/classes/${id}/enroll`),
  getMyEnrollments: () => api.get('/api/classes/my-enrollments'),
  cancelMyEnrollment: (enrollmentId) => api.post(`/api/classes/enrollments/${enrollmentId}/cancel`),
};

// Admin
export const adminClassesApi = {
  getAll: (params) => api.get('/admin/api/classes', { params }),
  getById: (id) => api.get(`/admin/api/classes/${id}`),
  create: (data) => api.post('/admin/api/classes', data),
  update: (id, data) => api.put(`/admin/api/classes/${id}`, data),
  delete: (id) => api.delete(`/admin/api/classes/${id}`),
  getEnrollments: (params) => api.get('/admin/api/classes/enrollments', { params }),
  getEnrollmentById: (id) => api.get(`/admin/api/classes/enrollments/${id}`),
  confirmEnrollment: (id) => api.post(`/admin/api/classes/enrollments/${id}/confirm`),
  rejectEnrollment: (id) => api.post(`/admin/api/classes/enrollments/${id}/reject`),
  deleteEnrollment: (id) => api.delete(`/admin/api/classes/enrollments/${id}`),
};
