import api from './api';

const TUTOR_STORAGE_KEY = 'ithinklearn_admin_tutors';

const defaultTutors = [
    {
        id: 'local-tutor-1',
        name: 'Mr. Rohit Gupta',
        qualification: 'Mathematics & Statistics Faculty',
        position: 'Senior Tutor',
        expertise: ['Mathematics', 'Statistics', 'IGCSE', 'AS/A Level'],
        image: '/tutors/Rohit_Professional Photo.png',
        description: 'Experienced mathematics and statistics tutor focused on concept clarity, structured practice, and exam-oriented preparation.',
        highlights: ['Personalized mentoring', 'Exam-focused guidance', 'Strong conceptual teaching'],
        active: true,
    },
];

const normalizeTutor = (tutor) => {
    const id = tutor.id || tutor._id || `local-tutor-${Date.now()}`;

    return {
        ...tutor,
        id,
        _id: tutor._id || id,
        name: tutor.name || tutor.fullName || 'Tutor',
        qualification: tutor.qualification || '',
        position: tutor.position || tutor.title || '',
        expertise: Array.isArray(tutor.expertise)
            ? tutor.expertise
            : String(tutor.expertise || '').split(',').map((item) => item.trim()).filter(Boolean),
        image: tutor.image || tutor.photo || '',
        description: tutor.description || '',
        highlights: Array.isArray(tutor.highlights)
            ? tutor.highlights
            : String(tutor.highlights || '').split(',').map((item) => item.trim()).filter(Boolean),
        active: tutor.active !== false,
    };
};

const readLocalTutors = () => {
    try {
        const raw = localStorage.getItem(TUTOR_STORAGE_KEY);
        const parsed = raw ? JSON.parse(raw) : null;
        return Array.isArray(parsed)
            ? parsed.map(normalizeTutor)
            : defaultTutors.map(normalizeTutor);
    } catch {
        return defaultTutors.map(normalizeTutor);
    }
};

const writeLocalTutors = (tutors) => {
    localStorage.setItem(TUTOR_STORAGE_KEY, JSON.stringify(tutors.map(normalizeTutor)));
};

const shouldUseLocal = (error) => [401, 403, 404].includes(error.response?.status);

export const getAllTutors = async (adminView = false) => {
    try {
        const response = await api.get(`/tutors${adminView ? '?admin=true' : ''}`);
        const list = Array.isArray(response.data) ? response.data : response.data?.content || response.data?.data || [];

        if (adminView && list.length === 0) {
            return readLocalTutors();
        }

        return response.data;
    } catch (error) {
        if (adminView && shouldUseLocal(error)) {
            return readLocalTutors();
        }
        throw error.response?.data || error.message;
    }
};

export const createTutor = async (tutorData) => {
    try {
        const response = await api.post('/tutors', tutorData);
        return response.data;
    } catch (error) {
        if (shouldUseLocal(error)) {
            const tutors = readLocalTutors();
            const id = `local-tutor-${Date.now()}`;
            const tutor = normalizeTutor({ ...tutorData, id, _id: id });
            writeLocalTutors([...tutors, tutor]);
            return tutor;
        }
        throw error.response?.data || error.message;
    }
};

export const updateTutor = async (id, tutorData) => {
    try {
        const response = await api.put(`/tutors/${id}`, tutorData);
        return response.data;
    } catch (error) {
        if (shouldUseLocal(error)) {
            const tutors = readLocalTutors().map((tutor) =>
                tutor.id === id || tutor._id === id
                    ? normalizeTutor({ ...tutor, ...tutorData, id, _id: id })
                    : tutor
            );
            writeLocalTutors(tutors);
            return tutors.find((tutor) => tutor.id === id || tutor._id === id);
        }
        throw error.response?.data || error.message;
    }
};

export const deleteTutor = async (id) => {
    try {
        const response = await api.delete(`/tutors/${id}`);
        return response.data;
    } catch (error) {
        if (shouldUseLocal(error)) {
            writeLocalTutors(readLocalTutors().filter((tutor) => tutor.id !== id && tutor._id !== id));
            return true;
        }
        throw error.response?.data || error.message;
    }
};
