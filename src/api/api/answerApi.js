import api from '../api';

// Media signature
export const getMediaSignature = async () => {
  try {
    const response = await api.get('/api/media/signature');
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Question Management APIs

// Student: Post a new question
export const postQuestion = async (questionData) => {
  try {
    const response = await api.post('/api/questions', {
      subject: questionData.subject,
      category: questionData.category,
      question: questionData.question,
      status: 'pending'
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Student: Get their own questions
export const getStudentQuestions = async () => {
  try {
    const response = await api.get('/api/questions/student');
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Admin/Tutor: Get all questions
export const getAdminQuestions = async (filterStatus = 'all') => {
  try {
    const params = filterStatus !== 'all' ? { status: filterStatus } : {};
    const response = await api.get('/api/questions', { params });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Admin/Tutor: Submit answer to a question
export const submitAnswer = async (questionId, answerData) => {
  try {
    const response = await api.post(`/api/questions/${questionId}/answer`, {
      tutorAnswer: answerData.tutorAnswer,
      answeredBy: answerData.answeredBy || 'Tutor'
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Admin/Tutor: Update an answer
export const updateAnswer = async (answerId, answerData) => {
  try {
    const response = await api.put(`/api/questions/answer/${answerId}`, {
      tutorAnswer: answerData.tutorAnswer
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Admin/Tutor: Delete an answer
export const deleteAnswer = async (answerId) => {
  try {
    const response = await api.delete(`/api/questions/answer/${answerId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
