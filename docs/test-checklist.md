# Lumen Test Checklist

## Auth

- Sign up with a new local account.
- Log out and log back in.
- Log in with demo credentials: `demo@lumen.local` / `lumenpass`.
- Relaunch and confirm session restore.
- Confirm invalid passwords show an error banner.

## Player

- Play, pause, seek, next, previous.
- Toggle shuffle.
- Cycle repeat off, all, and one.
- Open mini player and full player.
- Start playback from home, search, album, artist, playlist, and queue.

## Library

- Add and remove favorites.
- Create a playlist.
- Edit playlist title and description.
- Add and remove tracks from a playlist.
- Confirm recently played updates after playback starts.

## Downloads And Offline

- Download a licensed demo track.
- Attempt to download the streaming-only demo track and confirm failure state.
- Remove a download.
- Toggle offline mode and confirm offline banner appears.

## UI States

- Loading skeletons appear on home feed.
- Empty states appear for no favorites, no recent tracks, and empty playlists.
- Errors are readable and selectable.
- Text does not overlap on narrow Android devices.

## Accessibility

- Bottom tabs have labels.
- Player controls have labels.
- Track, album, artist, playlist, queue, and download controls have labels.
- Forms expose readable labels.
- Settings switches expose checked state.

## Release Smoke

- Expo Go starts without blank screens.
- Preview APK opens on Android.
- Production AAB builds.
- App icon, adaptive icon, and splash render.
- No Spotify-like green branding or copied layouts are present.
