import { configureStore } from '@reduxjs/toolkit';
import albumListReducer from '../services/albumList';

export const store = configureStore({
  reducer: {
    albumList: albumListReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
