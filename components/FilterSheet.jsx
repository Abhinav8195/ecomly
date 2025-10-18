import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  useColorScheme,
} from "react-native";
import colors from "../theme/colors";
import { Ionicons } from "@expo/vector-icons";
import { MotiView, AnimatePresence } from "moti";

const categories = ["Tops", "Hoodie", "Shoe", "Dress"];
const sizes = ["S", "M", "L", "XL"];
const colorOptions = ["#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#000"];

const FilterSheet = ({ onApply, onClose,currentFilters  }) => {
  const scheme = useColorScheme();
  const isDark = scheme === "dark";
  const theme = isDark ? colors.dark : colors.light;

    const [selectedCategories, setSelectedCategories] = useState(
    currentFilters?.categories || []
  );
  const [selectedSizes, setSelectedSizes] = useState(currentFilters?.sizes || []);
  const [selectedColors, setSelectedColors] = useState(currentFilters?.colors || []);
  const [minRating, setMinRating] = useState(currentFilters?.minRating || 0);
  const [priceSort, setPriceSort] = useState(currentFilters?.priceSort || null);

  const toggleSelection = (array, setArray, value) => {
    if (array.includes(value)) {
      setArray(array.filter((v) => v !== value));
    } else {
      setArray([...array, value]);
    }
  };

  return (
    <AnimatePresence>
      <MotiView
        from={{ translateY: 300, opacity: 0 }}
        animate={{ translateY: 0, opacity: 1 }}
        exit={{ translateY: 300, opacity: 0 }}
        transition={{ type: "timing", duration: 300 }}
        style={[styles.container, { backgroundColor: theme.background }]}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text
            style={[
              styles.headerText,
              { color: theme.textPrimary, fontFamily: "Switzer-Bold" },
            ]}
          >
            Filter Products
          </Text>
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="close" size={24} color={theme.textPrimary} />
          </TouchableOpacity>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 30 }}
        >
          {/* Categories */}
          <Text
            style={[
              styles.sectionTitle,
              { color: theme.textPrimary, fontFamily: "Switzer-Semibold" },
            ]}
          >
            Categories
          </Text>
          <View style={styles.row}>
            {categories.map((cat, i) => (
              <MotiView
                key={cat}
                from={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: i * 50 }}
              >
                <TouchableOpacity
                  style={[
                    styles.optionButton,
                    { borderColor: theme.border },
                    selectedCategories.includes(cat) && {
                      backgroundColor: colors.primary,
                      borderColor: colors.primary,
                    },
                  ]}
                  onPress={() =>
                    toggleSelection(selectedCategories, setSelectedCategories, cat)
                  }
                >
                  <Text
                    style={[
                      styles.optionText,
                      {
                        color: selectedCategories.includes(cat)
                          ? "#fff"
                          : theme.textSecondary,
                      },
                    ]}
                  >
                    {cat}
                  </Text>
                </TouchableOpacity>
              </MotiView>
            ))}
          </View>

          {/* Sizes */}
          <Text
            style={[
              styles.sectionTitle,
              { color: theme.textPrimary, fontFamily: "Switzer-Semibold" },
            ]}
          >
            Sizes
          </Text>
          <View style={styles.row}>
            {sizes.map((size, i) => (
              <MotiView
                key={size}
                from={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: i * 50 }}
              >
                <TouchableOpacity
                  style={[
                    styles.optionButton,
                    { borderColor: theme.border },
                    selectedSizes.includes(size) && {
                      backgroundColor: colors.primary,
                      borderColor: colors.primary,
                    },
                  ]}
                  onPress={() =>
                    toggleSelection(selectedSizes, setSelectedSizes, size)
                  }
                >
                  <Text
                    style={[
                      styles.optionText,
                      {
                        color: selectedSizes.includes(size)
                          ? "#fff"
                          : theme.textSecondary,
                      },
                    ]}
                  >
                    {size}
                  </Text>
                </TouchableOpacity>
              </MotiView>
            ))}
          </View>

          {/* Colors */}
          <Text
            style={[
              styles.sectionTitle,
              { color: theme.textPrimary, fontFamily: "Switzer-Semibold" },
            ]}
          >
            Colors
          </Text>
          <View style={styles.row}>
            {colorOptions.map((color, i) => (
              <MotiView
                key={color}
                from={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: i * 50 }}
              >
                <TouchableOpacity
                  style={[
                    styles.colorCircle,
                    { backgroundColor: color, borderColor: theme.border },
                    selectedColors.includes(color) && {
                      borderWidth: 3,
                      borderColor: colors.primary,
                    },
                  ]}
                  onPress={() =>
                    toggleSelection(selectedColors, setSelectedColors, color)
                  }
                />
              </MotiView>
            ))}
          </View>

          {/* Rating */}
          <Text
            style={[
              styles.sectionTitle,
              { color: theme.textPrimary, fontFamily: "Switzer-Semibold" },
            ]}
          >
            Minimum Rating
          </Text>
          <View style={styles.row}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity key={star} onPress={() => setMinRating(star)}>
                <Ionicons
                  name={star <= minRating ? "star" : "star-outline"}
                  size={24}
                  color="#FFD700"
                  style={{ marginRight: 5 }}
                />
              </TouchableOpacity>
            ))}
          </View>

          {/* Price Sort */}
          <Text
            style={[
              styles.sectionTitle,
              { color: theme.textPrimary, fontFamily: "Switzer-Semibold" },
            ]}
          >
            Sort by Price
          </Text>
          <View style={styles.row}>
            {[
              { label: "Low to High", value: "low" },
              { label: "High to Low", value: "high" },
            ].map((option) => (
              <MotiView
                key={option.value}
                from={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 50 }}
              >
                <TouchableOpacity
                  style={[
                    styles.optionButton,
                    { borderColor: theme.border },
                    priceSort === option.value && {
                      backgroundColor: colors.primary,
                      borderColor: colors.primary,
                    },
                  ]}
                  onPress={() => setPriceSort(option.value)}
                >
                  <Text
                    style={[
                      styles.optionText,
                      {
                        color:
                          priceSort === option.value ? "#fff" : theme.textSecondary,
                      },
                    ]}
                  >
                    {option.label}
                  </Text>
                </TouchableOpacity>
              </MotiView>
            ))}
          </View>

          {/* Buttons */}
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: theme.border }]}
              onPress={() => {
                setSelectedCategories([]);
                setSelectedSizes([]);
                setSelectedColors([]);
                setMinRating(0);
                setPriceSort(null);
              }}
            >
              <Text style={[styles.buttonText, { color: theme.textPrimary }]}>
                Reset
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, { backgroundColor: colors.primary }]}
              onPress={() =>
               onApply({
  categories: selectedCategories,
  sizes: selectedSizes,
  colors: selectedColors,
  minRating,
  priceSort,
})

              }
            >
              <Text style={[styles.buttonText, { color: "#fff" }]}>Apply</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </MotiView>
    </AnimatePresence>
  );
};

export default FilterSheet;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  headerText: { fontSize: 20, fontWeight: "700" },
  sectionTitle: { fontSize: 16, fontWeight: "600", marginVertical: 10 },
  row: { flexDirection: "row", flexWrap: "wrap", gap: 10, marginBottom: 10 },
  optionButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    borderWidth: 1,
  },
  optionText: { fontSize: 14 },
  colorCircle: { width: 30, height: 30, borderRadius: 15, borderWidth: 1 },
  buttonRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 20 },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: "center",
    marginHorizontal: 5,
  },
  buttonText: { fontSize: 16, fontWeight: "600" },
});
