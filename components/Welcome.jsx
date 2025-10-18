import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  useColorScheme,
} from "react-native";
import { MotiView } from "moti";
import { useRouter } from "expo-router";
import colors from "../theme/colors";

const { width } = Dimensions.get("window");

const Welcome = () => {
  const router = useRouter();
  const scheme = useColorScheme();
  const isDark = scheme === "dark";
  const theme = isDark ? colors.dark : colors.light;

  const currentYear = new Date().getFullYear();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* 🏷 Company Name at Top */}
      <MotiView
        from={{ opacity: 0, translateY: -30, scale: 0.8 }}
        animate={{ opacity: 1, translateY: 0, scale: 1 }}
        transition={{ type: "spring", damping: 12, stiffness: 120 }}
        style={styles.companyWrapper}
      >
        <Text style={styles.companyName}>
          <Text style={{ color: colors.primary }}>Eco</Text>
          <Text style={{ color: colors.warning }}>ly</Text>
        </Text>
      </MotiView>

      {/* 🛍 Year */}
      <MotiView
        from={{ opacity: 0, translateY: -20, rotate: '-10deg' }}
        animate={{ opacity: 1, translateY: 0, rotate: '0deg' }}
        transition={{ type: 'timing', duration: 700, delay: 200 }}
        style={styles.yearContainer}
      >
        <Text style={[styles.year, { color: colors.warning }]}>
          {currentYear} 🛍️
        </Text>
      </MotiView>

      {/* 🛒 Main Sale Info */}
      <MotiView
        from={{ opacity: 0, translateX: -50 }}
        animate={{ opacity: 1, translateX: 0 }}
        transition={{ type: 'spring', delay: 400, damping: 12, stiffness: 120 }}
        style={styles.textSection}
      >
        <Text style={[styles.title, { color: theme.textPrimary }]}>
          Winter Sale is <Text style={{ color: colors.primary }}>Live now</Text>
        </Text>
      </MotiView>

      {/* 🖼️ Image Section */}
      <MotiView
        from={{ opacity: 0, scale: 0.8, rotate: '-10deg' }}
        animate={{ opacity: 1, scale: 1, rotate: '0deg' }}
        transition={{ type: 'timing', duration: 800, delay: 600 }}
        style={styles.imageContainer}
      >
        <Image
          source={require("../assets/images/women.png")}
          style={styles.image}
          resizeMode="contain"
        />
        <View style={[styles.offerTag, { backgroundColor: colors.warning }]}>
          <Text style={styles.offerText}>24% OFF</Text>
          <Text style={styles.offerSubText}>All Winter Collection</Text>
        </View>
      </MotiView>

      {/* 📊 Stats */}
      <MotiView
        from={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', delay: 1000, duration: 500 }}
      >
        <Text style={[styles.productsText, { color: theme.textSecondary }]}>
          10K+ Products
        </Text>
      </MotiView>

      {/* 🚀 Button Fixed Bottom */}
      <View style={styles.buttonWrapper}>
        <MotiView
          from={{ opacity: 0, translateY: 30 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'spring', delay: 1200, damping: 14, stiffness: 120 }}
        >
          <TouchableOpacity
            style={[styles.button, { backgroundColor: colors.primary }]}
            onPress={() => router.push("/auth/SignIn")}
            activeOpacity={0.85}
          >
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </MotiView>
      </View>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop:50,
    paddingHorizontal: 20,
    position: "relative",
  },
  companyWrapper: {
    marginBottom: 8,
  },
  companyName: {
    fontFamily: "Switzer-Extrabold",
    fontSize: 36,
  },
  yearContainer: {
    marginBottom: 10,
  },
  year: {
    fontFamily: "Switzer-Bold",
    fontSize: 20,
  },
  textSection: {
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontFamily: "Switzer-Extrabold",
    fontSize: 28,
    textAlign: "center",
    marginTop: 6,
  },
  imageContainer: {
    marginTop: 20,
    width: width * 0.8,
    height: width * 0.9,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  offerTag: {
    position: "absolute",
    bottom: 16,
    right: 16,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
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
  },
  buttonWrapper: {
    position: "absolute",
    bottom: 40,
    width: "100%",
    paddingHorizontal: 40,
  },
  button: {
    borderRadius: 30,
    paddingVertical: 14,
    alignItems: "center",
    shadowColor: colors.primary,
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 6,
  },
  buttonText: {
    fontFamily: "Switzer-Bold",
    fontSize: 18,
    color: "#fff",
  },
});
