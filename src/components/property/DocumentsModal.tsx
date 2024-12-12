import React, { useState } from 'react';
import { X, Upload, FileText, File, Trash2 } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface DocumentsModalProps {
  propertyId: string;
  onClose: () => void;
}

interface Document {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadDate: string;
}

export function DocumentsModal({ propertyId, onClose }: DocumentsModalProps) {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;

    setUploading(true);
    try {
      // Simuler l'upload de fichiers
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newDocuments = Array.from(files).map(file => ({
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        type: file.type,
        size: file.size,
        uploadDate: new Date().toISOString(),
      }));

      setDocuments(prev => [...prev, ...newDocuments]);
      toast.success('Documents ajoutés avec succès');
    } catch (error) {
      toast.error('Erreur lors de l\'upload des documents');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (documentId: string) => {
    try {
      // Simuler la suppression
      await new Promise(resolve => setTimeout(resolve, 500));
      setDocuments(prev => prev.filter(doc => doc.id !== documentId));
      toast.success('Document supprimé');
    } catch (error) {
      toast.error('Erreur lors de la suppression');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Gérer les documents</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Upload Zone */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
            <input
              type="file"
              id="file-upload"
              multiple
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              onChange={handleFileUpload}
              className="hidden"
            />
            <label
              htmlFor="file-upload"
              className="flex flex-col items-center justify-center cursor-pointer"
            >
              <Upload className="w-12 h-12 text-gray-400 mb-4" />
              <span className="text-blue-600">Cliquez pour ajouter</span>
              <span className="text-gray-500 text-sm mt-2">
                ou glissez vos fichiers ici
              </span>
            </label>
          </div>

          {/* Documents List */}
          <div className="space-y-4">
            <h3 className="font-medium">Documents ({documents.length})</h3>
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <FileText className="w-6 h-6 text-gray-500" />
                  <div>
                    <p className="font-medium">{doc.name}</p>
                    <p className="text-sm text-gray-500">
                      {(doc.size / 1024 / 1024).toFixed(2)} MB • Ajouté le{' '}
                      {new Date(doc.uploadDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(doc.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}