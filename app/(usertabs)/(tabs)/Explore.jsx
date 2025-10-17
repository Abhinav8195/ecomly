import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  useColorScheme,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../../theme/colors";

const Explore = () => {
  const scheme = useColorScheme();
  const isDark = scheme === "dark";
  const theme = isDark ? colors.dark : colors.light;

  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Tops", "Hoodie", "Shoe", "Dress"];

  const products = [
    {
      id: "1",
      name: "Breathable Hoodie",
      price: "$82.50",
      image:
        "https://images.unsplash.com/photo-1602810318383-e386cc2a3d3d?w=500",
      description: "Part of a matching set • more colors",
      favorite: true,
    },
    {
      id: "2",
      name: "Winter Best Hoodie",
      price: "$90.40",
      image:
        "https://images.unsplash.com/photo-1593032465171-d04c7e85f070?w=500",
      description: "Part of a matching set • more colors",
      favorite: false,
    },
    {
      id: "3",
      name: "Murukesh T-Shirts",
      price: "$80.90",
      image:
        "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=500",
      description: "Part of a matching set • more colors",
      favorite: false,
    },
    {
      id: "4",
      name: "Pantalone T-Shirts",
      price: "$52.70",
      image:
        "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=500",
      description: "Part of a matching set • more colors",
      favorite: true,
    },
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: theme.textPrimary }]}>
          Explore
        </Text>
        <TouchableOpacity>
          <Ionicons name="search" size={22} color={theme.textPrimary} />
        </TouchableOpacity>
      </View>

      {/* Category Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryContainer}
      >
        {categories.map((item) => (
          <TouchableOpacity
            key={item}
            style={[
              styles.categoryTab,
              {
                backgroundColor:
                  selectedCategory === item ? colors.primary : theme.card,
              },
            ]}
            onPress={() => setSelectedCategory(item)}
          >
            <Text
              style={[
                styles.categoryText,
                {
                  color:
                    selectedCategory === item
                      ? "#fff"
                      : theme.textSecondary,
                },
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Product Grid */}
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{ justifyContent: "space-between", paddingHorizontal: 20 }}
        renderItem={({ item }) => (
          <TouchableOpacity style={[styles.card, { backgroundColor: theme.card }]}>
            <View style={styles.imageContainer}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <TouchableOpacity style={styles.favoriteButton}>
                <Ionicons
                  name={item.favorite ? "heart" : "heart-outline"}
                  size={20}
                  color={item.favorite ? "red" : theme.textPrimary}
                />
              </TouchableOpacity>
            </View>

            <Text style={[styles.productName, { color: theme.textPrimary }]}>
              {item.name}
            </Text>
            <Text style={[styles.productDesc, { color: theme.textSecondary }]}>
              {item.description}
            </Text>
            <Text style={[styles.price, { color: colors.primary }]}>
              {item.price}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Explore;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
  },
  categoryContainer: {
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  categoryTab: {
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 20,
    marginRight: 10,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: "600",
  },
  card: {
    width: "47%",
    borderRadius: 16,
    padding: 10,
    marginBottom: 20,
  },
  imageContainer: {
    position: "relative",
  },
  image: {
    width: "100%",
    height: 160,
    borderRadius: 14,
  },
  favoriteButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 5,
    elevation: 3,
  },
  productName: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 8,
  },
  productDesc: {
    fontSize: 12,
    marginTop: 3,
  },
  price: {
    fontSize: 14,
    fontWeight: "700",
    marginTop: 5,
  },
});
