import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  useColorScheme,
} from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { MotiView } from "moti";
import colors from "../theme/colors";
import * as Haptics from "expo-haptics";
import QuantitySelector from "../components/QuantitySelector ";
import ReviewSection from "../components/ReviewSection";
import RelatedProducts from "../components/RelatedProducts";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromWishlist } from "../redux/WishListReducer";
import Toast from "react-native-toast-message";

const ProductDetails = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const router = useRouter();
  const wishlist = useSelector((state) => state.wishlist.wishlist);
  // console.log('wishlist productdetails',wishlist)
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();

  const productImages = {
    1: require("../assets/product/tshirt.png"),
    2: require("../assets/product/shoes.png"),
    3: require("../assets/product/cargo.png"),
    4: require("../assets/product/hoodie.png"),
  };

  const params = useLocalSearchParams();
  const colorsArray = params.colors ? JSON.parse(params.colors) : [];
  const sizesArray = params.sizes ? JSON.parse(params.sizes) : [];

  const [selectedColor, setSelectedColor] = useState(colorsArray[0]);
  const [selectedSize, setSelectedSize] = useState(sizesArray[0]);
  const [quantity, setQuantity] = useState(1);

  const bg = isDark ? "#111" : "#F8F8F8";
  const cardBg = isDark ? "#1A1A1A" : "#FFF";
  const textColor = isDark ? "#FFF" : "#111";
  const subText = isDark ? "#BBB" : "#555";

 const item = {
  id: params.id,
  name: params.name,
  price: params.price,
  rating: params.rating,
  description: params.description,
  colors: colorsArray,
  sizes: sizesArray,
  reviews: params.reviews,
  imageKey: params.id,
  shop: params.shop,
};


const toggleWishlist = () => {
  const liked = wishlist.some((i) => i.id === item.id);

  if (liked) {
    dispatch(removeFromWishlist(item));
    Toast.show({ type: "info", text1: `${item.name} removed from wishlist` });
  } else {
    dispatch(addToWishlist(item));
    Toast.show({ type: "success", text1: `${item.name} added to wishlist` });
  }
};

  return (
    <View style={[styles.container, { backgroundColor: bg }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, paddingBottom: 16 }}>
        <MotiView from={{ opacity: 0, translateY: -20 }} animate={{ opacity: 1, translateY: 0 }} transition={{ type: "timing", duration: 400 }} style={[styles.header, { backgroundColor: isDark ? '#111111' : '#fff' }]}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={26} color={textColor} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: textColor }]}>Details</Text>
          <View style={styles.headerIcons}>
                 <TouchableOpacity activeOpacity={0.8} onPress={toggleWishlist}>
  <MotiView
     animate={{ scale: wishlist.some((i) => i.id === item.id) ? 1.2 : 1 }}
    transition={{ type: "spring", damping: 10, stiffness: 150 }}
    style={{ position: "relative" }}
  >
    <Ionicons
      name={wishlist.some((i) => i.id === item.id) ? "heart" : "heart-outline"}
      size={24}
      color={wishlist.some((i) => i.id === item.id) ? "#F76C31" : textColor}
      style={{ marginRight: 12 }}
    />
  </MotiView>
