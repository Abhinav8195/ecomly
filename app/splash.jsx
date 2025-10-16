import React, { useEffect } from "react";
import { View, Text, Animated, Easing, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function SplashScreen() {
  const router = useRouter();
  const opacity = new Animated.Value(0);
  const scale = new Animated.Value(0.8);

  useEffect(() => {
    // Animate fade + scale
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease),
      }),
      Animated.spring(scale, {
        toValue: 1,
        friction: 3,
        useNativeDriver: true,
      }),
    ]).start();

    // Redirect after 2.5 sec
    const timer = setTimeout(() => {
      router.replace("/"); // goes to your index screen
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Text
        style={[
          styles.logoText,
          { opacity, transform: [{ scale }] },
        ]}
      >
        Ecomly
      </Animated.Text>
      <Text style={styles.subtitle}>E-commerce Simplified</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#524EB7", // your primary color
    alignItems: "center",
    justifyContent: "center",
  },
  logoText: {
    fontSize: 40,
    fontFamily: "Switzer-Bold",
    color: "#fff",
  },
  subtitle: {
    marginTop: 10,
    fontSize: 16,
    fontFamily: "Switzer-Regular",
    color: "#EAEAEA",
  },
});
