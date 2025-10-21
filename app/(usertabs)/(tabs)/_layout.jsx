import React from "react";
import { Tabs } from "expo-router";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Platform,
  useColorScheme,
  Text,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MotiView, AnimatePresence } from "moti";
import colors from "../../../theme/colors";
import { useSelector } from "react-redux";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tabs.Screen name="Home" />
      <Tabs.Screen name="Explore" />
      <Tabs.Screen name="Cart" />
      <Tabs.Screen name="Wishlist" />
      <Tabs.Screen name="Profile" />
    </Tabs>
  );
}

function CustomTabBar({ state, navigation }) {
  const scheme = useColorScheme();
  const theme = scheme === "dark" ? colors.dark : colors.light;
  const cart = useSelector((state) => state.cart.cart);
  const wishlist = useSelector((state) => state.wishlist.wishlist);
  const wishlistLength = wishlist.length;
  const cartLength = cart.length;

  const icons = {
    Home: "home-outline",
    Explore: "compass-outline",
    Cart: "cart-outline",
    Wishlist: "heart-outline",
    Profile: "person-outline",
  };

  // pick red shades from theme.js
  const activeColor =
    scheme === "dark" ? theme.redPrimary || "#D32F2F" : theme.redPrimary || "#D32F2F";
  const backgroundColor =
    scheme === "dark"
      ? theme.card || "#2A1111"
      : theme.redBackground || "#FFFFFF";
  const glowColor = activeColor;
  const inactiveColor = "#A0A0A0";

  return (
    <View style={styles.tabWrapper}>
      <View
        style={[
          styles.tabContainer,
          {
            backgroundColor: backgroundColor,
            shadowColor: activeColor,
          },
        ]}
      >
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          const onPress = () => navigation.navigate(route.name);
          const isCart = route.name === "Cart";
          const isWishlist = route.name === "Wishlist";

          return (
            <TouchableOpacity
              key={route.name}
              onPress={onPress}
              activeOpacity={0.8}
              style={styles.tabButton}
            >
              <MotiView
                animate={{
                  translateY: isFocused && isCart ? -15 : 0,
                  scale: isFocused ? 1.2 : 1,
                }}
                transition={{
                  type: "spring",
                  damping: 12,
                  stiffness: 150,
                }}
                style={{ alignItems: "center", justifyContent: "center" }}
              >
                {/* 🔥 Red Glow behind active Cart */}
                <AnimatePresence>
                  {isCart && isFocused && (
                    <MotiView
                      from={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0 }}
                      transition={{ type: "timing", duration: 300 }}
                      style={[styles.glowCircle, { backgroundColor: glowColor }]}
                    />
                  )}
                </AnimatePresence>

                {/* 🛒 Cart Badge */}
                {isCart && cartLength > 0 && (
                  <View style={[styles.badgeContainer, { backgroundColor: activeColor }]}>
                    <Text style={styles.badgeText}>
                      {cartLength > 9 ? "9+" : cartLength}
                    </Text>
                  </View>
                )}

                {/* ❤️ Wishlist Badge */}
                {isWishlist && wishlistLength > 0 && (
                  <View style={[styles.badgeContainer, { backgroundColor: activeColor }]}>
                    <Text style={styles.badgeText}>
                      {wishlistLength > 9 ? "9+" : wishlistLength}
                    </Text>
                  </View>
                )}

                <Ionicons
  name={icons[route.name]}
  size={26}
  color={
    isFocused
      ? route.name === "Cart"
        ? "#FFFFFF" // Cart active → white icon
        : activeColor // others active → red
      : inactiveColor // inactive → gray
  }
/>

              </MotiView>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tabWrapper: {
    backgroundColor: "transparent",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: Platform.OS === "ios" ? 30 : 20,
    borderRadius: 30,
    paddingVertical: 12,
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 10,
  },
  tabButton: {
    alignItems: "center",
    justifyContent: "center",
    width: 55,
  },
  glowCircle: {
    position: "absolute",
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  badgeContainer: {
    position: "absolute",
    top: -4,
    right: -6,
    borderRadius: 10,
    paddingHorizontal: 5,
    minWidth: 18,
    height: 18,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  badgeText: {
    color: "white",
    fontSize: 11,
    fontWeight: "bold",
  },
});
