import React, { useState } from 'react';
import { Calendar, MessageCircle, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { toast } from 'react-hot-toast';
import { VisitModal } from './VisitModal';
import { DocumentsModal } from './DocumentsModal';

interface PropertyActionsProps {
  propertyId: string;
  ownerId: string;
}

export function PropertyActions({ propertyId, ownerId }: PropertyActionsProps) {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const [showVisitModal, setShowVisitModal] = useState(false);
  const [showDocumentsModal, setShowDocumentsModal] = useState(false);

  const handleContactOwner = () => {
    if (!isAuthenticated) {
      toast.error('Veuillez vous connecter pour contacter le propriétaire');
      navigate('/login');
      return;
    }
    navigate(`/messages/${ownerId}?property=${propertyId}`);
  };

  const handleScheduleVisit = () => {
    if (!isAuthenticated) {
      toast.error('Veuillez vous connecter pour planifier une visite');
      navigate('/login');
      return;
    }
    setShowVisitModal(true);
  };

  const handleManageDocuments = () => {
    if (!isAuthenticated) {
      toast.error('Veuillez vous connecter pour gérer les documents');
      navigate('/login');
      return;
    }
    setShowDocumentsModal(true);
  };

  return (
    <div className="space-y-4">
      <button
        onClick={handleContactOwner}
        className="w-full flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        <MessageCircle className="w-5 h-5 mr-2" />
        Contacter le propriétaire
      </button>

      <button
        onClick={handleScheduleVisit}
        className="w-full flex items-center justify-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
      >
        <Calendar className="w-5 h-5 mr-2" />
        Planifier une visite
      </button>

      <button
        onClick={handleManageDocuments}
        className="w-full flex items-center justify-center px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
      >
        <FileText className="w-5 h-5 mr-2" />
        Gérer les documents
      </button>

      {showVisitModal && (
        <VisitModal
          propertyId={propertyId}
          ownerId={ownerId}
          onClose={() => setShowVisitModal(false)}
        />
      )}

      {showDocumentsModal && (
        <DocumentsModal
          propertyId={propertyId}
          onClose={() => setShowDocumentsModal(false)}
        />
      )}
    </div>
  );
}