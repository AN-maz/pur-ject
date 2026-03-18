// src/services/userService.js
import api from './api';

export const userService = {
  getProfile: async () => {
    try {
      const response = await api.get('/api/users/me');
      return response.data; 
    } catch (error) {
      throw error.response ? error.response.data : { message: "Gagal mengambil data user" };
    }
  }
};