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
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MotiView } from "moti";
import Toast from "react-native-toast-message";
import { useLocalSearchParams, useRouter } from "expo-router";
import colors from "../theme/colors";
import * as Haptics from "expo-haptics";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromWishlist } from "../redux/WishListReducer";
import { addToCart,incrementQuantity,decrementQuantity } from "../redux/CartReducer";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 16 * 3) / 2;

const SearchResults = () => {
  const { query, results } = useLocalSearchParams();
  const parsedResults = results ? JSON.parse(results) : [];

  const scheme = useColorScheme();
  const isDark = scheme === "dark";
  const theme = isDark ? colors.dark : colors.light;
  const router = useRouter();

  const dispatch = useDispatch();

  const wishlist = useSelector((state) => state.wishlist.wishlist);
  const cart = useSelector((state) => state.cart.cart);



    const handleAddToCart = (item) => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    
        const payloadItem = {
          ...item,
          quantity: 1,
          selectedColor: item.colors[0],
          selectedSize: item.sizes[0],
        };
    
        dispatch(addToCart(payloadItem));
        Toast.show({
          type: "success",
          text1: `${item.name} added to cart!`,
        });
      };
    
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

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDark ? theme.background : colors.light.background },
      ]}
    >
      {/* 🔙 Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons
            name="arrow-back"
            size={22}
            color={isDark ? theme.textPrimary : colors.light.redPrimary}
          />
        </TouchableOpacity>
        <Text
          style={[
            styles.headerTitle,
            { color: isDark ? theme.textPrimary : colors.light.redPrimary },
          ]}
        >
          Search Results
        </Text>
      </View>

      {/* 🏷️ Title */}
      <MotiView
        from={{ opacity: 0, translateY: -10 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: "timing", duration: 400 }}
        style={{ marginBottom: 16, marginTop: 4, paddingHorizontal: 4 }}
      >
        <Text
          style={{
            fontSize: 16,
            fontFamily: "Switzer-Bold",
            color: theme.textPrimary,
          }}
        >
          Showing results for “{query}”
        </Text>
      </MotiView>

      {/* 🛍 Product Grid */}
      {parsedResults.length > 0 ? (
        <FlatList
          data={parsedResults}
          numColumns={2}
          keyExtractor={(item) => item.id.toString()}
          columnWrapperStyle={{
            justifyContent: "flex-start",
            columnGap: 14,
            marginBottom: 16,
          }}
          renderItem={({ item, index }) => {
    // Move this inside the renderItem function, BEFORE return
    const existingCartItem = cart.find(
      (i) => String(i.id) === String(item.id)
    );
    const quantity = existingCartItem ? existingCartItem.quantity : 0;
     return (
            <MotiView
              from={{ opacity: 0, translateY: 20 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{
                type: "timing",
                duration: 400,
                delay: index * 100,
              }}
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
                <View style={styles.imageWrapper}>
                  <Image
                    source={{ uri: item.image }}
                    style={styles.productImage}
                  />
                  <TouchableOpacity style={styles.heartIcon}>
                    <Ionicons
                      name="heart-outline"
                      size={18}
                      color={colors.warning}
                    />
                  </TouchableOpacity>
                </View>

                <View style={styles.info}>
                  <Text
                    style={[styles.productName, { color: theme.textPrimary }]}
                    numberOfLines={1}
                  >
                    {item.name}
                  </Text>

                  <Text
                    style={[styles.productPrice, { color: colors.warning }]}
                  >
                    {item.price}
                  </Text>

                  {item.colors && item.colors.length > 0 && (
                    <View style={styles.colorsRow}>
                      {item.colors.map((clr, i) => (
                        <View
                          key={i}
                          style={[styles.dot, { backgroundColor: clr }]}
                        />
                      ))}
                    </View>
                  )}

                  <View style={styles.ratingRow}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                      <Ionicons name="star" size={14} color="#FFC107" />
                    <Text
                      style={[
                        styles.ratingText,
                        { color: isDark ? "#fff" : "#000" },
                      ]}
                    >
                      {item.rating || "4.5"}
                    </Text>
                    </View>
                    

                     <View>
                      {existingCartItem ? (
                        <MotiView
                          key="quantity"
                          from={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ type: "timing", duration: 200 }}
                          style={styles.quantityContainer}
                        >
                          <TouchableOpacity
                            onPress={() =>
                              dispatch(
                                decrementQuantity({
                                  ...item,
                                  selectedColor: item.colors[0],
                                  selectedSize: item.sizes[0],
                                })
                              )
                            }
                            style={[
                              styles.qtyButton,
                              {
                                backgroundColor:  colors.light.redPrimary,
                              },
                            ]}
                          >
                            <Ionicons
                              name="remove"
                              size={14}
                              color={isDark ? colors.dark.redTextPrimary : 'white'}
                            />
                          </TouchableOpacity>
                    
                          <MotiView
                            from={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ type: "spring", stiffness: 200 }}
                          >
                            <Text
                              style={{
                                color: isDark ? colors.dark.redTextPrimary : colors.light.redPrimary,
                                ...styles.qtyText,
                              }}
                            >
                              {quantity}
                            </Text>
                          </MotiView>
                    
                          <TouchableOpacity
                            onPress={() =>
                              dispatch(
                                incrementQuantity({
                                  ...item,
                                  selectedColor: item.colors[0],
                                  selectedSize: item.sizes[0],
                                })
                              )
                            }
                            style={[
                              styles.qtyButton,
                              {
                                backgroundColor: colors.light.redPrimary,
                              },
                            ]}
                          >
                            <Ionicons
                              name="add"
                              size={14}
                              color={ 'white'}
                            />
                          </TouchableOpacity>
                        </MotiView>
                      ) : (
                        <MotiView
                          key="cart"
                          from={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ type: "timing", duration: 200 }}
                        >
                          <TouchableOpacity
                            onPress={() => handleAddToCart(item)}
                            style={[
                              styles.cartIcon,
                              {
                                backgroundColor: colors.light.redPrimary,
                              },
                            ]}
                          >
                            <Ionicons
                              name="cart-outline"
                              size={16}
                              color={'white'}
                            />
                          </TouchableOpacity>
                        </MotiView>
                      )}
                    </View>


                  </View>
                </View>
              </TouchableOpacity>
           </MotiView>
               );
             }}
             showsVerticalScrollIndicator={false}
             contentContainerStyle={{ paddingBottom: 16 }}
           />
      ) : (
        <Text
          style={{
            color: isDark ? "#aaa" : "#555",
            textAlign: "center",
            marginTop: 40,
            fontSize: 16,
          }}
        >
          No products found.
        </Text>
      )}
    </View>
  );
};

