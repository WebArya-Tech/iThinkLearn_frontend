import api from './api';

export const getAllTutors = async (adminView = false) => {
    try {
        const response = await api.get(`/tutors${adminView ? '?admin=true' : ''}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const createTutor = async (tutorData) => {
    try {
        const response = await api.post('/tutors', tutorData);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const updateTutor = async (id, tutorData) => {
    try {
        const response = await api.put(`/tutors/${id}`, tutorData);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const deleteTutor = async (id) => {
    try {
        const response = await api.delete(`/tutors/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};
