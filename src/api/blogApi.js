import api from './api';

export const blogApi = {
    // Public endpoints
    getBlogs: (params) => api.get('/api/blogs', { params }),
    getBlogBySlug: (slug) => api.get(`/api/blogs/${slug}`),
    getArchive: () => api.get('/api/blogs/archive'),

    // Reactions
    toggleReaction: (blogId, data) => api.post(`/api/blogs/${blogId}/reaction`, data),
    getReactionStatus: (blogId, visitorKey) => api.get(`/api/blogs/${blogId}/reaction`, { params: { visitorKey } }),

    // Comments
    getComments: (blogId, params) => api.get(`/api/blogs/${blogId}/comments`, { params }),
    postComment: (blogId, data) => api.post(`/api/blogs/${blogId}/comments`, data),

    // Subscription
    startSubscription: (data) => api.post('/api/blogs/subscribe/start', data),
    verifySubscription: (params) => api.post('/api/blogs/subscribe/verify-otp', null, { params }),
    unsubscribe: (params) => api.post('/api/blogs/subscribe/unsubscribe', null, { params }),

    // Submission (3-step)
    startSubmission: (data) => api.post('/api/blogs/submission/start', data),
    verifySubmission: (data) => api.post('/api/blogs/submission/verify', data),
    finishSubmission: (data) => api.post('/api/blogs/submission/finish', data),
};

export const adminApi = {
    // Blog moderation
    getAdminBlogs: (params) => api.get('/api/admin/blogs', { params }),
    getBlogById: (id) => api.get(`/api/admin/blogs/${id}`),
    approveBlog: (id, data) => api.post(`/api/admin/blogs/${id}/approve`, data),
    rejectBlog: (id, data) => api.post(`/api/admin/blogs/${id}/reject`, data),
    editBlog: (id, data) => api.patch(`/api/admin/blogs/${id}`, data),
    deleteBlog: (id) => api.delete(`/api/admin/blogs/${id}`),

    // Comment moderation
    getPendingComments: (params) => api.get('/api/admin/comments/pending', { params }),
    hideComment: (id) => api.post(`/api/admin/comments/${id}/hide`),
    unhideComment: (id) => api.post(`/api/admin/comments/${id}/unhide`),
    deleteComment: (id) => api.delete(`/api/admin/comments/${id}`),

    // Subscribers
    getSubscribers: (params) => api.get('/api/admin/subscribers', { params }),
};
