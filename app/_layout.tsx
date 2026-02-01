import { useColorScheme } from '@/hooks/use-color-scheme';
import { useAuthStore } from '@/ts/auth/authStorage';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

export const unstable_settings = {
  anchor: '(main)',
};

export default function RootLayout() {

  const colorScheme = useColorScheme();
  const { token, userId , hasHydrated } = useAuthStore();
  const isLogin = token && userId;
  console.log(2222);
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(main)" options={{ headerShown: false }} />
        <Stack.Screen name="mainMobileWebView" options={{ headerShown: false }} />
        <Stack.Screen name="passCodeLogin" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
