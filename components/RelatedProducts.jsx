import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  useColorScheme,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MotiView } from "moti";
import colors from "../theme/colors";
import { router } from "expo-router";
import products from "../data";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 16 * 3) / 2; 

const RelatedProducts = () => {
  const scheme = useColorScheme();
  const isDark = scheme === "dark";
  const theme = isDark ? colors.dark : colors.light;

  return (
    <View style={styles.container}>
      <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>
        Related Products
      </Text>

      <FlatList
        data={products}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        columnWrapperStyle={{ justifyContent:"space-around",gap:10 ,marginBottom: 16 }}
        renderItem={({ item, index }) => (
          <MotiView
            from={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: "timing", duration: 400, delay: index * 100 }}
            style={[
              styles.card,
              {
                backgroundColor: isDark ? colors.dark.card : "#FFF",
                borderColor: isDark ? "#2D2C38" : "#ddd",
              },
            ]}
          >
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() =>
                router.push({
                  pathname: "/ProductDetails",
                  params: {
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    rating: item.rating,
                    description: item.description,
                    colors: JSON.stringify(item.colors),
                    sizes: JSON.stringify(item.sizes),
                    reviews: item.reviews,
                    imageKey: item.id,
                    shop:item.shop
                  },
                })
              }
            >
              <View style={styles.imageWrapper}>
                <Image source={item.image} style={styles.productImage} />
                <TouchableOpacity style={styles.heartIcon}>
                  <Ionicons name="heart-outline" size={18} color={colors.warning} />
                </TouchableOpacity>
              </View>

              <View style={styles.info}>
                <Text style={[styles.productName, { color: theme.textPrimary }]}>
                  {item.name}
                </Text>
                <Text style={[styles.productPrice, { color: colors.primary }]}>
                  {item.price}
                </Text>

                <View style={styles.colorsRow}>
                  {item.colors.map((clr, i) => (
                    <View key={i} style={[styles.dot, { backgroundColor: clr }]} />
                  ))}
                </View>

                <View style={styles.ratingRow}>
                  <Ionicons name="star" size={14} color="#FFC107" />
                  <Text style={[styles.ratingText, { color: isDark ? "#fff" : "#000" }]}>
                    {item.rating}
                  </Text>
                  <TouchableOpacity
                    style={[
                      styles.cartIcon,
                      { backgroundColor: isDark ? colors.dark.textSecondary : "#F1EEFF" },
                    ]}
                  >
                    <Ionicons
                      name="cart-outline"
                      size={16}
                      color={isDark ? colors.dark.textPrimary : colors.primary}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          </MotiView>
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 16 }}
      />
    </View>
  );
};

export default RelatedProducts;

const styles = StyleSheet.create({
  container: { marginTop: 22 },
  sectionTitle: { fontSize: 18, fontWeight: "700", marginBottom: 14 },
  card: {
    width: CARD_WIDTH,
    borderRadius: 16,
    borderWidth: 0.2,
    padding: 10,
    overflow: "hidden",
  },
  imageWrapper: {
    position: "relative",
    backgroundColor: "#F8F8FB",
    borderRadius: 14,
    overflow: "hidden",
  },
  productImage: { width: "100%", height: 130, resizeMode: "contain" },
  heartIcon: {
    position: "absolute",
    top: 8,
    right: 8,
    padding: 6,
    borderRadius: 14,
  },
  info: { marginTop: 10 },
  productName: { fontSize: 14, fontWeight: "600" },
  productPrice: { fontSize: 14, fontWeight: "700", marginTop: 2 },
  colorsRow: { flexDirection: "row", marginTop: 6 },
  dot: { width: 10, height: 10, borderRadius: 5, marginRight: 6 },
  ratingRow: { flexDirection: "row", alignItems: "center", marginTop: 8 },
  ratingText: { fontSize: 13, fontWeight: "500", marginLeft: 4 },
  cartIcon: { marginLeft: "auto", padding: 6, borderRadius: 8 },
});
