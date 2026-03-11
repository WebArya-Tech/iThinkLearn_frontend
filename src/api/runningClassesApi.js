import api from './api';

export const runningClassesApi = {
  // Public: fetch all active running classes
  getAll: () => api.get('/api/running-classes'),

  // Admin: create a new running class
  create: (data) => api.post('/api/running-classes', data),

  // Admin: update an existing running class by id
  update: (id, data) => api.put(`/api/running-classes/${id}`, data),

  // Admin: delete a running class by id
  delete: (id) => api.delete(`/api/running-classes/${id}`),
};
