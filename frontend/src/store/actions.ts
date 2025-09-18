import { ShoppingItem, CreateShoppingItemRequest, UpdateShoppingItemRequest } from '../types';

// Action Types
export const FETCH_SHOPPING_ITEMS_REQUEST = 'FETCH_SHOPPING_ITEMS_REQUEST';
export const FETCH_SHOPPING_ITEMS_SUCCESS = 'FETCH_SHOPPING_ITEMS_SUCCESS';
export const FETCH_SHOPPING_ITEMS_FAILURE = 'FETCH_SHOPPING_ITEMS_FAILURE';

export const CREATE_SHOPPING_ITEM_REQUEST = 'CREATE_SHOPPING_ITEM_REQUEST';
export const CREATE_SHOPPING_ITEM_SUCCESS = 'CREATE_SHOPPING_ITEM_SUCCESS';
export const CREATE_SHOPPING_ITEM_FAILURE = 'CREATE_SHOPPING_ITEM_FAILURE';

export const UPDATE_SHOPPING_ITEM_REQUEST = 'UPDATE_SHOPPING_ITEM_REQUEST';
export const UPDATE_SHOPPING_ITEM_SUCCESS = 'UPDATE_SHOPPING_ITEM_SUCCESS';
export const UPDATE_SHOPPING_ITEM_FAILURE = 'UPDATE_SHOPPING_ITEM_FAILURE';

export const TOGGLE_SHOPPING_ITEM_REQUEST = 'TOGGLE_SHOPPING_ITEM_REQUEST';
export const TOGGLE_SHOPPING_ITEM_SUCCESS = 'TOGGLE_SHOPPING_ITEM_SUCCESS';
export const TOGGLE_SHOPPING_ITEM_FAILURE = 'TOGGLE_SHOPPING_ITEM_FAILURE';

export const DELETE_SHOPPING_ITEM_REQUEST = 'DELETE_SHOPPING_ITEM_REQUEST';
export const DELETE_SHOPPING_ITEM_SUCCESS = 'DELETE_SHOPPING_ITEM_SUCCESS';
export const DELETE_SHOPPING_ITEM_FAILURE = 'DELETE_SHOPPING_ITEM_FAILURE';

// Action Creators
export const fetchShoppingItemsRequest = () => ({
  type: FETCH_SHOPPING_ITEMS_REQUEST,
});

export const fetchShoppingItemsSuccess = (items: ShoppingItem[]) => ({
  type: FETCH_SHOPPING_ITEMS_SUCCESS,
  payload: items,
});

export const fetchShoppingItemsFailure = (error: string) => ({
  type: FETCH_SHOPPING_ITEMS_FAILURE,
  payload: error,
});

export const createShoppingItemRequest = (item: CreateShoppingItemRequest) => ({
  type: CREATE_SHOPPING_ITEM_REQUEST,
  payload: item,
});

export const createShoppingItemSuccess = (item: ShoppingItem) => ({
  type: CREATE_SHOPPING_ITEM_SUCCESS,
  payload: item,
});

export const createShoppingItemFailure = (error: string) => ({
  type: CREATE_SHOPPING_ITEM_FAILURE,
  payload: error,
});

export const updateShoppingItemRequest = (id: string, item: UpdateShoppingItemRequest) => ({
  type: UPDATE_SHOPPING_ITEM_REQUEST,
  payload: { id, item },
});

export const updateShoppingItemSuccess = (item: ShoppingItem) => ({
  type: UPDATE_SHOPPING_ITEM_SUCCESS,
  payload: item,
});

export const updateShoppingItemFailure = (error: string) => ({
  type: UPDATE_SHOPPING_ITEM_FAILURE,
  payload: error,
});

export const toggleShoppingItemRequest = (id: string) => ({
  type: TOGGLE_SHOPPING_ITEM_REQUEST,
  payload: id,
});

export const toggleShoppingItemSuccess = (item: ShoppingItem) => ({
  type: TOGGLE_SHOPPING_ITEM_SUCCESS,
  payload: item,
});

export const toggleShoppingItemFailure = (error: string) => ({
  type: TOGGLE_SHOPPING_ITEM_FAILURE,
  payload: error,
});

export const deleteShoppingItemRequest = (id: string) => ({
  type: DELETE_SHOPPING_ITEM_REQUEST,
  payload: id,
});

export const deleteShoppingItemSuccess = (id: string) => ({
  type: DELETE_SHOPPING_ITEM_SUCCESS,
  payload: id,
});

export const deleteShoppingItemFailure = (error: string) => ({
  type: DELETE_SHOPPING_ITEM_FAILURE,
  payload: error,
});
