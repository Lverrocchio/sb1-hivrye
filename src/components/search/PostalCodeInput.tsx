import React from 'react';
import { MapPin } from 'lucide-react';

interface PostalCodeInputProps {
  postalCode: string;
  onPostalCodeChange: (code: string) => void;
}

export function PostalCodeInput({ postalCode, onPostalCodeChange }: PostalCodeInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 5);
    onPostalCodeChange(value);
  };

  return (
    <div className="relative">
      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        value={postalCode}
        onChange={handleChange}
        placeholder="Code postal"
        className="w-full h-full pl-10 pr-4 py-3 border-l border-r border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        maxLength={5}
      />
    </div>
  );
}