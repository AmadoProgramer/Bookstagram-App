import { api } from './api';
import { LoginRequest, RegisterRequest, AuthResponse, User } from './auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const authService = {
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>('/auth/login', credentials);
      
      await AsyncStorage.multiSet([
        ['access_token', response.data.tokens.accessToken],
        ['refresh_token', response.data.tokens.refreshToken],
        ['user', JSON.stringify(response.data.user)],
      ]);

      return response.data;
    } catch (error: any) {
      console.error('Error en login:', error.response?.data || error.message);
      throw new Error(error.response?.data?.error || 'Error al iniciar sesión');
    }
  },

  async register(data: RegisterRequest): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>('/auth/register', data);
      
      await AsyncStorage.multiSet([
        ['access_token', response.data.tokens.accessToken],
        ['refresh_token', response.data.tokens.refreshToken],
        ['user', JSON.stringify(response.data.user)],
      ]);

      return response.data;
    } catch (error: any) {
      console.error('Error en register:', error.response?.data || error.message);
      throw new Error(error.response?.data?.error || 'Error al registrar usuario');
    }
  },

  async logout(): Promise<void> {
    try {
      const refreshToken = await AsyncStorage.getItem('refresh_token');
      if (refreshToken) {
        await api.post('/auth/logout', { refreshToken });
      }
    } catch (error) {
      console.warn('Error al hacer logout en backend:', error);
    } finally {
      await AsyncStorage.multiRemove(['access_token', 'refresh_token', 'user']);
    }
  },

  async getCurrentUser(): Promise<User | null> {
    try {
      const userStr = await AsyncStorage.getItem('user');
      if (userStr) {
        return JSON.parse(userStr);
      }

      const response = await api.get<User>('/auth/me');
      await AsyncStorage.setItem('user', JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      console.error('Error al obtener usuario actual:', error);
      return null;
    }
  },

  async updateProfile(data: Partial<User>): Promise<User> {
    try {
      const currentUser = await this.getCurrentUser();
      if (!currentUser) {
        throw new Error('No hay usuario autenticado');
      }

      const response = await api.put<User>(`/usuarios/${currentUser.id}`, data);
      
      await AsyncStorage.setItem('user', JSON.stringify(response.data));
      
      return response.data;
    } catch (error: any) {
      console.error('Error al actualizar perfil:', error.response?.data || error.message);
      throw new Error(error.response?.data?.error || 'Error al actualizar perfil');
    }
  },

  async isAuthenticated(): Promise<boolean> {
    const token = await AsyncStorage.getItem('access_token');
    return !!token;
  },
};