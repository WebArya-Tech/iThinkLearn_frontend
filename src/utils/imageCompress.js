export const compressImage = (file, { maxWidth = 1920, maxHeight = 1920, quality = 0.8, minWidth = 0, minHeight = 0 } = {}) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        const url = URL.createObjectURL(file);
        img.onload = () => {
            URL.revokeObjectURL(url);
            let { width, height } = img;
            if (minWidth && width < minWidth) { reject(new Error(`Image width ${width}px is less than minimum ${minWidth}px`)); return; }
            if (minHeight && height < minHeight) { reject(new Error(`Image height ${height}px is less than minimum ${minHeight}px`)); return; }
            if (width > maxWidth) { height = Math.round(height * (maxWidth / width)); width = maxWidth; }
            if (height > maxHeight) { width = Math.round(width * (maxHeight / height)); height = maxHeight; }
            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);
            resolve({ dataUrl: canvas.toDataURL('image/jpeg', quality), width, height });
        };
        img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('Failed to load image')); };
        img.src = url;
    });
};
