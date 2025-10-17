import { Stack } from "expo-router";
import { LogBox, useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useFonts } from "expo-font";
import { Provider, useDispatch } from 'react-redux';
import  store  from '../store';
import { loadCartFromStorage } from "../redux/CartReducer";
import { loadWishlistFromStorage } from "../redux/WishListReducer";

SplashScreen.preventAutoHideAsync();

const AppInitializer = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadCartFromStorage());
    dispatch(loadWishlistFromStorage());
  }, []);

  return children;
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const onLayoutRootView = useCallback(async () => {
    await SplashScreen.hideAsync();
  }, []);

  const [fontsLoaded] = useFonts({
    "Switzer-Black": require("./../assets/fonts/Switzer-Black.otf"),
    "Switzer-BlackItalic": require("./../assets/fonts/Switzer-BlackItalic.otf"),
    "Switzer-Bold": require("./../assets/fonts/Switzer-Bold.otf"),
    "Switzer-BoldItalic": require("./../assets/fonts/Switzer-BoldItalic.otf"),
    "Switzer-Extrabold": require("./../assets/fonts/Switzer-Extrabold.otf"),
    "Switzer-ExtraboldItalic": require("./../assets/fonts/Switzer-ExtraboldItalic.otf"),
    "Switzer-Extralight": require("./../assets/fonts/Switzer-Extralight.otf"),
    "Switzer-ExtralightItalic": require("./../assets/fonts/Switzer-ExtralightItalic.otf"),
    "Switzer-Italic": require("./../assets/fonts/Switzer-Italic.otf"),
    "Switzer-Light": require("./../assets/fonts/Switzer-Light.otf"),
    "Switzer-LightItalic": require("./../assets/fonts/Switzer-LightItalic.otf"),
    "Switzer-Medium": require("./../assets/fonts/Switzer-Medium.otf"),
    "Switzer-MediumItalic": require("./../assets/fonts/Switzer-MediumItalic.otf"),
    "Switzer-Regular": require("./../assets/fonts/Switzer-Regular.otf"),
    "Switzer-Semibold": require("./../assets/fonts/Switzer-Semibold.otf"),
    "Switzer-SemiboldItalic": require("./../assets/fonts/Switzer-SemiboldItalic.otf"),
    "Switzer-Thin": require("./../assets/fonts/Switzer-Thin.otf"),
    "Switzer-ThinItalic": require("./../assets/fonts/Switzer-ThinItalic.otf"),
  });

  if (!fontsLoaded) return null;

  LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
     
        <Provider store={store}>
          <AppInitializer>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: isDark ? "#000" : "#fff",
        }}
        onLayout={onLayoutRootView}
      >
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="splash" />
          <Stack.Screen name="index" />
        </Stack>
        <Toast />
      </SafeAreaView>
      </AppInitializer>
      </Provider>
   
    </GestureHandlerRootView>
  );
}
