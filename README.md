# B3Utils

This is a test app with api for testing new technologies with react-native, typescript and dot.net core

## Client

### App

Made using react-native with typescript

#### DevEnv
```
npm install -g react-native-cli typescript tsc
```

#### Start app
```
npm install
npm run start:ios
```
OR
```
npm run start:android
```

#### Deploy app
Deploy the app to staging
```
code-push login // Hannes needs to add you as contributor
npm run build // Make sure the typescript is compiled
code-push release-react B3Utils-android android
code-push release-react B3Utils-ios ios
```

## Server

Made using dot.net core 2.0

#### DevEnv
```
Install VS2017
Install dot.net core 2.0
```

#### Start api

1. Select Api as startup
2. Start (f5)