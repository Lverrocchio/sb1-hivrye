import React from 'react';
import { FileText, Download } from 'lucide-react';

interface ContractViewerProps {
  contract: {
    title: string;
    content: string;
    lastUpdated: string;
    downloadUrl?: string;
  };
}

export function ContractViewer({ contract }: ContractViewerProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <FileText className="w-6 h-6 text-blue-600 mr-2" />
          <h3 className="text-lg font-semibold">{contract.title}</h3>
        </div>
        {contract.downloadUrl && (
          <a
            href={contract.downloadUrl}
            download
            className="flex items-center text-blue-600 hover:text-blue-700"
          >
            <Download className="w-5 h-5 mr-1" />
            Télécharger
          </a>
        )}
      </div>
      
      <div className="prose max-w-none">
        <div className="bg-gray-50 p-4 rounded-lg text-sm whitespace-pre-wrap">
          {contract.content}
        </div>
      </div>
      
      <p className="text-sm text-gray-500 mt-4">
        Dernière mise à jour : {contract.lastUpdated}
      </p>
    </div>
  );
}