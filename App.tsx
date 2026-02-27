/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { StatusBar, useColorScheme, View, Text, StyleSheet } from 'react-native';
import {
  SafeAreaView
} from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { store } from './src/store/store';
import AlbumListScreen from './src/screens/AlbumListScreen';
import { appConfig } from './src/config/appConfig';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  // Log app configuration for debugging
  console.log('App Config:', {
    appName: appConfig.appName,
    bundleId: appConfig.bundleId,
    primaryColor: appConfig.primaryColor,
    apiUrl: appConfig.apiUrl,
  });

  return (
    <Provider store={store}>
      <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right', 'bottom']}>
        <StatusBar 
          barStyle="light-content"
          backgroundColor={appConfig.primaryColor}
        />
        <View style={[styles.header, { backgroundColor: appConfig.primaryColor }]}>
          <Text style={styles.headerTitle}>{appConfig.appName}</Text>
          <Text style={styles.headerSubtitle}>{appConfig.bundleId}</Text>
        </View>
        <AlbumListScreen />
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  headerSubtitle: {
    fontSize: 11,
    color: '#FFFFFF',
    opacity: 0.8,
  },
});

export default App;
