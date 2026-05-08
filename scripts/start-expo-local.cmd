@echo off
set "__UNSAFE_EXPO_HOME_DIRECTORY=%CD%\.expo-home"
set "EXPO_NO_TELEMETRY=1"
set "EXPO_NO_TELEMETRY_DETACH=1"
"C:\Program Files\nodejs\node.exe" node_modules\expo\bin\cli start --localhost --port 8081 --clear > .expo-server.log 2> .expo-server.err.log
