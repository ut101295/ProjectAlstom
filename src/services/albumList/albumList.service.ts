import api from '../api';
import { AlbumListResponse } from './albumList.types';

/**
 * Fetch albums from iTunes
 * @param searchTerm - The search term (e.g., "jack+johnson")
 * @returns The search results from iTunes API
 */
export const fetchAlbums = async (searchTerm: string): Promise<AlbumListResponse> => {
  try {
    const response = await api.get<AlbumListResponse>(`/search?term=${searchTerm}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Album fetch failed');
  }
};
