# Android Release Checklist

## Before Build

- Replace placeholder `EXPO_PUBLIC_EAS_PROJECT_ID`.
- Confirm Android package is `com.lumen.audio`.
- Confirm no private keys, keystores, or credentials are committed.
- Confirm `.env` is excluded and `.env.example` contains public placeholders only.
- Review `docs/privacy-policy.md` with counsel.
- Confirm all demo audio is original and licensed for use.

## Build

- Run `npm install`.
- Run `npm run typecheck`.
- Run `npx expo start` for Expo Go UI validation.
- Run `eas build --platform android --profile development` for a dev client if needed.
- Run `eas build --platform android --profile preview` for internal APK testing.
- Run `eas build --platform android --profile production` for Play Store AAB.

## Android Playback Validation

- Confirm background playback continues after screen lock.
- Confirm Android media notification appears.
- Confirm notification controls work.
- Confirm playback pauses safely on audio route disconnect.

## Store Readiness

- Add final screenshots.
- Add final privacy policy URL.
- Add support email and website.
- Complete Play Console content rating.
- Complete data safety form.
- Verify accessibility labels with TalkBack.