</TouchableOpacity>

             <TouchableOpacity onPress={() => router.push('/(usertabs)/(tabs)/Cart')}>
    <View style={{ position: "relative" }}>
      <Ionicons name="cart-outline" size={24} color={textColor} />

      {/* Cart Badge */}
      {cart.length > 0 && (
        <MotiView
          from={{ scale: 1, opacity: 0.8 }}
          animate={{ scale: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ loop: true, type: "timing", duration: 800 }}
          style={{
            position: "absolute",
            top: -4,
            right: -4,
            backgroundColor: isDark?colors.dark.textSecondary:colors.primary,
            minWidth: 16,
            height: 16,
            borderRadius: 8,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 3,
          }}
        >
          <Text style={{ color: "#fff", fontSize: 12, fontWeight: "bold" }}>
            {cart.length > 9 ? "9+" : cart.length}
          </Text>
        </MotiView>
      )}
    </View>
  </TouchableOpacity>
          </View>
        </MotiView>

        <MotiView from={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring", duration: 600 }} style={styles.imageContainer}>
          <Image source={productImages[params.imageKey]} resizeMode="contain" style={styles.image} />
        </MotiView>

        <MotiView from={{ opacity: 0, translateY: 30 }} animate={{ opacity: 1, translateY: 0 }} transition={{ type: "timing", duration: 500, delay: 200 }} style={[styles.infoContainer, { backgroundColor: bg }]}>
          <View style={styles.topRow}>
            <Text style={[styles.name, { color: textColor }]}>{params.name}</Text>
            <Text style={[styles.price, { color: "#FF7043" }]}>{params.price}</Text>
          </View>

           {params?.shop && (
            <TouchableOpacity onPress={() => console.log("Shop pressed:", params.shop)}>
              <Text style={[styles.shopText, { color: "#524EB7", marginBottom: 8 }]}>
                Sold by: {params.shop}
              </Text>
            </TouchableOpacity>
          )}

          <View style={styles.ratingRow}>
            <AntDesign name="star" size={16} color="#FFD700" />
            <Text style={[styles.ratingText, { color: subText }]}>{params.rating} ({params.reviews} Reviews)</Text>
            <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
          </View>

          <Text style={[styles.sectionTitle, { color: textColor }]}>Colors</Text>
          <View style={styles.colorRow}>
            {colorsArray.map((c, i) => (
              <TouchableOpacity key={i} style={[styles.colorCircle, { backgroundColor: c, borderColor: selectedColor === c ? "#524EB7" : "transparent" }]} onPress={() => setSelectedColor(c)} />
            ))}
          </View>

          <Text style={[styles.sectionTitle, { color: textColor }]}>Size</Text>
          <View style={styles.sizeRow}>
            {sizesArray.map((s, i) => (
              <TouchableOpacity key={i} onPress={() => setSelectedSize(s)} style={[styles.sizeBox, { backgroundColor: selectedSize === s ? "#524EB7" : isDark ? "#1A1A1A" : "#EEE", borderColor: selectedSize === s ? "#524EB7" : isDark ? "#444" : "rgba(0,0,0,0.1)", borderWidth: 1.2 }]}>
                <Text style={[styles.sizeText, { color: selectedSize === s ? "#FFF" : subText }]}>{s}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={[styles.sectionTitle, { color: textColor }]}>Description</Text>
          <Text style={[styles.description, { color: subText }]}>{params.description}</Text>

          <ReviewSection />
          <RelatedProducts />
        </MotiView>
      </ScrollView>

      <MotiView from={{ opacity: 0, translateY: 40 }} animate={{ opacity: 1, translateY: 0 }} transition={{ type: "timing", duration: 400, delay: 200 }} style={[styles.bottomBar, { backgroundColor: cardBg }]}>
        <TouchableOpacity style={[styles.addButton, { backgroundColor: "#524EB7" }]}>
          <Text style={styles.addText}>Add To Cart</Text>
        </TouchableOpacity>
      </MotiView>
    </View>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 16, paddingVertical: 18 },
  headerTitle: { fontSize: 18, fontWeight: "600" },
  headerIcons: { flexDirection: "row", alignItems: "center" },
  imageContainer: { alignItems: "center", marginTop: 8 },
  image: { width: "80%", height: 280, borderRadius: 12 },
  infoContainer: { borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 16 },
  topRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
  name: { fontSize: 20, fontWeight: "700", flex: 1, marginRight: 12 },
  price: { fontSize: 18, fontWeight: "700" },
  ratingRow: { flexDirection: "row", alignItems: "center", marginBottom: 14 },
  ratingText: { fontSize: 14, marginLeft: 6, flex: 1 },
  sectionTitle: { fontSize: 16, fontWeight: "600", marginTop: 18, marginBottom: 8 },
  colorRow: { flexDirection: "row", marginBottom: 10 },
  colorCircle: { width: 28, height: 28, borderRadius: 14, marginRight: 10, borderWidth: 2 },
  sizeRow: { flexDirection: "row", marginBottom: 14 },
  sizeBox: { borderRadius: 8, paddingVertical: 6, paddingHorizontal: 14, marginRight: 10 },
  sizeText: { fontSize: 14, fontWeight: "600" },
  description: { fontSize: 14, lineHeight: 20 },
  bottomBar: { padding: 16 },
  addButton: { paddingVertical: 14, borderRadius: 14, alignItems: "center" },
  addText: { color: "#fff", fontSize: 16, fontWeight: "700" },
  shopText: { fontSize: 14, fontWeight: "500" },
});
