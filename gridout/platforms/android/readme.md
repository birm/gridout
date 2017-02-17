# MAC STEPS
cordova build --release android

if not already:
(keytool -genkey -v -keystore rbirm.keystore -alias rb -keyalg RSA -keysize 2048 -validity 10000)

jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore rbirm.keystore android-release-unsigned.apk rb

~/Library/Android/sdk/build-tools/25.0.2/zipalign -v 4 android-release-unsigned.apk gridout.apk
