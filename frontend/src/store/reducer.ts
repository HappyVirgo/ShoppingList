import { ShoppingListState } from '../types';
import {
  FETCH_SHOPPING_ITEMS_REQUEST,
  FETCH_SHOPPING_ITEMS_SUCCESS,
  FETCH_SHOPPING_ITEMS_FAILURE,
  CREATE_SHOPPING_ITEM_REQUEST,
  CREATE_SHOPPING_ITEM_SUCCESS,
  CREATE_SHOPPING_ITEM_FAILURE,
  UPDATE_SHOPPING_ITEM_REQUEST,
  UPDATE_SHOPPING_ITEM_SUCCESS,
  UPDATE_SHOPPING_ITEM_FAILURE,
  TOGGLE_SHOPPING_ITEM_REQUEST,
  TOGGLE_SHOPPING_ITEM_SUCCESS,
  TOGGLE_SHOPPING_ITEM_FAILURE,
  DELETE_SHOPPING_ITEM_REQUEST,
  DELETE_SHOPPING_ITEM_SUCCESS,
  DELETE_SHOPPING_ITEM_FAILURE,
} from './actions';

const initialState: ShoppingListState = {
  items: [],
  loading: false,
  error: null,
};

const shoppingListReducer = (state = initialState, action: any): ShoppingListState => {
  switch (action.type) {
    case FETCH_SHOPPING_ITEMS_REQUEST:
    case CREATE_SHOPPING_ITEM_REQUEST:
    case UPDATE_SHOPPING_ITEM_REQUEST:
    case TOGGLE_SHOPPING_ITEM_REQUEST:
    case DELETE_SHOPPING_ITEM_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_SHOPPING_ITEMS_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.payload,
        error: null,
      };

    case CREATE_SHOPPING_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        items: [action.payload, ...state.items],
        error: null,
      };

    case UPDATE_SHOPPING_ITEM_SUCCESS:
    case TOGGLE_SHOPPING_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        items: state.items.map(item =>
          item.id === action.payload.id ? action.payload : item
        ),
        error: null,
      };

    case DELETE_SHOPPING_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        items: state.items.filter(item => item.id !== action.payload),
        error: null,
      };

    case FETCH_SHOPPING_ITEMS_FAILURE:
    case CREATE_SHOPPING_ITEM_FAILURE:
    case UPDATE_SHOPPING_ITEM_FAILURE:
    case TOGGLE_SHOPPING_ITEM_FAILURE:
    case DELETE_SHOPPING_ITEM_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default shoppingListReducer;
