import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PropertyGalleryProps {
  images: string[];
  currentIndex: number;
  onImageChange: (index: number) => void;
}

export function PropertyGallery({ images, currentIndex, onImageChange }: PropertyGalleryProps) {
  return (
    <div className="p-6">
      <div className="relative aspect-[4/3] mb-4">
        <img
          src={images[currentIndex]}
          alt="Property"
          className="w-full h-full object-cover rounded-lg"
        />
        {images.length > 1 && (
          <>
            <button
              onClick={() => onImageChange(currentIndex === 0 ? images.length - 1 : currentIndex - 1)}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => onImageChange(currentIndex === images.length - 1 ? 0 : currentIndex + 1)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}
      </div>
      <div className="flex justify-center gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => onImageChange(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
}