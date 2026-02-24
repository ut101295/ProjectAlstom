import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { AlbumListState } from './albumList.types';
import { fetchAlbums } from './albumList.service';

/**
 * Initial state for album list
 */
const initialState: AlbumListState = {
  data: {
    resultCount: 0,
    results: [],
  },
  loading: false,
  error: null,
};

/**
 * Async thunk for fetching album list
 */
export const fetchAlbumList = createAsyncThunk(
  'albumList/fetch',
  async (searchTerm: string) => {
    const response = await fetchAlbums(searchTerm);
    return response;
  }
);

/**
 * Redux slice for managing album list state
 */
const albumListSlice = createSlice({
  name: 'albumList',
  initialState,
  reducers: {
    clearAlbumList: (state) => {
      state.data = initialState.data;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAlbumList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAlbumList.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchAlbumList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Album fetch failed!';
      });
  },
});

export const { clearAlbumList } = albumListSlice.actions;

/**
 * Custom hook for accessing album list functionality
 * Provides methods for fetching albums and state management
 */
export function useAlbumListSlice() {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.albumList);

  const getAlbumList = async (searchTerm: string) => {
    return dispatch(fetchAlbumList(searchTerm)).unwrap();
  };

  const clearList = () => {
    return dispatch(clearAlbumList());
  };

  return {
    ...state,
    getAlbumList,
    clearList,
  };
}

export default albumListSlice.reducer;
