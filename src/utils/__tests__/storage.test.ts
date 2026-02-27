import AsyncStorage from '@react-native-async-storage/async-storage';
import { storage } from '../storage';

describe('Storage Utility', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('saveAlbumList', () => {
    it('should save album list to AsyncStorage', async () => {
      const searchTerm = 'Beatles';
      const mockData = {
        resultCount: 2,
        results: [
          { trackId: 1, collectionName: 'Abbey Road' },
          { trackId: 2, collectionName: 'Let It Be' },
        ],
      };

      await storage.saveAlbumList(searchTerm, mockData);

      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        'albumList_Beatles',
        JSON.stringify(mockData)
      );
    });

    it('should handle errors gracefully when saving fails', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      (AsyncStorage.setItem as jest.Mock).mockRejectedValueOnce(new Error('Storage full'));

      await storage.saveAlbumList('test', { data: 'test' });

      expect(consoleSpy).toHaveBeenCalledWith('Failed to save to cache:', expect.any(Error));
      consoleSpy.mockRestore();
    });
  });

  describe('getAlbumList', () => {
    it('should retrieve album list from AsyncStorage', async () => {
      const searchTerm = 'Queen';
      const mockData = {
        resultCount: 1,
        results: [{ trackId: 3, collectionName: 'A Night at the Opera' }],
      };

      (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(JSON.stringify(mockData));

      const result = await storage.getAlbumList(searchTerm);

      expect(result).toEqual(mockData);
      expect(AsyncStorage.getItem).toHaveBeenCalledWith('albumList_Queen');
    });

    it('should return null when no cached data exists', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(null);

      const result = await storage.getAlbumList('NonExistent');

      expect(result).toBeNull();
    });

    it('should handle errors gracefully when retrieval fails', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      (AsyncStorage.getItem as jest.Mock).mockRejectedValueOnce(new Error('Read error'));

      const result = await storage.getAlbumList('test');

      expect(result).toBeNull();
      expect(consoleSpy).toHaveBeenCalledWith('Failed to load from cache:', expect.any(Error));
      consoleSpy.mockRestore();
    });
  });
});
