export interface Item {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  category: string;
  imageUrl: string;
  owner: User;
  available: boolean;
}

export interface Property {
  id: string;
  title: string;
  description: string;
  type: 'house' | 'apartment';
  price: number;
  location: string;
  surface: number;
  rooms: number;
  furnished: boolean;
  images: string[];
  documents: Document[];
  owner: User;
  available: boolean;
  features: string[];
}

export interface Document {
  id: string;
  name: string;
  type: 'image' | 'video' | 'pdf' | 'contract';
  url: string;
  uploadDate: Date;
  size: number;
}

export type UserRole = 'owner' | 'renter' | 'both';

export interface User {
  id: string;
  name: string;
  avatar: string;
  email: string;
  phone?: string;
  role: UserRole;
  rating?: number;
  reviews?: number;
  documents?: Document[];
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
}

export interface AuthResponse {
  user: User;
  token: string;
}