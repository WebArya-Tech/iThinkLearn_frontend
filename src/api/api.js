import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || '',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor for adding auth headers
api.interceptors.request.use(
    (config) => {
        
        // For admin requests, always use Basic Auth from environment
        const role = localStorage.getItem('icfy_role');
        const username = import.meta.env.VITE_ADMIN_USERNAME;
        const password = import.meta.env.VITE_ADMIN_PASSWORD;
        
        if (role === 'admin' && username && password) {
            const credentials = btoa(`${username}:${password}`);
            config.headers.Authorization = `Basic ${credentials}`;
            return config;
        }

        // Try JWT token from localStorage for students
        const token = localStorage.getItem('icfy_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
            return config;
        }

        // Fallback to Basic Auth with .env credentials (if no other auth method worked)
        if (username && password) {
            const credentials = btoa(`${username}:${password}`);
            config.headers.Authorization = `Basic ${credentials}`;
            return config;
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
            // Unauthorized - clear auth and let App.jsx handle navigation
            localStorage.removeItem('icfy_token');
            localStorage.removeItem('icfy_user');
            localStorage.removeItem('icfy_role');
            localStorage.removeItem('adminAuth');
            // DO NOT use window.location.href as it causes a hard reload that clears state
            // App.jsx route protection will handle navigation based on auth state change
        }
        return Promise.reject(error);
    }
);

export default api;
