import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  useColorScheme,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MotiView } from "moti";
import colors from "../theme/colors";
import { router } from "expo-router";
import products from "../data";

const PopularProduct = ({ onProductPress, onSeeAllPress }) => {
  const scheme = useColorScheme();
  const isDark = scheme === "dark";
  const theme = isDark ? colors.dark : colors.light;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <Text
          style={[
            styles.headerTitle,
            { color: theme.textPrimary },
          ]}
        >
          Popular Products
        </Text>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onSeeAllPress}
          style={styles.arrowButton}
        >
          <Ionicons
            name="arrow-forward-outline"
            size={22}
            color={colors.warning}
          />
        </TouchableOpacity>
      </View>

      {/* Horizontal ScrollView */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {products.map((item, index) => (
          <MotiView
            key={item.id}
            from={{ opacity: 0, translateY: 25 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{
              type: "timing",
              duration: 500,
              delay: index * 150,
            }}
          >
            <TouchableOpacity
              activeOpacity={0.9}
              style={[
                styles.card,
                {
                  backgroundColor: isDark ? colors.dark.card : "#fff",
                  borderColor: isDark ? "#2D2C38" : "#ddd",
                },
              ]}
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
        description:item.description,
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
                <Text
                  style={[
                    styles.productName,
                    { color: theme.textPrimary },
                  ]}
                >
                  {item.name}
                </Text>
                <Text
                  style={[
                    styles.productPrice,
                    { color: colors.primary },
                  ]}
                >
                  {item.price}
                </Text>

                {/* Color Dots */}
                <View style={styles.colorsRow}>
                  {item.colors.map((clr, i) => (
                    <View key={i} style={[styles.dot, { backgroundColor: clr }]} />
                  ))}
                </View>

                {/* Rating + Cart */}
                <View style={styles.ratingRow}>
                  <Ionicons name="star" size={14} color="#FFC107" />
                  <Text style={[styles.ratingText, {color:isDark?'#fff':'#000'}]}>{item.rating}</Text>
                  <TouchableOpacity style={[styles.cartIcon,{backgroundColor:isDark?colors.dark.textSecondary:'#F1EEFF'}]}>
                    <Ionicons name="cart-outline" size={16} color={isDark?colors.dark.textPrimary:colors.primary} />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          </MotiView>
        ))}
      </ScrollView>
    </View>
  );
};

export default PopularProduct;

const styles = StyleSheet.create({
  container: {
    marginTop: 22,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
    paddingHorizontal: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
  },
  arrowButton: {
    borderRadius: 10,
    padding: 6,
  },
  scrollContainer: {
    paddingRight: 20,
    paddingVertical:5
  },
  card: {
    width: 170,
    borderRadius: 16,
    marginRight: 16,
    padding: 10,
   borderWidth:0.2
  },
  imageWrapper: {
    position: "relative",
    backgroundColor: "#F8F8FB",
    borderRadius: 14,
    overflow: "hidden",
  },
  productImage: {
    width: "100%",
    height: 130,
    resizeMode: "contain",
  },
  heartIcon: {
    position: "absolute",
    top: 8,
    right: 8,
    padding: 6,
    borderRadius: 14,
    elevation: 3,
  },
  info: {
    marginTop: 10,
  },
  productName: {
    fontSize: 14,
    fontWeight: "600",
  },
  productPrice: {
    fontSize: 14,
    fontWeight: "700",
    marginTop: 2,
  },
  colorsRow: {
    flexDirection: "row",
    marginTop: 6,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 6,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  ratingText: {
    fontSize: 13,
    fontWeight: "500",
    marginLeft: 4,
  },
  cartIcon: {
    marginLeft: "auto",
    padding: 6,
    borderRadius: 8,
  },
});
