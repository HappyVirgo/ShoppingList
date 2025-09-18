import axios from 'axios';
import { ShoppingItem, CreateShoppingItemRequest, UpdateShoppingItemRequest, ApiResponse } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const shoppingListApi = {
  // Get all shopping items
  getAll: async (): Promise<ShoppingItem[]> => {
    const response = await api.get<ApiResponse<ShoppingItem[]>>('/shopping-list');
    if (!response.data.success) {
      throw new Error(response.data.error || 'Failed to fetch shopping items');
    }
    return response.data.data || [];
  },

  // Get single shopping item
  getById: async (id: string): Promise<ShoppingItem> => {
    const response = await api.get<ApiResponse<ShoppingItem>>(`/shopping-list/${id}`);
    if (!response.data.success) {
      throw new Error(response.data.error || 'Failed to fetch shopping item');
    }
    return response.data.data!;
  },

  // Create new shopping item
  create: async (item: CreateShoppingItemRequest): Promise<ShoppingItem> => {
    const response = await api.post<ApiResponse<ShoppingItem>>('/shopping-list', item);
    if (!response.data.success) {
      throw new Error(response.data.error || 'Failed to create shopping item');
    }
    return response.data.data!;
  },

  // Update shopping item
  update: async (id: string, item: UpdateShoppingItemRequest): Promise<ShoppingItem> => {
    const response = await api.put<ApiResponse<ShoppingItem>>(`/shopping-list/${id}`, item);
    if (!response.data.success) {
      throw new Error(response.data.error || 'Failed to update shopping item');
    }
    return response.data.data!;
  },

  // Toggle completion status
  toggleComplete: async (id: string): Promise<ShoppingItem> => {
    const response = await api.patch<ApiResponse<ShoppingItem>>(`/shopping-list/${id}/toggle`);
    if (!response.data.success) {
      throw new Error(response.data.error || 'Failed to toggle shopping item');
    }
    return response.data.data!;
  },

  // Delete shopping item
  delete: async (id: string): Promise<void> => {
    const response = await api.delete<ApiResponse<void>>(`/shopping-list/${id}`);
    if (!response.data.success) {
      throw new Error(response.data.error || 'Failed to delete shopping item');
    }
  },
};
