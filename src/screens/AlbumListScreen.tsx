import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  useColorScheme,
  Dimensions,
} from 'react-native';
import { useAlbumListSlice } from '../services/albumList';
import { AlbumResult } from '../services/albumList/albumList.types';
import AlbumDetailsScreen from './AlbumDetailsScreen';
import NetInfo from '@react-native-community/netinfo';

const AlbumListScreen = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const { getAlbumList, data, loading, error } = useAlbumListSlice();
  const [searchTerm, setSearchTerm] = useState('jack+johnson');
  const [orientation, setOrientation] = useState('portrait');
  const [selectedAlbum, setSelectedAlbum] = useState<AlbumResult | null>(null);
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    const updateOrientation = () => {
      const { width, height } = Dimensions.get('window');
      setOrientation(width > height ? 'landscape' : 'portrait');
    };

    const subscription = Dimensions.addEventListener('change', updateOrientation);
    updateOrientation();

    return () => subscription?.remove();
  }, []);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsOffline(!state.isConnected);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    fetchAlbums();
  }, []);

  const fetchAlbums = async () => {
    try {
      console.log('Fetching albums for:', searchTerm);
      const result = await getAlbumList(searchTerm);
      console.log('Fetch successful!');
      console.log('Result count:', result.resultCount);
      console.log('Albums:', result.results);
    } catch (err) {
      console.error('Fetch error:', err);
    }
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      fetchAlbums();
    }
  };

  const numColumns = orientation === 'landscape' ? 3 : 2;

  const renderAlbumItem = ({ item }: any) => (
    <TouchableOpacity
      style={[styles.albumCard, { width: `${100 / numColumns - 4}%` }]}
      onPress={() => setSelectedAlbum(item)}
      activeOpacity={0.7}
    >
      <Image
        source={{ uri: item.artworkUrl100 }}
        style={styles.albumArt}
        resizeMode="cover"
      />
      <Text
        style={[styles.trackName, isDarkMode && styles.textDark]}
        numberOfLines={2}
      >
        {item.collectionName || item.trackName || 'Unknown Title'}
      </Text>
      <Text
        style={[styles.artistName, isDarkMode && styles.textDark]}
        numberOfLines={1}
      >
        {item.artistName || 'Unknown Artist'}
      </Text>
      {item.trackPrice !== undefined ? (
        <Text style={[styles.price, isDarkMode && styles.textDark]}>
          {`$${item.trackPrice.toFixed(2)}`}
        </Text>
      ) : null}
    </TouchableOpacity>
  );

  if (selectedAlbum) {
    return <AlbumDetailsScreen album={selectedAlbum} onBack={() => setSelectedAlbum(null)} />;
  }

  return (
    <View style={[styles.container, isDarkMode && styles.containerDark]}>
      {isOffline && (
        <View style={styles.offlineBanner}>
          <Text style={styles.offlineText}>
            Offline - Showing cached data
          </Text>
        </View>
      )}

      {loading && (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={[styles.loadingText, isDarkMode && styles.textDark]}>
            Loading albums...
          </Text>
        </View>
      )}

      {error && (
        <View style={styles.centerContainer}>
          <Text style={[styles.errorText, isDarkMode && styles.textDark]}>
            Error: {error}
          </Text>
        </View>
      )}

      {!loading && !error && data?.results && data.results.length > 0 && (
        <FlatList
          data={data.results}
          renderItem={renderAlbumItem}
          keyExtractor={(item, index) => `${item.trackId}-${index}`}
          numColumns={numColumns}
          key={numColumns}
          contentContainerStyle={styles.listContainer}
          columnWrapperStyle={styles.columnWrapper}
        />
      )}

      {!loading && !error && data?.results && data.results.length === 0 && (
        <View style={styles.centerContainer}>
          <Text style={[styles.emptyText, isDarkMode && styles.textDark]}>
            No albums found. Try searching!
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  containerDark: {
    backgroundColor: '#1a1a1a',
  },
  offlineBanner: {
    backgroundColor: '#ff9800',
    padding: 10,
    alignItems: 'center',
  },
  offlineText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  searchContainer: {
    flexDirection: 'row',
    padding: 16,
    gap: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    height: 44,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  searchInputDark: {
    backgroundColor: '#2a2a2a',
    borderColor: '#444',
    color: '#fff',
  },
  searchButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  listContainer: {
    padding: 12,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  albumCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  albumArt: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 8,
    marginBottom: 8,
  },
  trackName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  artistName: {
    fontSize: 13,
    color: '#666',
    marginBottom: 2,
  },
  collectionName: {
    fontSize: 12,
    color: '#888',
    marginBottom: 4,
  },
  price: {
    fontSize: 14,
    fontWeight: '700',
    color: '#007AFF',
    marginTop: 4,
  },
  textDark: {
    color: '#fff',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    fontSize: 16,
    color: '#ff3b30',
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

export default AlbumListScreen;
