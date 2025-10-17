import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { MotiView } from "moti";
import { useRouter } from "expo-router";
import colors from "../../../theme/colors";
import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
  clearCart,
} from "../../../redux/CartReducer";
import Toast from "react-native-toast-message";
import { Easing } from "react-native-reanimated";

const Cart = () => {
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  const router = useRouter();
  const scheme = useColorScheme();
  const isDark = scheme === "dark";
  const theme = isDark ? colors.dark : colors.light;
  console.log(cart)

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

  const [selectedItems, setSelectedItems] = useState(
  cart.map(item => `${item.id}-${item.selectedColor}-${item.selectedSize}`)
);

useEffect(() => {
  setSelectedItems(cart.map(item => `${item.id}-${item.selectedColor}-${item.selectedSize}`));
}, [cart]);

  const subtotal = cart.reduce((sum, item) => {
  const key = `${item.id}-${item.selectedColor}-${item.selectedSize}`;
  if (!selectedItems.includes(key)) return sum;
  const price = Number(item.price.replace("$", "")) || 0;
  return sum + price * item.quantity;
}, 0);

  const shipping = subtotal > 0 ? 40 : 0;
  const total = subtotal + shipping;

  const toggleSelectAll = () => {
  if (selectedItems.length === cart.length) setSelectedItems([]);
  else setSelectedItems(cart.map(item => `${item.id}-${item.selectedColor}-${item.selectedSize}`));
};

const toggleSelectItem = (id, color, size) => {
  const key = `${id}-${color}-${size}`;
  if (selectedItems.includes(key)) {
    setSelectedItems(selectedItems.filter(i => i !== key));
  } else {
    setSelectedItems([...selectedItems, key]);
  }
};

  if (cart.length === 0) {
    return (
      <View style={[styles.emptycontainer, { backgroundColor: theme.background }]}>
        <MotiView
          from={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'timing', duration: 600, easing: Easing.out(Easing.exp) }}
          style={{ marginBottom: 20 }}
        >
          <Ionicons name="cart-outline" size={100} color={colors.primary} />
        </MotiView>

        <MotiView
          from={{ translateY: -20, opacity: 0 }}
          animate={{ translateY: 0, opacity: 1 }}
          transition={{ type: 'spring', damping: 12, stiffness: 100, delay: 100 }}
        >
          <Text style={[styles.title, { color: theme.textPrimary }]}>Your Cart is Empty</Text>
        </MotiView>

        <MotiView
          from={{ translateY: -10, opacity: 0 }}
          animate={{ translateY: 0, opacity: 1 }}
          transition={{ type: 'timing', duration: 500, delay: 200 }}
        >
          <Text style={[styles.subtitle, { color:  theme.textSecondary }]}>
            Looks like you haven't added any items yet.
          </Text>
        </MotiView>

        <MotiView
          from={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', damping: 10, stiffness: 120, delay: 300 }}
        >
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push('/(usertabs)/(tabs)/Home')}
          >
            <Text style={styles.buttonText}>Start Shopping</Text>
          </TouchableOpacity>
        </MotiView>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={[styles.headerText, { color: theme.textPrimary }]}>My Cart</Text>
          <Text style={[styles.totalItems, { color: theme.textSecondary }]}>
            Total items: {cart.length}
          </Text>
        </View>
        <TouchableOpacity style={styles.checkoutAllBtn} onPress={toggleSelectAll}>
          <Text style={styles.checkoutAllText}>Checkout All</Text>
          <Ionicons
            name={selectedItems.length === cart.length ? "checkbox" : "square-outline"}
            size={22}
            color={'gray'}
          />
        </TouchableOpacity>
      </View>

      {/* Cart Items */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 290 }}>
        {cart.map((item, index) => (
          <MotiView
            key={`${item.id}-${item.selectedColor}-${item.selectedSize}`}
            from={{ opacity: 0, translateY: 30 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{
              type: "spring",
              damping: 15,
              stiffness: 120,
              delay: index * 100,
            }}
            style={[styles.cartItem, { backgroundColor: isDark ? "#1F1F2F" : "#F6F6F9" }]}
          >
           <Image
            source={productImages[item.imageKey] || item.image} 
            style={styles.image}
          />

            <View style={styles.details}>
  <Text style={[styles.name, { color: theme.textPrimary }]}>{item.name}</Text>
  <Text style={[styles.price, { color: colors.primary }]}>
    ${Number(item.price.replace("$", ""))?.toFixed(2)}
  </Text>

  {/* Size and Color Row */}
  <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4, marginBottom: 6 }}>
    <Text style={[styles.size, { color: theme.textSecondary, marginRight: 10 }]}>
      Size: {item.selectedSize || "M"}
    </Text>

    {/* Color Circle */}
    <View
      style={{
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: item.selectedColor || '#000',
        borderWidth: 1,
        borderColor: '#ccc',
      }}
    />
  </View>

  {/* Quantity Controls */}
  <View style={styles.quantityRow}>
    <TouchableOpacity
      onPress={() => dispatch(decrementQuantity(item))}
      style={[
        styles.qtyButton,
        { backgroundColor: isDark ? colors.dark.textSecondary : colors.primary },
      ]}
    >
      <Ionicons name="remove" size={16} color={'white'} />
    </TouchableOpacity>

    <Text style={[styles.qtyText, { color: theme.textPrimary }]}>{item.quantity}</Text>

    <TouchableOpacity
      onPress={() => dispatch(incrementQuantity(item))}
      style={[
        styles.qtyButton,
        { backgroundColor: isDark ? colors.dark.textSecondary : colors.primary },
      ]}
    >
      <Ionicons name="add" size={16} color={"white"} />
    </TouchableOpacity>
  </View>
</View>


            {/* Right Checkbox */}
            <TouchableOpacity onPress={() => toggleSelectItem(item.id, item.selectedColor, item.selectedSize)}>
  <MotiView
    animate={{ scale: selectedItems.includes(`${item.id}-${item.selectedColor}-${item.selectedSize}`) ? 1.2 : 1 }}
    transition={{ type: "spring", damping: 15, stiffness: 120 }}
  >
    <Ionicons
      name={selectedItems.includes(`${item.id}-${item.selectedColor}-${item.selectedSize}`) ? "checkbox" : "square-outline"}
      size={20}
      color={colors.warning}
    />
  </MotiView>
</TouchableOpacity>


            {/* Remove Button */}
            <TouchableOpacity
              style={styles.removeBtn}
              onPress={() => {
                dispatch(removeFromCart(item));
                Toast.show({ type: "error", text1: `${item.name} removed from cart` });
              }}
            >
              <Ionicons name="trash-outline" size={20} color={isDark?colors.dark.textSecondary:colors.primary} />
            </TouchableOpacity>
          </MotiView>
        ))}
      </ScrollView>

      {/* Bottom Summary */}
      <View style={[styles.bottomCard, { backgroundColor: isDark ? "#1C1B29" : "#F6F6F9" }]}>
        <View style={styles.summaryRow}>
          <Text style={[styles.summaryText, { color: theme.textSecondary }]}>Sub Total</Text>
          <Text style={[styles.summaryValue, { color: theme.textPrimary }]}>${subtotal.toFixed(2)}</Text>
        </View>

        <View style={styles.summaryRow}>
          <Text style={[styles.summaryText, { color: theme.textSecondary }]}>Shipping</Text>
          <Text style={[styles.summaryValue, { color: theme.textPrimary }]}>${shipping.toFixed(2)}</Text>
        </View>

        <View style={[styles.summaryRow, { marginVertical: 8 }]}>
          <Text style={[styles.totalText, { color: theme.textPrimary }]}>Total</Text>
          <Text style={[styles.totalValue, { color: colors.primary }]}>${total.toFixed(2)}</Text>
        </View>

        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={() => Toast.show({ type: "success", text1: "Proceeding to checkout..." })}
        >
          <Text style={styles.checkoutText}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 18,
    paddingVertical: 16,
  },
  headerText: { fontSize: 20, fontWeight: "700" },
  totalItems: { fontSize: 14, marginTop: 2 },
  checkoutAllBtn: { flexDirection: "row", alignItems: "center", gap: 6 },
  checkoutAllText: { color: 'gray', fontWeight: "600", marginLeft: 4 },
  cartItem: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    marginBottom: 14,
    borderRadius: 16,
    padding: 10,
    elevation: 2,
  },
  image: { width: 80, height: 80, borderRadius: 14, resizeMode: "contain", marginRight: 12 },
  details: { flex: 1 },
  name: { fontSize: 14, fontWeight: "600" },
  price: { fontSize: 14, fontWeight: "700", marginTop: 4 },
  size: { fontSize: 12, marginTop: 4 },
  quantityRow: { flexDirection: "row", alignItems: "center", marginTop: 6 },
  qtyButton: { backgroundColor: "#EFEFFF", borderRadius: 8, paddingHorizontal: 6, paddingVertical: 4 },
  qtyText: { marginHorizontal: 10, fontSize: 14, fontWeight: "600" },
  removeBtn: { padding: 6, marginLeft: 8 },
  bottomCard: { position: "absolute", bottom: 100, width: "100%", borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 16, elevation: 10 },
  summaryRow: { flexDirection: "row", justifyContent: "space-between", marginVertical: 4 },
  summaryText: { fontSize: 14 },
  summaryValue: { fontSize: 14, fontWeight: "600" },
  totalText: { fontSize: 16, fontWeight: "700" },
  totalValue: { fontSize: 16, fontWeight: "700" },
  checkoutButton: { backgroundColor: colors.primary, borderRadius: 14, paddingVertical: 14, marginTop: 10, alignItems: "center" },
  checkoutText: { color: "#fff", fontSize: 16, fontWeight: "700" },

  // emptyContainer: { flex: 1, justifyContent: "center", alignItems: "center", paddingHorizontal: 20 },
  // emptyTitle: { fontSize: 22, fontWeight: "700", marginTop: 20 },
  // emptySubtitle: { fontSize: 14, marginTop: 8, textAlign: "center" },
  // shopButton: { backgroundColor: colors.primary, paddingHorizontal: 28, paddingVertical: 12, borderRadius: 14, marginTop: 20 },
  // shopButtonText: { color: "#fff", fontWeight: "700", fontSize: 15 },
  emptycontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center',
    marginBottom: 25,
  },
  button: {
    backgroundColor: '#524EB7',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 14,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
