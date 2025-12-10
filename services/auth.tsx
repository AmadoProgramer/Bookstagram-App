// Tipos para la autenticación
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  username?: string;
  postalCode?: string;
}

export interface AuthResponse {
  data: any;
  user: User;
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
}

// Tipos para los libros
export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  coverUrl: string;
  rating: number;
  genre: string;
  language: string;
  publicationDate: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBookRequest {
  title: string;
  author: string;
  description: string;
  coverUrl?: string;
  rating: number;
  genre: string;
  language: string;
  publicationDate: string;
}

export interface Review {
  id: string;
  bookId: string;
  userId: string;
  rating: number;
  comment: string;
  user: {
    id: string;
    name: string;
    username: string;
    avatarUrl?: string;
    level: string;
  };
  createdAt: string;
}

// Tipos para los usuarios
export interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  avatarUrl?: string;
  bio?: string;
  postalCode?: string;
  level: 'Beginner' | 'Medium' | 'Expert';
  stats: {
    bookCount: number;
    followerCount: number;
    followingCount: number;
  };
}

// Tipos para los mensajes
export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  read: boolean;
  createdAt: string;
  sender: {
    id: string;
    name: string;
    username: string;
    avatarUrl?: string;
  };
}