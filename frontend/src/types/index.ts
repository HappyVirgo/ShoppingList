export interface ShoppingItem {
  id: string;
  name: string;
  description?: string;
  quantity: number;
  completed: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateShoppingItemRequest {
  name: string;
  quantity?: number;
  completed?: boolean;
}

export interface UpdateShoppingItemRequest {
  name?: string;
  quantity?: number;
  completed?: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  details?: string[];
}

export interface ShoppingListState {
  items: ShoppingItem[];
  loading: boolean;
  error: string | null;
}

export interface RootState {
  shoppingList: ShoppingListState;
}
