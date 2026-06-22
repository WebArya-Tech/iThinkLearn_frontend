import api from './api';

// ============================================
// AUTH API - User Authentication
// Based on endpoints from https://blog.ithinklearn.com/swagger-ui
// ============================================

export const authApi = {
    // Login with OTP (2-step process)
    startLogin: (data) => api.post('/api/auth/start', data),
    verifyOtp: (data) => api.post('/api/auth/verify', data),
    
    // Login with Password (direct)
    loginWithPassword: (data) => api.post('/api/auth/login-password', data),
    
    // Forgot Password Flow (OTP verified during reset)
    forgotPassword: (data) => api.post('/api/auth/forgot-password', data),
    resetPassword: (data) => api.post('/api/auth/reset-password', data),
    
    // Account Management (Authenticated)
    getMyProfile: () => api.get('/api/account/me'),
    changePassword: (data) => api.post('/api/account/change-password', data),

    // Logout
    logout: () => api.post('/api/auth/logout'),
};

const USER_AUTH_BASE_URL = '/api/auth';

export const requestUserOTP = async (email, isResend = false) => {
    try {
        const response = await api.post(`${USER_AUTH_BASE_URL}/start`, { email, isResend });
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

export const verifyUserOTP = async (data) => {
    try {
        const response = await api.post(`${USER_AUTH_BASE_URL}/verify`, data);
        if (response.data.token) {
            localStorage.setItem('icfy_token', response.data.token);
            localStorage.setItem('icfy_user', JSON.stringify(response.data.user));
            localStorage.setItem('icfy_role', response.data.user?.role || 'student');
        }
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

// ============================================
// ADMIN AUTH API
// ============================================

export const adminAuthApi = {
    // Admin Login
    login: (data) => api.post('/api/admin/auth/login', data),
    
    // Admin Forgot Password
    forgotPassword: (data) => api.post('/api/admin/auth/forgot-password', data),
    resetPassword: (data) => api.post('/api/admin/auth/reset-password', data),
    
    // Admin Login with OTP
    requestLoginOtp: (data) => api.post('/api/admin/auth/login-otp/request', data),
    verifyLoginOtp: (data) => api.post('/api/admin/auth/login-otp/verify', data),

    // Admin Logout
    logout: () => api.post('/api/admin/auth/logout'),
};

export default authApi;
