import React, { useRef, useState } from "react";
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
import { MotiView } from "moti";
import { MotiPressable } from "moti/interactions";
import * as Haptics from "expo-haptics";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromWishlist } from "../../../redux/WishListReducer";
import exploreData from "../../../exploreData";
import colors from "../../../theme/colors";
import { router } from "expo-router";
import ActionSheet from "react-native-actions-sheet";
import FilterSheet from "../../../components/FilterSheet";

const Explore = () => {
  const scheme = useColorScheme();
  const isDark = scheme === "dark";
  const theme = isDark ? colors.dark : colors.light;
  const actionSheetRef = useRef(null);

  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.wishlist);

  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Tops", "Hoodie", "Shoe", "Dress"];

  const toggleWishlist = (item) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    const normalizedItem = { ...item, id: String(item.id) };
    const isLiked = wishlist.some((i) => i.id === normalizedItem.id);

    if (isLiked) {
      dispatch(removeFromWishlist(normalizedItem));
      Toast.show({
        type: "info",
        text1: `${item.name} removed from wishlist`,
      });
    } else {
      dispatch(addToWishlist(normalizedItem));
      Toast.show({
        type: "success",
        text1: `${item.name} added to wishlist`,
      });
    }
  };

  const [filters, setFilters] = useState({
    categories: [],
    sizes: [],
    colors: [],
    minRating: 0,
    priceSort: null,
  });

  const applyFilters = (selectedFilters) => {
    setFilters(selectedFilters);
  };

  // Filter logic
  const filteredData = exploreData
  .filter(item =>
    selectedCategory === "All" ? true : item.category.toLowerCase() === selectedCategory.toLowerCase()
  )
  .filter(item =>
    filters.categories?.length > 0 ? filters.categories.includes(item.category) : true
  )
  .filter(item =>
    filters.sizes?.length > 0 ? item.sizes.some(size => filters.sizes.includes(size)) : true
  )
  .filter(item =>
    filters.colors?.length > 0 ? item.colors.some(color => filters.colors.includes(color)) : true
  )
  .filter(item => item.rating >= (filters.minRating || 0))
  .sort((a, b) => {
    const parsePrice = (p) => parseFloat(p.toString().replace(/[^0-9.]/g, ""));
    if (filters.priceSort === "low") return parsePrice(a.price) - parsePrice(b.price);
    if (filters.priceSort === "high") return parsePrice(b.price) - parsePrice(a.price);
    return 0;
  });


  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text
          style={[
            styles.headerTitle,
            { color: theme.textPrimary, fontFamily: "Switzer-Bold" },
          ]}
        >
          Explore
        </Text>
        <View style={{ flexDirection: "row", gap: 15, alignItems: "center" }}>
          <TouchableOpacity activeOpacity={0.7}>
            <Ionicons name="search" size={22} color={theme.textPrimary} />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => actionSheetRef.current?.show()}
          >
            <Ionicons name="filter" size={24} color={theme.textPrimary} />
          </TouchableOpacity>
        </View>
      </View>

      <MotiView
  key={selectedCategory} 
  from={{ opacity: 0, translateY: 10 }}
  animate={{ opacity: 1, translateY: 0 }}
  transition={{ type: "timing", duration: 500 }}
  style={{ paddingHorizontal: 20, paddingTop: 10 }}
>
  <Text
    style={{
      fontSize: 16,
      fontFamily: "Switzer-Semibold",
      color: theme.textPrimary,
    }}
  >
    {selectedCategory === "All"
      ? "All New Arrival"
      : `All ${selectedCategory}${selectedCategory.endsWith('s') ? '' : 's'}`}
  </Text>
