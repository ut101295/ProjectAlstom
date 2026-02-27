import AsyncStorage from '@react-native-async-storage/async-storage';

const CACHE_KEYS = {
  ALBUM_LIST: 'albumList_',
};

export const storage = {
  async saveAlbumList(searchTerm: string, data: any) {
    try {
      const key = `${CACHE_KEYS.ALBUM_LIST}${searchTerm}`;
      await AsyncStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error('Failed to save to cache:', error);
    }
  },

  async getAlbumList(searchTerm: string) {
    try {
      const key = `${CACHE_KEYS.ALBUM_LIST}${searchTerm}`;
      const cached = await AsyncStorage.getItem(key);
      return cached ? JSON.parse(cached) : null;
    } catch (error) {
      console.error('Failed to load from cache:', error);
      return null;
    }
  },
};
