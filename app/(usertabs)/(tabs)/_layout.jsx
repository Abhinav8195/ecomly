import React from "react";
import { Tabs } from "expo-router";
import { View, TouchableOpacity, StyleSheet, Platform, useColorScheme, Text } from "react-native";
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
  const cartLength = cart.length;

  const icons = {
    Home: "home-outline",
    Explore: "compass-outline",
    Cart: "cart-outline",
    Wishlist: "heart-outline",
    Profile: "person-outline",
  };

  return (
    <View style={styles.tabWrapper}>
      <View
        style={[
          styles.tabContainer,
          {
            backgroundColor:
              scheme === "dark" ? colors.dark.card : colors.light.background,
          },
        ]}
      >
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          const onPress = () => navigation.navigate(route.name);
          const isCart = route.name === "Cart";

          return (
            <TouchableOpacity
              key={route.name}
              onPress={onPress}
              activeOpacity={0.8}
              style={styles.tabButton}
            >
              <MotiView
                animate={{
                  translateY: isCart && isFocused ? -15 : 0,
                  scale: isFocused ? 1.2 : 1,
                }}
                transition={{
                  type: "spring",
                  damping: 12,
                  stiffness: 150,
                }}
                style={{ alignItems: "center", justifyContent: "center" }}
              >
                <AnimatePresence>
                  {isCart && isFocused && (
                    <MotiView
                      from={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 0.99, scale: 1 }}
                      exit={{ opacity: 0, scale: 0 }}
                      transition={{ type: "timing", duration: 300 }}
                      style={[
                        styles.glowCircle,
                        {
                          backgroundColor:
                            scheme === "dark"
                              ? colors.primary
                              : colors.primary,
                        },
                      ]}
                    />
                  )}
                </AnimatePresence>

                {/* 🛒 Cart Badge */}
                {isCart && cartLength > 0 && (
                  <View style={styles.badgeContainer}>
                    <Text style={styles.badgeText}>
                      {cartLength > 9 ? "9+" : cartLength}
                    </Text>
                  </View>
                )}

                <Ionicons
                  name={icons[route.name]}
                  size={26}
                  color={
                    isCart && isFocused
                      ? "#fff"
                      : isFocused
                      ? "#6C5CE7"
                      : "#A0A0A0"
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
    backgroundColor: "#F6F6FA",
    marginHorizontal: 20,
    marginBottom: Platform.OS === "ios" ? 30 : 20,
    borderRadius: 30,
    paddingVertical: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 8,
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
    backgroundColor: "#6C5CE7",
  },
  badgeContainer: {
    position: "absolute",
    top: -4,
    right: -6,
    backgroundColor: "red",
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
