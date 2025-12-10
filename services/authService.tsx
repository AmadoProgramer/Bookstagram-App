import { api } from './api';
import { LoginRequest, RegisterRequest, AuthResponse, User } from './auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const authService = {
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/login', credentials);
    
    // Guardar los  tokens
    await AsyncStorage.multiSet([
      ['access_token', response.data.tokens.accessToken],
      ['refresh_token', response.data.tokens.refreshToken],
      ['user', JSON.stringify(response.data.user)],
    ]);

    return response.data;
  },

  async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/register', data);
    
    await AsyncStorage.multiSet([
      ['access_token', response.data.tokens.accessToken],
      ['refresh_token', response.data.tokens.refreshToken],
      ['user', JSON.stringify(response.data.user)],
    ]);

    return response.data;
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

  async getCurrentUser() {
    const userStr = await AsyncStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  async updateProfile(data: Partial<User>) {
    const response = await api.put<User>('/users/profile', data);
    
    // Actualizar en AsyncStorage
    await AsyncStorage.setItem('user', JSON.stringify(response.data));
    
    return response.data;
  },
};