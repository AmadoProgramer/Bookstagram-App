import { api } from './api';
import { Book, CreateBookRequest, Review } from './auth';

export const bookService = {
  // Libros
  async createBook(data: CreateBookRequest): Promise<Book> {
    const response = await api.post<Book>('/books', data);
    return response.data;
  },

  async uploadBookCover(uri: string): Promise<string> {
    const response = await api.uploadImage(uri, 'books');
    return response.data.url;
  },

  async getBooks(params?: {
    page?: number;
    limit?: number;
    genre?: string;
    search?: string;
  }): Promise<Book[]> {
    const response = await api.get<Book[]>('/books', { params });
    return response.data;
  },

  async getBookById(id: string): Promise<Book> {
    const response = await api.get<Book>(`/books/${id}`);
    return response.data;
  },

  async getUserBooks(userId: string): Promise<Book[]> {
    const response = await api.get<Book[]>(`/users/${userId}/books`);
    return response.data;
  },

  async updateBook(id: string, data: Partial<Book>): Promise<Book> {
    const response = await api.put<Book>(`/books/${id}`, data);
    return response.data;
  },

  async deleteBook(id: string): Promise<void> {
    await api.delete(`/books/${id}`);
  },

  // Reseñas de los libros
  async addReview(bookId: string, data: { rating: number; comment: string }): Promise<Review> {
    const response = await api.post<Review>(`/books/${bookId}/reviews`, data);
    return response.data;
  },

  async getBookReviews(bookId: string): Promise<Review[]> {
    const response = await api.get<Review[]>(`/books/${bookId}/reviews`);
    return response.data;
  },

  async toggleFavorite(bookId: string): Promise<{ isFavorite: boolean }> {
    const response = await api.post<{ isFavorite: boolean }>(`/books/${bookId}/favorite`);
    return response.data;
  },

  async getFavoriteBooks(): Promise<Book[]> {
    const response = await api.get<Book[]>('/books/favorites');
    return response.data;
  },
};