</MotiView>


      {/* Category Tabs */}
      <MotiView
        from={{ opacity: 0, translateY: -10 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: "timing", duration: 800 }}
      >
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryContainer}
        >
          {categories.map((item, index) => (
            <MotiPressable
              key={item}
              from={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 80 }}
              onPress={() => setSelectedCategory(item)}
              style={[
                styles.categoryTab,
                {
                  backgroundColor:
                    selectedCategory === item ? colors.primary : theme.card,
                },
              ]}
            >
              <Text
                style={[
                  styles.categoryText,
                  {
                    color:
                      selectedCategory === item ? "#fff" : theme.textSecondary,
                    fontFamily: "Switzer-Medium",
                  },
                ]}
              >
                {item}
              </Text>
            </MotiPressable>
          ))}
        </ScrollView>
      </MotiView>

      <View
        style={{ borderBottomWidth: 0.3, borderColor: theme.textSecondary }}
      />

      {/* Product Grid */}
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 10,
          paddingBottom: 90,
          flexGrow: 1,
        }}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        renderItem={({ item, index }) => {
          const isLiked = wishlist.some((i) => i.id === String(item.id));

          return (
            <MotiView
              from={{ opacity: 0, translateY: 20 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ delay: index * 100, type: "timing" }}
              style={[
                styles.card,
                {
                  backgroundColor: theme.card,
                  borderWidth: 0.3,
                  borderColor: isDark ? colors.dark.background : "#ddd",
                },
              ]}
            >
              <TouchableOpacity
                activeOpacity={0.85}
                style={{ flex: 1 }}
                onPress={() =>
                  router.push({
                    pathname: "/ProductDetails",
                    params: {
                      id: String(item.id),
                      name: item.name,
                      price: item.price,
                      rating: item.rating,
                      description: item.description,
                      colors: JSON.stringify(item.colors),
                      sizes: JSON.stringify(item.sizes),
                      reviews: item.reviews,
                      imageKey: item.id,
                      shop: item.shop,
                    },
                  })
                }
              >
                <View style={styles.imageContainer}>
                  <Image source={{ uri: item.image }} style={styles.image} />
                  <TouchableOpacity
                    style={[styles.favoriteButton, { backgroundColor: isDark ? theme.surface : "#fff" }]}
                    activeOpacity={0.7}
                    onPress={() => toggleWishlist(item)}
                  >
                    <MotiView
                      from={{ scale: 0.8 }}
                      animate={{ scale: isLiked ? 1.2 : 1 }}
                      transition={{ type: "timing", duration: 200 }}
                    >
                      <Ionicons
                        name={isLiked ? "heart" : "heart-outline"}
                        size={20}
                        color={colors.warning}
                      />
                    </MotiView>
                  </TouchableOpacity>
                </View>

                <Text
                  style={[styles.productName, { color: theme.textPrimary, fontFamily: "Switzer-Semibold" }]}
                  numberOfLines={1}
                >
                  {item.name}
                </Text>
                <Text
                  style={[styles.productDesc, { color: theme.textSecondary, fontFamily: "Switzer-Regular" }]}
                  numberOfLines={2}
                >
                  {item.description}
                </Text>
                <Text style={[styles.price, { color: colors.warning, fontFamily: "Switzer-Bold" }]}>
                  {item.price}
                </Text>
              </TouchableOpacity>
            </MotiView>
          );
        }}
        ListEmptyComponent={() => (
          <View style={{ flex: 1, alignItems: "center", justifyContent: "center", marginTop: 100 }}>
            <Ionicons name="alert-circle-outline" size={40} color={theme.textSecondary} />
            <Text style={{ color: theme.textSecondary, fontFamily: "Switzer-Medium", fontSize: 15, marginTop: 10 }}>
              No related products found
            </Text>
          </View>
        )}
      />

      <ActionSheet ref={actionSheetRef}>
        <FilterSheet
        currentFilters={filters}
          onApply={(filters) => {
            applyFilters(filters);
            actionSheetRef.current?.hide();
          }}
          onClose={() => actionSheetRef.current?.hide()}
        />
      </ActionSheet>
    </View>
  );
};

export default Explore;

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: { fontSize: 26 },
  categoryContainer: { paddingHorizontal: 20, paddingVertical: 10 },
  categoryTab: {
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 20,
    marginRight: 10,
    elevation: 2,
  },
  categoryText: { fontSize: 14 },
  card: {
    width: "47%",
    borderRadius: 18,
    padding: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  imageContainer: { position: "relative" },
  image: { width: "100%", height: 160, borderRadius: 14 },
  favoriteButton: { position: "absolute", top: 10, right: 10, borderRadius: 20, padding: 5, elevation: 3 },
  productName: { fontSize: 14, marginTop: 8 },
  productDesc: { fontSize: 12, marginTop: 3 },
  price: { fontSize: 14, marginTop: 5 },
});
