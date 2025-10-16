import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, useColorScheme } from "react-native";
import { MotiView } from "moti";

const QuantitySelector = ({ quantity, setQuantity }) => {
  const isDark = useColorScheme() === "dark";
  const bg = isDark ? "#262626" : "#FFF";
  const btnBg = isDark ? "#1F1F1F" : "#F0F0F0";
  const textColor = isDark ? "#FFF" : "#111";

  const Button = ({ label, onPress }) => (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
      <MotiView
        from={{ scale: 1 }}
        animate={{ scale: 1 }}
        whileTap={{ scale: 0.85 }}
        style={[styles.button, { backgroundColor: btnBg }]}
      >
        <Text style={[styles.buttonText, { color: textColor }]}>{label}</Text>
      </MotiView>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: bg }]}>
      <Button label="-" onPress={() => setQuantity(prev => (prev > 1 ? prev - 1 : prev))} />
      <Text style={[styles.quantityText, { color: textColor }]}>{quantity}</Text>
      <Button label="+" onPress={() => setQuantity(prev => prev + 1)} />
    </View>
  );
};

export default QuantitySelector;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 30,
    paddingVertical: 6,
    paddingHorizontal: 10,
    justifyContent: "space-between",
    width: 120,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  button: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "600",
  },
  quantityText: {
    fontSize: 16,
    fontWeight: "700",
    marginHorizontal: 12,
  },
});
