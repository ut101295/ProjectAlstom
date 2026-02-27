# ProjectAlstom - White Label React Native App

A React Native application configured for white-labeling, allowing multiple branded versions from a single codebase.

## Quick Start

### Install Dependencies

```bash
npm install
cd ios && pod install && cd ..
```

### Build Android

```bash
# Client A Debug
npm run build:android:clientA

# Client B Debug
npm run build:android:clientB

# Client A Release
npm run build:android:clientA:release

# Client B Release
npm run build:android:clientB:release
```

### Build iOS

**Note**: Requires manual Xcode setup first (see full documentation)

```bash
# Client A Debug
npm run build:ios:clientA

# Client B Debug
npm run build:ios:clientB
```

## Clients Configured

- **Client A**: Blue theme, bundle ID `com.projectalstom.clienta`
- **Client B**: Green theme, bundle ID `com.projectalstom.clientb`

## Documentation

**[WHITE_LABEL_IMPLEMENTATION.md](./WHITE_LABEL_IMPLEMENTATION.md)** - Complete implementation guide

This document contains:
- All changes made and why
- Build scripts explanation
- Android setup (complete)
- iOS setup (manual steps required)
- Testing procedures
- Troubleshooting

## Tech Stack

- React Native 0.84.0
- Redux Toolkit
- react-native-config
- AsyncStorage
- NetInfo
- TypeScript

## Features

- White-label configuration
- Multiple branded apps from one codebase
- Dynamic colors and branding
- Client-specific API endpoints
- Offline support
- Network detection
- Visual client identification

## Status

- **Android**: Fully configured and working
- **iOS**: Requires manual Xcode setup (15-20 min)

## License

Private
