/**
 * Converts an uploaded media file to a local data URL.
 * This keeps testimonial media functional without any backend/API integration.
 */
export const uploadToCloudinary = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error('Failed to read media file. Please try again.'));
    reader.readAsDataURL(file);
  });
};
