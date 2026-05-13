const STORAGE_KEY = 'icfy_dummy_testimonials';

const defaultTestimonials = [
  

  {
    _id: 'testimonial-3',
    id: 'testimonial-3',
    name: 'Karan Singh',
    reviewerName: 'Karan Singh',
    role: 'IGCSE Student',
    text: 'A Star Classes played a major role in my academic success. The teachers are highly supportive, knowledgeable, and very focused on concept clarity. Their regular practice sessions, doubt-solving, and exam strategies helped me improve tremendously.',
    message: 'A Star Classes played a major role in my academic success. The teachers are highly supportive, knowledgeable, and very focused on concept clarity.',
    mediaUrl: 'https://commondatastorage.googleapis.com/gtv-videos-library/sample/BigBuckBunny.mp4',
    type: 'video',
    rating: 5,
    category: 'IGCSE',
    status: 'APPROVED',
    primary: false,
    createdAt: '2026-05-03T10:00:00.000Z',
  },
  {
    _id: 'testimonial-4',
    id: 'testimonial-4',
    name: 'Asha Singh',
    reviewerName: 'Asha Singh',
    role: 'IGCSE Student',
    text: 'Awesome classes! I scored 95 out of 100 in my Math exam. The structured approach and clear explanations made all the difference. Highly recommend A Star Classes!',
    message: 'Awesome classes! I scored 95 out of 100 in my Math exam.',
    mediaUrl: 'https://images.unsplash.com/photo-1606146481456-c5b1c7f93530?w=500&h=600&fit=crop',
    type: 'image',
    rating: 5,
    category: 'IGCSE',
    status: 'APPROVED',
    primary: false,
    createdAt: '2026-05-04T10:00:00.000Z',
  },
  {
    _id: 'testimonial-5',
    id: 'testimonial-5',
    name: 'Rahul Verma',
    reviewerName: 'Rahul Verma',
    role: 'AS/A Level Student',
    text: 'I am extremely grateful to A Star Classes for helping me achieve such an amazing academic result. The personalized attention and comprehensive study materials were invaluable.',
    message: 'I am extremely grateful to A Star Classes for helping me achieve amazing results.',
    mediaUrl: 'https://commondatastorage.googleapis.com/gtv-videos-library/sample/ElephantsDream.mp4',
    type: 'video',
    rating: 5,
    category: 'AS/A Level',
    status: 'APPROVED',
    primary: false,
    createdAt: '2026-05-05T10:00:00.000Z',
  },
  
];

const normalizeStatus = (status) => (status || 'PENDING').toUpperCase();

const getId = (testimonial) => testimonial?.id || testimonial?._id;

const inferType = (data) => {
  const mediaUrl = data.mediaUrl || data.image || data.videoUrl || data.audioUrl;
  const content = data.content || data.text || data.message || '';
  const value = mediaUrl || content;

  if (data.type && data.type !== 'URL') return data.type;
  if (typeof value !== 'string') return 'text';
  if (value.startsWith('data:video/')) return 'video';
  if (value.startsWith('data:audio/')) return 'audio';
  if (value.startsWith('data:image/')) return 'image';
  if (value.match(/\.(mp4|webm|mov)$/i)) return 'video';
  if (value.match(/\.(mp3|wav|ogg)$/i)) return 'audio';
  if (value.match(/\.(jpg|jpeg|png|gif|webp)$/i)) return 'image';
  return 'text';
};

const normalizeTestimonial = (testimonial) => {
  const id = getId(testimonial) || `testimonial-${Date.now()}`;
  const text = testimonial.text || testimonial.message || testimonial.quote || testimonial.content || '';
  const mediaUrl = testimonial.mediaUrl || testimonial.image || testimonial.videoUrl || testimonial.audioUrl || '';
  const reviewerName = testimonial.reviewerName || testimonial.name || 'Student';

  return {
    ...testimonial,
    _id: id,
    id,
    name: testimonial.name || reviewerName,
    reviewerName,
    role: testimonial.role || 'Student',
    text,
    message: testimonial.message || text,
    content: testimonial.content || mediaUrl || text,
    mediaUrl,
    type: inferType({ ...testimonial, text, mediaUrl }),
    rating: Number(testimonial.rating) || 5,
    category: testimonial.category || 'IGCSE',
    status: normalizeStatus(testimonial.status),
    primary: Boolean(testimonial.primary),
    createdAt: testimonial.createdAt || new Date().toISOString(),
  };
};

