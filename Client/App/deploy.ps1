react-native bundle --platform android --dev false --entry-file index.android.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/
Set-Location .\android\
./gradlew assembleRelease
adb install -r .\app\build\outputs\apk\app-release.apk