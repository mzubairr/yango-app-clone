import "@/global.css";
import store from '@/Redux/store/store';
import { Stack, useRouter } from 'expo-router';
import { Provider } from 'react-redux';

import { useColorScheme } from '@/hooks/useColorScheme';
import { auth } from "@/lib/firebase";
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import 'react-native-reanimated';
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.replace('/');
      } else {
        router.replace('/login');
      }
    });

    return unsubscribe;
  }, []);

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }


  return (

    <Provider store={store}>
      <SafeAreaProvider>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack>
            <Stack.Screen name="login" options={{ headerShown: false }} />
            <Stack.Screen name="signup" options={{ headerShown: false }} />
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="mapScreen" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
      </SafeAreaProvider>
    </Provider>
  );
}
