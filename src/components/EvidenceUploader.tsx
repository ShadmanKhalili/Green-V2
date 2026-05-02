import React, { useState, useRef } from 'react';
import { Language } from '../../types';

export const EvidenceUploader: React.FC<{
    language: Language;
    images: string[];
    onImagesChange: (images: string[]) => void;
    maxImages?: number;
}> = ({ language, images, onImagesChange, maxImages = 3 }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [uploading, setUploading] = useState(false);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (!files.length) return;
        setUploading(true);

        const newImages = [...images];
        for (const file of files) {
            if (newImages.length >= maxImages) break;
            if (!file.type.startsWith('image/')) continue;
            
            try {
                const compressedBase64 = await compressImage(file);
                newImages.push(compressedBase64);
            } catch (err) {
                console.error("Failed to compress image", err);
            }
        }
        
        onImagesChange(newImages);
        setUploading(false);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const compressImage = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (event) => {
                const img = new Image();
                img.src = event.target?.result as string;
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const MAX_WIDTH = 800;
                    const MAX_HEIGHT = 800;
                    let width = img.width;
                    let height = img.height;

                    if (width > height) {
                        if (width > MAX_WIDTH) {
                            height *= MAX_WIDTH / width;
                            width = MAX_WIDTH;
                        }
                    } else {
                        if (height > MAX_HEIGHT) {
                            width *= MAX_HEIGHT / height;
                            height = MAX_HEIGHT;
                        }
                    }

                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext('2d');
                    ctx?.drawImage(img, 0, 0, width, height);
                    resolve(canvas.toDataURL('image/jpeg', 0.6));
                };
                img.onerror = (err) => reject(err);
            };
            reader.onerror = (err) => reject(err);
        });
    };

    const removeImage = (index: number) => {
        const newImages = [...images];
        newImages.splice(index, 1);
        onImagesChange(newImages);
    };

    return (
        <div className="bg-white p-6 rounded-xl border border-gray-200 mt-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                <i className="fa-solid fa-camera text-indigo-600"></i>
                {language === 'en' ? 'Evidence Photos (Optional)' : 'প্রমাণ ফটো (ঐচ্ছিক)'}
            </h3>
            <p className="text-sm text-gray-500 mb-4 tracking-tight">
                {language === 'en' 
                    ? `Upload up to ${maxImages} photos. Images will be optimized automatically.` 
                    : `${maxImages}টি পর্যন্ত ছবি আপলোড করুন। ছবিগুলো স্বয়ংক্রিয়ভাবে অপটিমাইজ করা হবে।`}
            </p>

            <div className="flex flex-wrap gap-4">
                {images.map((img, index) => (
                    <div key={index} className="relative group w-24 h-24 sm:w-32 sm:h-32 rounded-lg border-2 border-gray-200 overflow-hidden shadow-sm">
                        <img src={img} alt={`Evidence ${index + 1}`} className="w-full h-full object-cover" />
                        <button 
                            onClick={() => removeImage(index)}
                            className="absolute top-1 right-1 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50"
                            title={language === 'en' ? 'Remove' : 'মুছে ফেলুন'}
                            type="button"
                        >
                            <i className="fa-solid fa-times text-xs"></i>
                        </button>
                    </div>
                ))}

                {images.length < maxImages && (
                    <button 
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={uploading}
                        className="w-24 h-24 sm:w-32 sm:h-32 rounded-lg border-2 border-dashed border-gray-300 hover:border-indigo-500 hover:bg-indigo-50 transition-colors flex flex-col items-center justify-center text-gray-400 hover:text-indigo-600 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {uploading ? (
                            <i className="fa-solid fa-circle-notch animate-spin text-2xl mb-2"></i>
                        ) : (
                            <i className="fa-solid fa-plus text-2xl mb-2"></i>
                        )}
                        <span className="text-xs font-semibold">{language === 'en' ? 'Add Photo' : 'ফটো যোগ করুন'}</span>
                    </button>
                )}
            </div>
            <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                className="hidden" 
                accept="image/*" 
                multiple 
            />
        </div>
    );
};
