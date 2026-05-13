import api from './api';

export const submitReview = async (reviewData) => {
  try {
    const response = await api.post('/reviews', reviewData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getApprovedReviews = async () => {
  try {
    const response = await api.get('/reviews/approved');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getAllReviews = async () => {
  try {
    const response = await api.get('/reviews');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const updateReviewStatus = async (id, status) => {
  try {
    const response = await api.patch(`/reviews/${id}/status`, { status });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const deleteReview = async (id) => {
  try {
    const response = await api.delete(`/reviews/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
