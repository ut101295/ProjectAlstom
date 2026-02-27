import Config from 'react-native-config';

export const appConfig = {
  appName: Config.APP_NAME || 'ProjectAlstom',
  bundleId: Config.BUNDLE_ID || 'com.projectalstom',
  primaryColor: Config.PRIMARY_COLOR || '#6200EE',
  secondaryColor: Config.SECONDARY_COLOR || '#3700B3',
  apiUrl: Config.API_URL || 'https://itunes.apple.com',
};

export default appConfig;
