import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { useRouter } from "expo-router";
import colors from "../theme/colors"; 

const { width } = Dimensions.get("window");

const Welcome = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* 🔹 Top Section */}
      <View style={styles.textSection}>
        <Text style={styles.year}>2023 🛍️</Text>
        <Text style={styles.title}>
          Winter Sale is{" "}
          <Text style={{ color: colors.primary }}>Live now</Text>
        </Text>
      </View>

      {/* 🔹 Image Section */}
      <View style={styles.imageContainer}>
        <View style={styles.imageCard}>
          <Image
            source={require("../assets/images/women.png")} 
            style={styles.image}
            resizeMode="cover"
          />
          <View style={styles.offerTag}>
            <Text style={styles.offerText}>24% OFF</Text>
            <Text style={styles.offerSubText}>All Winter Collection</Text>
          </View>
        </View>
      </View>

      {/* 🔹 Stats */}
      <Text style={styles.productsText}>10K+ Products</Text>

      {/* 🔹 Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/auth/SignIn")}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light.background,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  textSection: {
    alignItems: "center",
    marginBottom: 20,
  },
  year: {
    fontFamily: "Switzer-Bold",
    fontSize: 20,
    color: colors.warning,
  },
  title: {
    fontFamily: "Switzer-Extrabold",
    fontSize: 30,
    textAlign: "center",
    color: colors.light.textPrimary,
  },
  imageContainer: {
    marginTop: 20,
  },
  imageCard: {
    backgroundColor: colors.primary,
    borderRadius: 24,
    width: width * 0.75,
    height: width * 0.9,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 24,
  },
  offerTag: {
    position: "absolute",
    bottom: 16,
    right: 16,
    backgroundColor: colors.warning,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  offerText: {
    fontFamily: "Switzer-Bold",
    fontSize: 14,
    color: "#fff",
  },
  offerSubText: {
    fontFamily: "Switzer-Regular",
    fontSize: 10,
    color: "#fff",
  },
  productsText: {
    fontFamily: "Switzer-Medium",
    fontSize: 16,
    marginTop: 20,
    color: colors.light.textSecondary,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 30,
    paddingVertical: 14,
    paddingHorizontal: 40,
    marginTop: 30,
  },
  buttonText: {
    fontFamily: "Switzer-Bold",
    fontSize: 18,
    color: "#fff",
  },
});
