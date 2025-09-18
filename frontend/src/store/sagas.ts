import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { shoppingListApi } from '../utils/api';
import {
  FETCH_SHOPPING_ITEMS_REQUEST,
  CREATE_SHOPPING_ITEM_REQUEST,
  UPDATE_SHOPPING_ITEM_REQUEST,
  TOGGLE_SHOPPING_ITEM_REQUEST,
  DELETE_SHOPPING_ITEM_REQUEST,
  fetchShoppingItemsSuccess,
  fetchShoppingItemsFailure,
  createShoppingItemSuccess,
  createShoppingItemFailure,
  updateShoppingItemSuccess,
  updateShoppingItemFailure,
  toggleShoppingItemSuccess,
  toggleShoppingItemFailure,
  deleteShoppingItemSuccess,
  deleteShoppingItemFailure,
} from './actions';

// Fetch all shopping items
function* fetchShoppingItemsSaga(): Generator<any, void, any> {
  try {
    const items = yield call(shoppingListApi.getAll);
    yield put(fetchShoppingItemsSuccess(items));
  } catch (error: any) {
    yield put(fetchShoppingItemsFailure(error.message || 'Failed to fetch shopping items'));
  }
}

// Create new shopping item
function* createShoppingItemSaga(action: any): Generator<any, void, any> {
  try {
    const item = yield call(shoppingListApi.create, action.payload);
    yield put(createShoppingItemSuccess(item));
  } catch (error: any) {
    yield put(createShoppingItemFailure(error.message || 'Failed to create shopping item'));
  }
}

// Update shopping item
function* updateShoppingItemSaga(action: any): Generator<any, void, any> {
  try {
    const { id, item } = action.payload;
    const updatedItem = yield call(shoppingListApi.update, id, item);
    yield put(updateShoppingItemSuccess(updatedItem));
  } catch (error: any) {
    yield put(updateShoppingItemFailure(error.message || 'Failed to update shopping item'));
  }
}

// Toggle shopping item completion
function* toggleShoppingItemSaga(action: any): Generator<any, void, any> {
  try {
    const item = yield call(shoppingListApi.toggleComplete, action.payload);
    yield put(toggleShoppingItemSuccess(item));
  } catch (error: any) {
    yield put(toggleShoppingItemFailure(error.message || 'Failed to toggle shopping item'));
  }
}

// Delete shopping item
function* deleteShoppingItemSaga(action: any) {
  try {
    yield call(shoppingListApi.delete, action.payload);
    yield put(deleteShoppingItemSuccess(action.payload));
  } catch (error: any) {
    yield put(deleteShoppingItemFailure(error.message || 'Failed to delete shopping item'));
  }
}

// Root saga
export default function* rootSaga() {
  yield takeLatest(FETCH_SHOPPING_ITEMS_REQUEST, fetchShoppingItemsSaga);
  yield takeEvery(CREATE_SHOPPING_ITEM_REQUEST, createShoppingItemSaga);
  yield takeEvery(UPDATE_SHOPPING_ITEM_REQUEST, updateShoppingItemSaga);
  yield takeEvery(TOGGLE_SHOPPING_ITEM_REQUEST, toggleShoppingItemSaga);
  yield takeEvery(DELETE_SHOPPING_ITEM_REQUEST, deleteShoppingItemSaga);
}
