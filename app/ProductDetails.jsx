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

const ProductDetails = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const router = useRouter();
  const [liked, setLiked] = useState(false);

  const productImages = {
    1: require("../assets/product/tshirt.png"),
    2: require("../assets/product/shoes.png"),
    3: require("../assets/product/cargo.png"),
    4: require("../assets/product/hoodie.png"),
  };

  const params = useLocalSearchParams();
  const colors = params.colors ? JSON.parse(params.colors) : [];
  const sizes = params.sizes ? JSON.parse(params.sizes) : [];

  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedSize, setSelectedSize] = useState(sizes[0]);
  const [quantity, setQuantity] = useState(1);

  const bg = isDark ? "#111" : "#F8F8F8";
  const cardBg = isDark ? "#1A1A1A" : "#FFF";
  const textColor = isDark ? "#FFF" : "#111";
  const subText = isDark ? "#BBB" : "#555";

  return (
    <View style={[styles.container, { backgroundColor: bg }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <MotiView
          from={{ opacity: 0, translateY: -20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "timing", duration: 400 }}
          style={[styles.header, { backgroundColor: isDark?'#111111':'#fff' }]}
        >
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={26} color={textColor} />
          </TouchableOpacity>

          <Text style={[styles.headerTitle, { color: textColor }]}>
            Details
          </Text>

          <View style={styles.headerIcons}>
            <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => {
        setLiked(!liked);
        Haptics.selectionAsync(); 
      }}
    >
      <MotiView
        animate={{ scale: liked ? 1.2 : 1 }}
        transition={{
          type: "spring",
          damping: 10,
          stiffness: 150,
        }}
      >
        <Ionicons
          name={liked ? "heart" : "heart-outline"}
          size={24}
          color={liked ? "#F76C31" : textColor}
          style={{ marginRight: 12 }}
        />
      </MotiView>
    </TouchableOpacity>

            <TouchableOpacity onPress={()=>router.push('/(usertabs)/(tabs)/Cart')}>
                <Ionicons name="cart-outline" size={24} color={textColor} />
            </TouchableOpacity>
          </View>
        </MotiView>

        {/* Product Image */}
        <MotiView
          from={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", duration: 600 }}
          style={styles.imageContainer}
        >
          <Image
            source={productImages[params.imageKey]}
            resizeMode="contain"
            style={styles.image}
          />
        </MotiView>

        {/* Info Section */}
        <MotiView
          from={{ opacity: 0, translateY: 30 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "timing", duration: 500, delay: 200 }}
          style={[styles.infoContainer, { backgroundColor: cardBg }]}
        >
          <View style={styles.topRow}>
            <Text style={[styles.name, { color: textColor }]}>{params.name}</Text>
            <Text style={[styles.price, { color: "#FF7043" }]}>
              {params.price}
            </Text>
          </View>

          {/* Rating + Quantity */}
          <View style={styles.ratingRow}>
            <AntDesign name="star" size={16} color="#FFD700" />
            <Text style={[styles.ratingText, { color: subText }]}>
              {params.rating} ({params.reviews} Reviews)
            </Text>

           <QuantitySelector quantity={quantity} setQuantity={setQuantity}/>
          </View>

          {/* Colors */}
          <Text style={[styles.sectionTitle, { color: textColor }]}>Colors</Text>
          <View style={styles.colorRow}>
            {colors.map((c, i) => (
              <TouchableOpacity
                key={i}
                style={[
                  styles.colorCircle,
                  {
                    backgroundColor: c,
                    borderColor: selectedColor === c ? "#524EB7" : "transparent",
                  },
                ]}
                onPress={() => setSelectedColor(c)}
              />
            ))}
          </View>

          {/* Sizes */}
          <Text style={[styles.sectionTitle, { color: textColor }]}>Size</Text>
          <View style={styles.sizeRow}>
            {sizes.map((s, i) => (
             <TouchableOpacity
  key={i}
  onPress={() => setSelectedSize(s)}
  style={[
    styles.sizeBox,
    {
      backgroundColor:
        selectedSize === s
          ? "#524EB7"
          : isDark
          ? "#1A1A1A"
          : "#EEE",
      borderColor:
        selectedSize === s? "#524EB7": isDark? "#444" : "rgba(0,0,0,0.1)",
      borderWidth: 1.2, 
    },
  ]}
>
  <Text
    style={[
      styles.sizeText,
      { color: selectedSize === s ? "#FFF" : subText },
    ]}
  >
    {s}
  </Text>
</TouchableOpacity>

            ))}
          </View>

          {/* Description */}
          <Text style={[styles.sectionTitle, { color: textColor }]}>
            Description
          </Text>
          <Text style={[styles.description, { color: subText }]}>
            {params.description}
          </Text>

          {/* Customer Review */}
          <Text style={[styles.sectionTitle, { color: textColor }]}>
            Customer Review
          </Text>
          <View
            style={[
              styles.reviewBox,
              {
                backgroundColor: isDark ? "#262626" : "#F5F5F5",
                borderColor: isDark ? "#333" : "#DDD",
              },
            ]}
          >
            <View style={{ flexDirection: "row", marginBottom: 6 }}>
              {[1, 2, 3, 4, 5].map((i) => (
                <AntDesign key={i} name="star" size={16} color="#FFD700" />
              ))}
            </View>
            <Text style={[styles.reviewText, { color: subText }]}>
              “The shipment was on time and the product arrived in perfect
              condition. Super comfy and stylish. Totally worth it!”
            </Text>
            <Text style={[styles.reviewAuthor, { color: subText }]}>
              - Mia Carter, Feb 2025
            </Text>
          </View>
        </MotiView>
      </ScrollView>

      {/* Add to Cart Button */}
      <MotiView
        from={{ opacity: 0, translateY: 40 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: "timing", duration: 400, delay: 200 }}
        style={[styles.bottomBar, { backgroundColor: cardBg }]}
      >
        <TouchableOpacity
          style={[styles.addButton, { backgroundColor: "#524EB7" }]}
        >
          <Text style={styles.addText}>Add To Cart</Text>
        </TouchableOpacity>
      </MotiView>
    </View>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 18,
  },
  headerTitle: { fontSize: 18, fontWeight: "600" },
  headerIcons: { flexDirection: "row", alignItems: "center" },
  imageContainer: { alignItems: "center", marginTop: 8 },
  image: { width: "80%", height: 280, borderRadius: 12 },
  infoContainer: {
    marginTop: -10,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 16,
    borderWidth: 0.3,
    borderColor: "#CCC",
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  name: { fontSize: 20, fontWeight: "700", flex: 1, marginRight: 12 },
  price: { fontSize: 18, fontWeight: "700" },
  ratingRow: { flexDirection: "row", alignItems: "center", marginBottom: 14 },
  ratingText: { fontSize: 14, marginLeft: 6, flex: 1 },
  quantityBox: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  quantityBtn: { fontSize: 18, paddingHorizontal: 6 },
  quantityText: { fontSize: 16, paddingHorizontal: 4 },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 18,
    marginBottom: 8,
  },
  colorRow: { flexDirection: "row", marginBottom: 10 },
  colorCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginRight: 10,
    borderWidth: 2,
  },
  sizeRow: { flexDirection: "row", marginBottom: 14 },
  sizeBox: {
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 14,
    marginRight: 10,
  },
  sizeText: { fontSize: 14, fontWeight: "600" },
  description: { fontSize: 14, lineHeight: 20 },
  reviewBox: {
    borderRadius: 12,
    padding: 14,
    marginTop: 10,
    borderWidth: 1,
  },
  reviewText: { fontSize: 14, lineHeight: 20 },
  reviewAuthor: { fontSize: 12, marginTop: 4 },
  bottomBar: { padding: 16 },
  addButton: {
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },
  addText: { color: "#fff", fontSize: 16, fontWeight: "700" },
});
