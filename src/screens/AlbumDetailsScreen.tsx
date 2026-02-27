import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
  Linking,
} from 'react-native';
import { AlbumResult } from '../services/albumList/albumList.types';

interface AlbumDetailsScreenProps {
  album: AlbumResult;
  onBack: () => void;
}

const AlbumDetailsScreen = ({ album, onBack }: AlbumDetailsScreenProps) => {
  const isDarkMode = useColorScheme() === 'dark';

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatDuration = (millis?: number) => {
    if (!millis) return null;
    const minutes = Math.floor(millis / 60000);
    const seconds = Math.floor((millis % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const openUrl = (url?: string) => {
    if (url) {
      Linking.openURL(url).catch(err => console.error('Failed to open URL:', err));
    }
  };

  return (
    <View style={[styles.container, isDarkMode && styles.containerDark]}>
      <View style={[styles.header, isDarkMode && styles.headerDark]}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, isDarkMode && styles.textDark]}>Album Details</Text>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.artworkContainer}>
          <Image
            source={{ uri: album.artworkUrl100?.replace('100x100', '600x600') || album.artworkUrl100 }}
            style={styles.artwork}
            resizeMode="cover"
          />
        </View>

        <View style={styles.infoSection}>
          <Text style={[styles.title, isDarkMode && styles.textDark]}>
            {album.collectionName || album.trackName || 'Unknown Title'}
          </Text>
          
          <Text style={[styles.artist, isDarkMode && styles.textDark]}>
            {album.artistName}
          </Text>

          {album.primaryGenreName && (
            <View style={styles.genreBadge}>
              <Text style={styles.genreText}>{album.primaryGenreName}</Text>
            </View>
          )}

          <View style={[styles.detailsCard, isDarkMode && styles.detailsCardDark]}>
            {album.releaseDate && (
              <View style={styles.detailRow}>
                <Text style={[styles.detailLabel, isDarkMode && styles.textDark]}>
                  Release Date
                </Text>
                <Text style={[styles.detailValue, isDarkMode && styles.textDark]}>
                  {formatDate(album.releaseDate)}
                </Text>
              </View>
            )}

            {album.trackPrice !== undefined && (
              <View style={styles.detailRow}>
                <Text style={[styles.detailLabel, isDarkMode && styles.textDark]}>
                  Price
                </Text>
                <Text style={styles.priceValue}>
                  ${album.trackPrice.toFixed(2)}
                </Text>
              </View>
            )}

            {album.country && (
              <View style={styles.detailRow}>
                <Text style={[styles.detailLabel, isDarkMode && styles.textDark]}>
                  Country
                </Text>
                <Text style={[styles.detailValue, isDarkMode && styles.textDark]}>
                  {album.country}
                </Text>
              </View>
            )}

            {album.trackTimeMillis && (
              <View style={styles.detailRow}>
                <Text style={[styles.detailLabel, isDarkMode && styles.textDark]}>
                  Duration
                </Text>
                <Text style={[styles.detailValue, isDarkMode && styles.textDark]}>
                  {formatDuration(album.trackTimeMillis)}
                </Text>
              </View>
            )}

            {album.kind && (
              <View style={styles.detailRow}>
                <Text style={[styles.detailLabel, isDarkMode && styles.textDark]}>
                  Type
                </Text>
                <Text style={[styles.detailValue, isDarkMode && styles.textDark]}>
                  {album.kind}
                </Text>
              </View>
            )}

            {album.currency && (
              <View style={styles.detailRow}>
                <Text style={[styles.detailLabel, isDarkMode && styles.textDark]}>
                  Currency
                </Text>
                <Text style={[styles.detailValue, isDarkMode && styles.textDark]}>
                  {album.currency}
                </Text>
              </View>
            )}
          </View>

          {(album.longDescription || album.shortDescription) && (
            <View style={[styles.descriptionCard, isDarkMode && styles.descriptionCardDark]}>
              <Text style={[styles.sectionTitle, isDarkMode && styles.textDark]}>
                Description
              </Text>
              <Text style={[styles.description, isDarkMode && styles.textDark]}>
                {album.longDescription || album.shortDescription}
              </Text>
            </View>
          )}

          <View style={styles.linksSection}>
            {album.trackViewUrl && (
              <TouchableOpacity
                style={styles.linkButton}
                onPress={() => openUrl(album.trackViewUrl)}
              >
                <Text style={styles.linkButtonText}>View on iTunes</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerDark: {
    backgroundColor: '#2a2a2a',
  },
  backButton: {
    padding: 8,
    marginRight: 16,
  },
  backButtonText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 32,
  },
  artworkContainer: {
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  artwork: {
    width: 250,
    height: 250,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  infoSection: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  artist: {
    fontSize: 18,
    color: '#666',
    marginBottom: 16,
    textAlign: 'center',
  },
  genreBadge: {
    alignSelf: 'center',
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 24,
  },
  genreText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  detailsCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  detailsCardDark: {
    backgroundColor: '#2a2a2a',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  detailLabel: {
    fontSize: 15,
    color: '#666',
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 15,
    color: '#333',
    fontWeight: '600',
  },
  priceValue: {
    fontSize: 15,
    color: '#007AFF',
    fontWeight: '700',
  },
  descriptionCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  descriptionCardDark: {
    backgroundColor: '#2a2a2a',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 12,
  },
  description: {
    fontSize: 15,
    color: '#666',
    lineHeight: 22,
  },
  linksSection: {
    gap: 12,
  },
  linkButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  linkButtonSecondary: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#007AFF',
  },
  linkButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  linkButtonTextSecondary: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
  },
  textDark: {
    color: '#fff',
  },
});

export default AlbumDetailsScreen;