export default SearchResults;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  backButton: {
    padding: 6,
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: "Switzer-Bold",
  },
  card: {
    width: CARD_WIDTH,
    borderRadius: 16,
    borderWidth: 0.4,
    padding: 10,
    overflow: "hidden",
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
  },
  info: { marginTop: 10 },
  productName: { fontSize: 14, fontWeight: "600" },
  productPrice: { fontSize: 14, fontWeight: "700", marginTop: 2 },
  colorsRow: { flexDirection: "row", marginTop: 6 },
  dot: { width: 10, height: 10, borderRadius: 5, marginRight: 6 },
  ratingRow: { flexDirection: "row", alignItems: "center", marginTop: 8 ,justifyContent:'space-between'},
  ratingText: { fontSize: 13, fontWeight: "500", marginLeft: 4 },
 cartIcon: { marginLeft: "auto", padding: 6, borderRadius: 8 },
  cartIcon: {
    marginLeft: "auto",
    padding: 6,
    borderRadius: 8,
  },quantityContainer: {
  flexDirection: "row",
  alignItems: "center",
  marginLeft: "auto",
  minWidth: 90, 
  justifyContent: "space-between",
},
qtyButton: {
  paddingHorizontal: 6,
  paddingVertical: 4,
  borderRadius: 6,
  marginHorizontal: 4,
},
qtyText: {
  fontSize: 14,
  fontWeight: "600",
  minWidth: 20,
  textAlign: "center",
},
});