const readTestimonials = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : null;

    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed.map(normalizeTestimonial);
    }
  } catch {
    // Fall back to the bundled dummy data if localStorage is unavailable.
  }

  return defaultTestimonials.map(normalizeTestimonial);
};

const writeTestimonials = (testimonials) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(testimonials.map(normalizeTestimonial)));
};

const makeCsvBlob = (testimonials) => {
  const headers = ['Name', 'Role', 'Rating', 'Category', 'Status', 'Primary', 'Text', 'Media URL'];
  const rows = testimonials.map((testimonial) => [
    testimonial.name,
    testimonial.role,
    testimonial.rating,
    testimonial.category,
    testimonial.status,
    testimonial.primary ? 'Yes' : 'No',
    testimonial.text,
    testimonial.mediaUrl,
  ]);

  const escapeCell = (value) => `"${String(value || '').replace(/"/g, '""')}"`;
  const csv = [headers, ...rows].map((row) => row.map(escapeCell).join(',')).join('\n');

  return new Blob([csv], { type: 'text/csv;charset=utf-8;' });
};

export const getApprovedTestimonials = async () => {
  return readTestimonials().filter((testimonial) => testimonial.status === 'APPROVED');
};

export const getApprovedTestimonialsByTeacher = async () => {
  return getApprovedTestimonials();
};

export const getPrimaryTestimonial = async () => {
  return readTestimonials().find((testimonial) => testimonial.primary && testimonial.status === 'APPROVED') || null;
};

export const submitTestimonial = async (data) => {
  const testimonials = readTestimonials();
  const id = `testimonial-${Date.now()}`;
  const testimonial = normalizeTestimonial({
    ...data,
    _id: id,
    id,
    name: data.name || data.reviewerName,
    text: data.text || data.message || data.content,
    status: 'PENDING',
    primary: false,
  });

  writeTestimonials([testimonial, ...testimonials]);
  return testimonial;
};

export const getAllTestimonials = async () => {
  return readTestimonials();
};

export const createTestimonialAdmin = async (data) => {
  const testimonials = readTestimonials();
  const id = `testimonial-${Date.now()}`;
  const testimonial = normalizeTestimonial({
    ...data,
    _id: id,
    id,
    name: data.name || data.reviewerName || 'Admin Testimonial',
    reviewerName: data.reviewerName || data.name || 'Admin Testimonial',
    text: data.text || data.message || data.quote || data.content,
    status: data.status || 'APPROVED',
    primary: false,
  });

  writeTestimonials([testimonial, ...testimonials]);
  return testimonial;
};

export const approveTestimonial = async (id) => {
  const testimonials = readTestimonials().map((testimonial) =>
    getId(testimonial) === id ? { ...testimonial, status: 'APPROVED' } : testimonial
  );

  writeTestimonials(testimonials);
  return testimonials.find((testimonial) => getId(testimonial) === id);
};

export const rejectTestimonial = async (id) => {
  const testimonials = readTestimonials().map((testimonial) =>
    getId(testimonial) === id ? { ...testimonial, status: 'REJECTED', primary: false } : testimonial
  );

  writeTestimonials(testimonials);
  return testimonials.find((testimonial) => getId(testimonial) === id);
};

export const updateTestimonial = async (id, data) => {
  let updatedTestimonial = null;
  const testimonials = readTestimonials().map((testimonial) => {
    if (getId(testimonial) !== id) return testimonial;
    updatedTestimonial = normalizeTestimonial({ ...testimonial, ...data, id, _id: id });
    return updatedTestimonial;
  });

  writeTestimonials(testimonials);
  return updatedTestimonial;
};

export const setPrimaryTestimonial = async (id) => {
  let primaryTestimonial = null;
  const testimonials = readTestimonials().map((testimonial) => {
    const isPrimary = getId(testimonial) === id;
    const updated = { ...testimonial, primary: isPrimary };
    if (isPrimary) primaryTestimonial = updated;
    return updated;
  });

  writeTestimonials(testimonials);
  return primaryTestimonial;
};

export const deleteTestimonial = async (id) => {
  writeTestimonials(readTestimonials().filter((testimonial) => getId(testimonial) !== id));
  return true;
};

export const exportTestimonialsToCSV = async () => {
  return makeCsvBlob(readTestimonials());
};

export const exportTestimonials = async () => {
  const blob = await exportTestimonialsToCSV();
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `testimonials-export-${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
  return true;
};
