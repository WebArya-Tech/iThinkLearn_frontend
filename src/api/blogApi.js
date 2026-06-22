import api from './api';
import { publicApi } from './api';

const unwrap = (promise) => promise.then(r => r.data);

export const blogApi = {
  // ── Public ──────────────────────────────────────────────
  getBlogs: (params) => unwrap(publicApi.get('/api/blogs', { params })),
  getBlogBySlug: (slug) => unwrap(publicApi.get(`/api/blogs/${slug}`)),
  getArchive: () => unwrap(publicApi.get('/api/blogs/archive')),

  // ── Blog Submissions ────────────────────────────────────
  // OTP handled by authApi (requestUserOTP / verifyUserOTP)
  finishSubmission: (data) => unwrap(api.post('/api/blogs', data)),

  // ── Subscriptions ───────────────────────────────────────
  startSubscription: (data) => unwrap(publicApi.post('/api/blogs/subscriptions/request-otp', data)),
  verifySubscription: (data) => unwrap(publicApi.post('/api/blogs/subscriptions/verify', data)),
  unsubscribe: (data) => unwrap(publicApi.post('/api/blogs/subscriptions/unsubscribe', data)),
  saveSubscriptionLocally: (email) => {
    const subs = getSubscribersStore();
    const existing = subs.findIndex(s => s.email === email);
    if (existing >= 0) {
      subs[existing].status = 'ACTIVE';
      subs[existing].updatedAt = new Date().toISOString();
    } else {
      subs.push({ id: Date.now(), email, status: 'ACTIVE', createdAt: new Date().toISOString() });
    }
    localStorage.setItem(SUBSCRIBERS_STORAGE_KEY, JSON.stringify(subs));
  },
  saveUnsubscriptionLocally: (email) => {
    const subs = getSubscribersStore();
    const existing = subs.find(s => s.email === email);
    if (existing) {
      existing.status = 'UNSUBSCRIBED';
      existing.updatedAt = new Date().toISOString();
    } else {
      subs.push({ id: Date.now(), email, status: 'UNSUBSCRIBED', createdAt: new Date().toISOString() });
    }
    localStorage.setItem(SUBSCRIBERS_STORAGE_KEY, JSON.stringify(subs));
  },

  // ── Interactions ────────────────────────────────────────
  getComments: (blogId, params) => unwrap(publicApi.get(`/api/blogs/${blogId}/comments`, { params })),
  postComment: (blogId, data) => unwrap(publicApi.post(`/api/blogs/${blogId}/comments`, data)),
  toggleReaction: (blogId, data) => unwrap(publicApi.post(`/api/blogs/${blogId}/reactions/toggle`, data)),
  getReactionStatus: (blogId, visitorKey) =>
    unwrap(publicApi.get(`/api/blogs/${blogId}/reactions/status`, { params: { visitorKey } })),
};

const SUBSCRIBERS_STORAGE_KEY = 'icfy_admin_subscribers';

function getSubscribersStore() {
  try {
    const raw = localStorage.getItem(SUBSCRIBERS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function paginateList(items, page = 0, size = 10) {
  const safeSize = size > 0 ? size : 10;
  const safePage = page >= 0 ? page : 0;
  const start = safePage * safeSize;
  const content = items.slice(start, start + safeSize);
  return {
    content,
    page: safePage,
    totalPages: Math.max(1, Math.ceil(items.length / safeSize)),
    totalElements: items.length,
  };
}

export const adminApi = {
  getAdminBlogs: (params) => unwrap(api.get('/admin/api/blogs', { params })),
  deleteBlog: (id) => unwrap(api.delete(`/admin/api/blogs/${id}`)),
  approveBlog: (id) => unwrap(api.post(`/admin/api/blogs/${id}/approve`)),
  rejectBlog: (id) => unwrap(api.post(`/admin/api/blogs/${id}/reject`)),
  editBlog: (id, data) => unwrap(api.put(`/admin/api/blogs/${id}`, data)),
  getMyProfile: () => unwrap(api.get('/api/account/me')),
  getSubscribers: async (params) => {
    try {
      const r = await unwrap(api.get('/api/v1/admin/blog-subscriptions', { params }));
      return r;
    } catch {
      const status = params?.status || '';
      const page = Number(params?.page ?? 0);
      const size = Number(params?.size ?? 10);
      const subscribers = getSubscribersStore().filter((s) => (status ? s.status === status : true));
      return paginateList(subscribers, page, size);
    }
  },
  deleteSubscriber: (id) => unwrap(api.delete(`/api/v1/admin/blog-subscriptions/${id}`)),
  getAllComments: (params) => unwrap(api.get('/admin/api/comments/all', { params })),
  getPendingComments: (params) => unwrap(api.get('/admin/api/comments/pending', { params })),
  approveComment: (id) => unwrap(api.post(`/admin/api/comments/${id}/approve`)),
  editComment: (id, data) => unwrap(api.put(`/admin/api/comments/${id}`, data)),
  deleteComment: (commentId) => unwrap(api.delete(`/admin/api/comments/${commentId}`)),
};
