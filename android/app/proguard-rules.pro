# Add project specific ProGuard rules here.
# By default, the flags in this file are appended to flags specified
# in /usr/local/Cellar/android-sdk/24.3.3/tools/proguard/proguard-android.txt
# You can edit the include path and order by changing the proguardFiles
# directive in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html

# Add any project specific keep options here:

# ============================================================
# React Native
# ============================================================
-keep class com.facebook.react.** { *; }
-keep class com.facebook.hermes.** { *; }
-dontwarn com.facebook.react.**

# ============================================================
# OkHttp / Okio (used by Axios / Flipper)
# ============================================================
-dontwarn okhttp3.**
-dontwarn okio.**
-keep class okhttp3.** { *; }
-keep class okio.** { *; }

# ============================================================
# Reanimated
# ============================================================
-keep class com.swmansion.reanimated.** { *; }
-dontwarn com.swmansion.reanimated.**

# ============================================================
# React Navigation / Screens / Gesture Handler
# ============================================================
-keep class com.swmansion.gesturehandler.** { *; }
-keep class com.swmansion.rnscreens.** { *; }

# ============================================================
# Google Play Services (Maps, Location, Auth / Sign-In)
# ============================================================
-keep class com.google.android.gms.** { *; }
-dontwarn com.google.android.gms.**

# ============================================================
# Socket.IO / Engine.IO
# ============================================================
-keep class io.socket.** { *; }
-dontwarn io.socket.**

# ============================================================
# Vector Icons
# ============================================================
-keep class com.oblador.vectoricons.** { *; }

# ============================================================
# Firebase (uncomment when added)
# ============================================================
# -keep class com.google.firebase.** { *; }
# -dontwarn com.google.firebase.**

# ============================================================
# Linear Gradient
# ============================================================
-keep class com.BV.LinearGradient.** { *; }

# ============================================================
# Image Picker / Fast Image
# ============================================================
-keep class com.imagepicker.** { *; }
-keep class com.dylanvann.fastimage.** { *; }

# ============================================================
# MMKV / AsyncStorage
# ============================================================
-keep class com.tencent.mmkv.** { *; }
-keep class com.reactnativecommunity.asyncstorage.** { *; }

# ============================================================
# Date Picker
# ============================================================
-keep class com.henninghall.date_picker.** { *; }
