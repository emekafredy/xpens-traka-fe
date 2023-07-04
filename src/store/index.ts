import { configureStore } from '@reduxjs/toolkit'
import user from './slices/user';
import transaction from './slices/transaction';
import category from './slices/category';

export const store = configureStore({
  reducer: {
    user,
    transaction,
    category
  },
});

export type RootState = ReturnType<typeof store.getState>;
