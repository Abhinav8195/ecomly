import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MotiView, AnimatePresence } from "moti";
import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist } from "../../../redux/WishListReducer";
import colors from "../../../theme/colors";
import Toast from "react-native-toast-message";
import { useRouter } from "expo-router";

const productImages = {
    1: require("../../../assets/product/tshirt.png"),
    2: require("../../../assets/product/shoes.png"),
    3: require("../../../assets/product/cargo.png"),
    4: require("../../../assets/product/hoodie.png"),
    5: require("../../../assets/product/i5.png"),
    6: require("../../../assets/product/i6.png"),
    7: require("../../../assets/product/i7.png"),
    8: require("../../../assets/product/i8.png"),
  };

const Wishlist = () => {
  const scheme = useColorScheme();
  const isDark = scheme === "dark";
  const theme = isDark ? colors.dark : colors.light;
  const wishlist = useSelector((state) => state.wishlist.wishlist);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleRemove = (item) => {
    dispatch(removeFromWishlist(item));
    Toast.show({
      type: "info",
      text1: `${item.name} removed from wishlist`,
    });
  };

  const renderItem = ({ item }) => (
    <MotiView
      from={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
      style={[styles.card, { backgroundColor: isDark ? "#1A1A1A" : "#fff" }]}
    >
      <TouchableOpacity
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
              shop: item.shop,
            },
          })
        }
        style={styles.imageWrapper}
      >
        <Image  source={productImages[item.imageKey] || item.image}  style={styles.image} />
      </TouchableOpacity>

      <View style={styles.info}>
        <Text style={[styles.name, { color: theme.textPrimary }]}>{item.name}</Text>
        <Text style={[styles.price, { color: colors.warning }]}>{item.price}</Text>

        <TouchableOpacity
          onPress={() => handleRemove(item)}
          style={[styles.heartBtn, { backgroundColor: isDark ? "#2D2D2D" : "#FDEDED" }]}
        >
          <Ionicons name="heart" size={20} color="#F76C31" />
        </TouchableOpacity>
      </View>
    </MotiView>
  );

  return (
    <View style={[styles.container, { backgroundColor: isDark ? "#111" : "#fff" }]}>
      {/* Page Title */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.textPrimary }]}>My Wishlist</Text>
        <Text style={[styles.subtitle, { color: isDark ? "#aaa" : "#555" }]}>
          Items you’ve liked will appear here.
        </Text>
      </View>

      <AnimatePresence>
        {wishlist.length === 0 ? (
          <MotiView
            style={styles.empty}
            from={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1.05 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{
              type: "spring",
              stiffness: 120,
              damping: 12,
            }}
          >
            <Ionicons name="heart-dislike-outline" size={60} color={isDark ? "#888" : "#CCC"} />
            <Text style={{ color: isDark ? "#fff" : "#555", fontSize: 18, marginTop: 12, fontWeight: "600" }}>
              Your wishlist is empty
            </Text>
            <Text style={{ color: isDark ? "#aaa" : "#888", fontSize: 14, marginTop: 4 }}>
              Add products to your wishlist to see them here.
            </Text>
          </MotiView>
        ) : (
          <FlatList
            data={wishlist}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16 }}
            showsVerticalScrollIndicator={false}
          />
        )}
      </AnimatePresence>
    </View>
  );
};

export default Wishlist;

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { 
    paddingHorizontal: 16, 
    paddingTop: 16, 
    paddingBottom: 12 
  },
  title: { 
    fontSize: 24, 
    fontWeight: "700" 
  },
  subtitle: { 
    fontSize: 14, 
    marginTop: 4 
  },
  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    flexDirection: "row",
    borderRadius: 14,
    padding: 12,
    marginBottom: 14,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  imageWrapper: {
    width: 80,
    height: 80,
    borderRadius: 12,
    overflow: "hidden",
    marginRight: 12,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  info: { flex: 1 },
  name: { fontSize: 16, fontWeight: "600" },
  price: { fontSize: 14, fontWeight: "700", marginVertical: 4 },
  heartBtn: {
    position: "absolute",
    right: 0,
    top: 0,
    padding: 6,
    borderRadius: 10,
  },
});
