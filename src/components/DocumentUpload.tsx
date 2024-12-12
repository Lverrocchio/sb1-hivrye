import React, { useState } from 'react';
import { Upload, X, FileText, Image, Film, FileCheck } from 'lucide-react';
import { Document } from '../types';

interface DocumentUploadProps {
  onUpload: (files: File[]) => void;
  acceptedTypes?: string[];
  maxSize?: number;
  documents?: Document[];
}

export function DocumentUpload({
  onUpload,
  acceptedTypes = ['.pdf', '.jpg', '.jpeg', '.png', '.mp4'],
  maxSize = 10 * 1024 * 1024, // 10MB
  documents = [],
}: DocumentUploadProps) {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    handleFiles(files);
  };

  const handleFiles = (files: File[]) => {
    const validFiles = files.filter(file => {
      const valid = acceptedTypes.some(type => file.name.toLowerCase().endsWith(type));
      const validSize = file.size <= maxSize;
      return valid && validSize;
    });
    
    if (validFiles.length > 0) {
      onUpload(validFiles);
    }
  };

  const getIconForDocument = (type: string) => {
    switch (type) {
      case 'pdf':
        return <FileText className="w-6 h-6 text-red-500" />;
      case 'image':
        return <Image className="w-6 h-6 text-blue-500" />;
      case 'video':
        return <Film className="w-6 h-6 text-purple-500" />;
      case 'contract':
        return <FileCheck className="w-6 h-6 text-green-500" />;
      default:
        return <FileText className="w-6 h-6 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-4">
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center ${
          dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <Upload className="mx-auto h-12 w-12 text-gray-400" />
        <div className="mt-4">
          <label htmlFor="file-upload" className="cursor-pointer">
            <span className="text-blue-600 hover:text-blue-500">
              Cliquez pour télécharger
            </span>
            <span className="text-gray-500"> ou glissez-déposez</span>
            <input
              id="file-upload"
              name="file-upload"
              type="file"
              className="sr-only"
              multiple
              accept={acceptedTypes.join(',')}
              onChange={handleChange}
            />
          </label>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Formats acceptés : {acceptedTypes.join(', ')}
        </p>
      </div>

      {documents.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-medium">Documents téléchargés</h4>
          <div className="grid grid-cols-1 gap-2">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  {getIconForDocument(doc.type)}
                  <div>
                    <p className="text-sm font-medium">{doc.name}</p>
                    <p className="text-xs text-gray-500">
                      {(doc.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <button
                  className="p-1 hover:bg-gray-200 rounded"
                  onClick={() => {/* Implement delete */}}
                >
                  <X className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}