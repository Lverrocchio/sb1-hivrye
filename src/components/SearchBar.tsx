import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { SearchCategories } from './search/SearchCategories';
import { PostalCodeInput } from './search/PostalCodeInput';
import { SearchRadius } from './search/SearchRadius';

interface SearchBarProps {
  onSearch: (params: SearchParams) => void;
  className?: string;
}

interface SearchParams {
  category: string;
  postalCode: string;
  radius: number;
}

export function SearchBar({ onSearch, className = '' }: SearchBarProps) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useState<SearchParams>({
    category: 'all',
    postalCode: '',
    radius: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (searchParams.postalCode.length === 5) {
      onSearch(searchParams);
      navigate(`/search?category=${searchParams.category}&postalCode=${searchParams.postalCode}&radius=${searchParams.radius}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`w-full max-w-5xl ${className}`}>
      <div className="flex rounded-lg border border-gray-200 bg-white shadow-sm">
        <SearchCategories
          selectedCategory={searchParams.category}
          onCategoryChange={(category) => setSearchParams({ ...searchParams, category })}
        />
        
        <PostalCodeInput
          postalCode={searchParams.postalCode}
          onPostalCodeChange={(postalCode) => setSearchParams({ ...searchParams, postalCode })}
        />
        
        <SearchRadius
          selectedRadius={searchParams.radius}
          onRadiusChange={(radius) => setSearchParams({ ...searchParams, radius })}
        />
        
        <button
          type="submit"
          className="px-6 py-3 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2"
        >
          <Search size={20} />
          <span>Rechercher</span>
        </button>
      </div>
    </form>
  );
}