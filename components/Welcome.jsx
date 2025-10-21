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
import { LinearGradient } from "expo-linear-gradient";
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
    <View style={styles.container}>
      {/* Background Gradient */}
      <LinearGradient
        colors={
          isDark
            ? ["#000000", "#000000", "#000000"]
            : ["#ffffff", "#FFFFFF"]
        }
        style={StyleSheet.absoluteFillObject}
      />

      {/* Company Name */}
      <MotiView
        from={{ opacity: 0, translateY: -40 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: "spring", damping: 10, stiffness: 100 }}
        style={styles.companyWrapper}
      >
        <Text style={styles.companyName}>
          <Text style={{ color: colors.light.redPrimary }}>Baj</Text>
          <Text style={{ color:isDark?"white":"black" }}>Go</Text>
        </Text>
      </MotiView>

      {/* Year */}
      <MotiView
        from={{ opacity: 0, rotate: "-10deg" }}
        animate={{ opacity: 1, rotate: "0deg" }}
        transition={{ type: "timing", duration: 600, delay: 200 }}
      >
        <Text style={[styles.year, { color: isDark?"white": theme.redPrimary }]}>
          {currentYear} 🛍️
        </Text>
      </MotiView>

      {/* Title */}
      <MotiView
        from={{ opacity: 0, translateY: 30 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: "spring", delay: 300, damping: 12 }}
        style={styles.textSection}
      >
        <Text style={[styles.title, { color: theme.redTextPrimary }]}>
          Winter Sale is{" "}
          <Text style={{ color: theme.redPrimary }}>Live Now!</Text>
        </Text>
        <Text style={[styles.subtitle, { color: colors.light.redPrimary }]}>
          Grab exclusive deals before they're gone.
        </Text>
      </MotiView>

      {/* Image Section */}
      <MotiView
        from={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "timing", duration: 800, delay: 500 }}
        style={styles.imageContainer}
      >
        <Image
          source={require("../assets/images/women.png")}
          style={styles.image}
          resizeMode="contain"
        />
        <View
          style={[
            styles.offerTag,
            { backgroundColor: colors.light.redPrimary },
          ]}
        >
          <Text style={styles.offerText}>24% OFF</Text>
          <Text style={styles.offerSubText}>Winter Collection</Text>
        </View>
      </MotiView>

      {/* Stats */}
      <MotiView
        from={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: "timing", delay: 900 }}
      >
        <Text
          style={[styles.productsText, { color: colors.light.redPrimary }]}
        >
          10K+ Premium Products
        </Text>
      </MotiView>

      {/* Button */}
      <MotiView
        from={{ opacity: 0, translateY: 40 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: "spring", delay: 1100 }}
        style={styles.buttonWrapper}
      >
        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: colors.light.redPrimary },
          ]}
          onPress={() => router.push("/auth/SignIn")}
          activeOpacity={0.85}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </MotiView>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  companyWrapper: {
    marginBottom: 6,
  },
  companyName: {
    fontFamily: "Switzer-Extrabold",
    fontSize: 38,
    textAlign: "center",
  },
  year: {
    fontFamily: "Switzer-Bold",
    fontSize: 18,
    marginBottom: 16,
  },
  textSection: {
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontFamily: "Switzer-Extrabold",
    fontSize: 26,
    textAlign: "center",
  },
  subtitle: {
    fontFamily: "Switzer-Regular",
    fontSize: 14,
    textAlign: "center",
    marginTop: 4,
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
    bottom: 14,
    right: 14,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  offerText: {
    fontFamily: "Switzer-Bold",
    fontSize: 13,
    color: "#fff",
  },
  offerSubText: {
    fontFamily: "Switzer-Regular",
    fontSize: 10,
    color: "#fff",
  },
  productsText: {
    fontFamily: "Switzer-Medium",
    fontSize: 15,
    marginTop: 18,
  },
  buttonWrapper: {
    marginTop: 30,
    width: "100%",
    paddingHorizontal: 40,
  },
  button: {
    borderRadius: 30,
    paddingVertical: 14,
    alignItems: "center",
    elevation: 6,
    shadowOpacity: 0.4,
    shadowRadius: 8,
  },
  buttonText: {
    fontFamily: "Switzer-Bold",
    fontSize: 18,
    color: "#fff",
  },
});
