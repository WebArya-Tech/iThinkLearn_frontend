import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL || '',
    headers: {
        'Content-Type': 'application/json',
    },
});

const getStoredAuthUser = () => {
    try {
        return JSON.parse(localStorage.getItem('auth_user') || 'null');
    } catch {
        return null;
    }
};

// Request interceptor for adding auth headers
api.interceptors.request.use(
    (config) => {
        const authUser = getStoredAuthUser();
        const role = authUser?.role || localStorage.getItem('icfy_role');

        // Prefer JWT token if available (set after real backend login)
        const token = localStorage.getItem('icfy_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
            return config;
        }

        // Fallback to Basic Auth for admin (if no JWT)
        const username = import.meta.env.VITE_ADMIN_USERNAME;
        const password = import.meta.env.VITE_ADMIN_PASSWORD;
        if (role === 'admin' && username && password) {
            const credentials = btoa(`${username}:${password}`);
            config.headers.Authorization = `Basic ${credentials}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor for handling errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('icfy_token');
            localStorage.removeItem('icfy_user');
            localStorage.removeItem('icfy_role');
            localStorage.removeItem('adminAuth');
        }
        return Promise.reject(error);
    }
);

// Public API instance - no auth headers
export const publicApi = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL || '',
    headers: { 'Content-Type': 'application/json' },
});

export default api;
