import api from './api';

const STORAGE_KEY = 'icfy_testimonials';

const defaultTestimonials = [
    {
        _id: 'testimonial-1',
        name: 'Riya Sharma',
        reviewerName: 'Riya Sharma',
        role: 'IGCSE Student',
        message: 'The classes helped me understand concepts clearly and stay confident during exams.',
        content: 'The classes helped me understand concepts clearly and stay confident during exams.',
        type: 'text',
        rating: 5,
        category: 'IGCSE',
        status: 'approved',
    },
    {
        _id: 'testimonial-2',
        name: 'Aman Verma',
        reviewerName: 'Aman Verma',
        role: 'Parent',
        message: 'The tutors are responsive and the classes are structured really well.',
        content: 'The tutors are responsive and the classes are structured really well.',
        type: 'text',
        rating: 4,
        category: 'AS/A Level',
        status: 'pending',
    },
];

function normalizeTestimonial(item) {
    const reviewerName = item.reviewerName || item.name || 'Student';
    const content = item.content || item.message || item.text || item.quote || '';

    return {
        ...item,
        _id: item._id || item.id || `testimonial-${Date.now()}`,
        id: item.id || item._id,
        name: item.name || reviewerName,
        reviewerName,
        role: item.role || 'Student',
        message: item.message || item.text || item.quote || content,
        content,
        type: item.type || (content && String(content).startsWith('http') ? 'image' : 'text'),
        rating: Number(item.rating) || 5,
        category: item.category || 'IGCSE',
        status: item.status || 'pending',
    };
}

function readTestimonials() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        const parsed = raw ? JSON.parse(raw) : null;
        return Array.isArray(parsed) && parsed.length > 0
            ? parsed.map(normalizeTestimonial)
            : defaultTestimonials.map(normalizeTestimonial);
    } catch {
        return defaultTestimonials.map(normalizeTestimonial);
    }
}

function writeTestimonials(testimonials) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(testimonials.map(normalizeTestimonial)));
}

function unwrapResponse(data) {
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.content)) return data.content;
    if (Array.isArray(data?.data)) return data.data;
    return data;
}

async function requestWithFallback(method, paths, payload) {
    let lastError;

    for (const path of paths) {
        try {
            const response = await api.request({
                url: path,
                method,
                data: payload,
            });
            return unwrapResponse(response.data);
        } catch (error) {
            lastError = error;
            if (error?.response && error.response.status !== 404) {
                throw error.response.data || error;
            }
        }
    }

    throw lastError || new Error('Request failed');
}

function updateTestimonialStatus(id, status) {
    return readTestimonials().map((item) => {
        if (item._id !== id && item.id !== id) {
            return item;
        }

        return {
            ...item,
            status,
        };
    });
}

export async function getAllTestimonials() {
    try {
        const data = await requestWithFallback('GET', ['/admin/testimonials', '/api/admin/testimonials']);
        return Array.isArray(data) ? data.map(normalizeTestimonial) : data;
    } catch {
        return readTestimonials();
    }
}

export async function approveTestimonial(id) {
    try {
        await requestWithFallback('POST', [
            `/admin/testimonials/${id}/approve`,
            `/api/admin/testimonials/${id}/approve`,
        ]);
    } catch {
        // Local fallback keeps the admin panel usable when the backend is unavailable.
    }

    writeTestimonials(updateTestimonialStatus(id, 'approved'));
}

export async function rejectTestimonial(id) {
    try {
        await requestWithFallback('POST', [
            `/admin/testimonials/${id}/reject`,
            `/api/admin/testimonials/${id}/reject`,
        ]);
    } catch {
        // Local fallback keeps the admin panel usable when the backend is unavailable.
    }

    writeTestimonials(updateTestimonialStatus(id, 'rejected'));
}

export async function setPrimaryTestimonial(id) {
    try {
        await requestWithFallback('POST', [
            `/admin/testimonials/${id}/primary`,
            `/api/admin/testimonials/${id}/primary`,
        ]);
    } catch {
        const testimonials = readTestimonials().map((item) => ({
            ...item,
            primary: item._id === id || item.id === id,
        }));
        writeTestimonials(testimonials);
    }
}

export async function deleteTestimonial(id) {
    try {
        await requestWithFallback('DELETE', [
            `/admin/testimonials/${id}`,
            `/api/admin/testimonials/${id}`,
        ]);
    } catch {
        // Local fallback keeps the admin panel usable when the backend is unavailable.
    }

    writeTestimonials(readTestimonials().filter((t) => t._id !== id && t.id !== id));
}

export async function submitTestimonial(data) {
    const payload = normalizeTestimonial({
        ...data,
        name: data.name || data.reviewerName,
        message: data.message || data.content,
        status: 'pending',
    });

    try {
        return normalizeTestimonial(await requestWithFallback('POST', [
            '/testimonials/submit',
            '/api/testimonials/submit',
        ], payload));
    } catch {
        const testimonials = readTestimonials();
        const newTestimonial = normalizeTestimonial({
            ...payload,
            _id: `temp-${Date.now()}`,
            id: `temp-${Date.now()}`,
            status: 'pending',
        });
        writeTestimonials([...testimonials, newTestimonial]);
        return newTestimonial;
    }
}

export async function getApprovedTestimonials() {
    try {
        const data = await requestWithFallback('GET', [
            '/testimonials/approved',
            '/api/testimonials/approved',
        ]);
        const list = Array.isArray(data) ? data : unwrapResponse(data);
        return Array.isArray(list) ? list.map(normalizeTestimonial) : list;
    } catch {
        return readTestimonials().filter((t) => t.status === 'approved');
    }
}
