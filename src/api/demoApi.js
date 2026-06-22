import api from './api'

export const demoApi = {
  sendOtp: (data) => api.post('/api/demo-requests/send-otp', data),
  verifyOtp: (data) => api.post('/api/demo-requests/verify-otp', data),
  submitRequest: (data) => api.post('/api/demo-requests', data),
  sendEmailNotification: (data) => api.post('/api/demo-requests/send-email', data),
  sendWhatsAppNotification: (data) => api.post('/api/demo-requests/send-whatsapp', data),
  getAllRequests: () => api.get('/api/demo-requests'),
  getRequestById: (id) => api.get(`/api/demo-requests/${id}`),
  updateRequestStatus: (id, status) => api.put(`/api/demo-requests/${id}`, { status }),
  // Public demo endpoints
  getAllBoards: () => api.get('/api/public/demo/settings/boards'),
  getAllGrades: () => api.get('/api/public/demo/settings/grades'),
  sendOtpPublic: (data) => api.post('/api/public/demo/schedule/send-otp', data),
  submitScheduleDemo: (data) => api.post('/api/public/demo/schedule', data),
  // DemoForm-compatible aliases
  getGrades: () => api.get('/api/public/demo/settings/grades'),
  getBoards: () => api.get('/api/public/demo/settings/boards'),
  sendDemoOtp: (email) => api.post('/api/public/demo/schedule/send-otp', { email }),
  verifyOtpPublic: (data) => api.post('/api/public/demo/schedule/verify-otp', data),
  scheduleDemo: (data) => api.post('/api/public/demo/schedule', data),
  // Admin demo settings endpoints
  getAdminBoards: () => api.get('/api/admin/demo/settings/boards'),
  createAdminBoard: (data) => api.post('/api/admin/demo/settings/boards', data),
  deleteAdminBoard: (id) => api.delete(`/api/admin/demo/settings/boards/${id}`),
  getAdminGrades: () => api.get('/api/admin/demo/settings/grades'),
  createAdminGrade: (data) => api.post('/api/admin/demo/settings/grades', data),
  deleteAdminGrade: (id) => api.delete(`/api/admin/demo/settings/grades/${id}`),
  getAdminSchedules: () => api.get('/api/admin/demo/schedule'),
  approveSchedule: (id) => api.put(`/api/admin/demo/schedule/${id}/approve`),
  cancelSchedule: (id) => api.put(`/api/admin/demo/schedule/${id}/cancel`),
}
