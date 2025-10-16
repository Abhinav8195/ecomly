// components/CategoriesCarousel.js
import React from "react";
import { View, Text, ScrollView, StyleSheet, useColorScheme, TouchableOpacity, Image } from "react-native";
import { MotiView } from "moti";
import colors from "../theme/colors";

const categories = [
  { name: "New", image: require("../assets/images/i1.png") },
  { name: "T-Shirts", image: require("../assets/images/i2.png") },
  { name: "Dresses", image: require("../assets/images/i3.png") },
  { name: "Shoes", image: require("../assets/images/i4.png") },
  { name: "Fashion", image: require("../assets/images/i5.png") },
  { name: "Perfumes", image: require("../assets/images/i6.png") },
  { name: "Bags", image: require("../assets/images/i7.png") },
  { name: "More", image: require("../assets/images/i8.png") },
];

const CategoriesCarousel = ({ onCategoryPress }) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 12 }}>
      {categories.map((cat, idx) => (
        <MotiView
          key={idx}
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ delay: idx * 180, type: "timing", duration: 800 }}
          style={styles.categoryItem}
        >
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => onCategoryPress && onCategoryPress(cat.name)}
          >
            <View
              style={[
                styles.categoryImage,
               
              ]}
            >
              <Image
                source={cat.image}
                style={styles.image}
                resizeMode="contain"
              />
            </View>
            <Text
              style={[
                styles.categoryText,
                { color: isDark ? colors.dark.textPrimary : "#333" },
              ]}
            >
              {cat.name}
            </Text>
          </TouchableOpacity>
        </MotiView>
      ))}
    </ScrollView>
  );
};

export default CategoriesCarousel;

const styles = StyleSheet.create({
  categoryItem: {
    alignItems: "center",
    marginRight: 24,
  },
  categoryImage: {
    width: 65,
    height: 65,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  image: {
    width: "90%",
    height: "90%",
    borderRadius: 40,
  },
  categoryText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
});
