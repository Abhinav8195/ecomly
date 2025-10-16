// components/OfferCarousel.js
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, useColorScheme } from "react-native";
import { MotiView, AnimatePresence } from "moti";
import colors from "../theme/colors";
import { Easing } from "react-native-reanimated";
import { useFonts } from "expo-font";

const offersData = [
  { title: "Up To", offer: "50% off", code: "WITH CODE" },
  { title: "Flat", offer: "30% off", code: "TODAY ONLY" },
  { title: "Mega Sale", offer: "70% off", code: "LIMITED" },
  { title: "Special", offer: "20% off", code: "EXTRA10" },
];

const OfferCarousel = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const [currentIndex, setCurrentIndex] = useState(0);

  const [fontsLoaded] = useFonts({
    "Switzer-Bold": require("../assets/fonts/Switzer-Bold.otf"),
    "Switzer-Extrabold": require("../assets/fonts/Switzer-Extrabold.otf"),
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % offersData.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  if (!fontsLoaded) return null;

  const currentOffer = offersData[currentIndex];

  return (
    <AnimatePresence exitBeforeEnter>
      <MotiView
        key={currentIndex}
        from={{ opacity: 0, translateX: 100 }}
        animate={{ opacity: 1, translateX: 0 }}
        exit={{ opacity: 0, translateX: -100 }}
        transition={{ type: "timing", duration: 500, easing: Easing.inOut(Easing.ease) }}
        style={[styles.card, { backgroundColor: colors.primary }]}
      >
        <View>
          <Text
            style={[
              styles.offerTitle,
              { color:  "#D0CEFF", fontFamily: "Switzer-Bold" },
            ]}
          >
            {currentOffer.title}
          </Text>
          <Text
            style={[
              styles.offerText,
              { color: "#FFF", fontFamily: "Switzer-Extrabold" },
            ]}
          >
            {currentOffer.offer}
          </Text>
          <Text
            style={[
              styles.offerCode,
              { color: isDark ? "#EEE" : "#D0CEFF", fontFamily: "Switzer-Bold" },
            ]}
          >
            {currentOffer.code}
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.getNowButton, { backgroundColor: "#FFF" }]}
          onPress={() => console.log("Offer clicked", currentOffer.offer)}
        >
          <Text
            style={[
              styles.getNowText,
              { color: colors.primary, fontFamily: "Switzer-Bold" },
            ]}
          >
            Get it now
          </Text>
        </TouchableOpacity>
      </MotiView>
    </AnimatePresence>
  );
};

export default OfferCarousel;

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 20,
    marginVertical: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  offerTitle: {
    fontSize: 14,
    opacity: 0.8,
  },
  offerText: {
    fontSize: 24,
    fontWeight: "700",
    marginVertical: 2,
  },
  offerCode: {
    fontSize: 13,
    letterSpacing: 1,
    marginTop: 2,
    fontWeight: "600",
  },
  getNowButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  getNowText: {
    fontSize: 14,
    fontWeight: "600",
  },
});
