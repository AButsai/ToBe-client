import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import storage from 'redux-persist/lib/storage';

import authReducer from './auth/authSlice';
import { authApi } from './auth/authAPI';
import { productApi } from './product/productAPI';
import { adminApi } from './admin/adminAPI';
import { galleryApi } from './gallery/galleryAPI';
import { timeWorkApi } from './timeWork/timeWorkAPI';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['token'],
};

const persistedReducer = persistReducer(persistConfig, authReducer);

const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [productApi.reducerPath]: productApi.reducer,
  [adminApi.reducerPath]: adminApi.reducer,
  [galleryApi.reducerPath]: galleryApi.reducer,
  [timeWorkApi.reducerPath]: timeWorkApi.reducer,
  auth: persistedReducer,
});

const makeStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => [
      ...getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
      authApi.middleware,
      productApi.middleware,
      adminApi.middleware,
      galleryApi.middleware,
      timeWorkApi.middleware,
    ],
  });

export const store = makeStore();
export const wrapper = createWrapper(makeStore, { debug: false });
export const persistor = persistStore(store);
