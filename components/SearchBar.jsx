// components/SearchBar.js
import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet, useColorScheme } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MotiView } from "moti";
import colors from "../theme/colors";

const SearchBar = ({ placeholder = "Search for products" }) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const [text, setText] = useState("");

  const handleClear = () => setText("");

  return (
    <MotiView
      from={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: "timing", duration: 400 }}
      style={[styles.container, { backgroundColor: isDark ? "#2A2A2A" : "#F3F3F6" }]}
    >
      <Ionicons name="search-outline" size={20} color={isDark ? "#999" : "#999"} />
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={isDark ? "#aaa" : "#999"}
        style={[styles.input, { color: isDark ? colors.dark.textPrimary : "#333" }]}
        value={text}
        onChangeText={setText}
      />
      {text.length > 0 && (
        <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
          <Ionicons name="close-circle" size={20} color={isDark ? "#888" : "#888"} />
        </TouchableOpacity>
      )}
    </MotiView>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    paddingHorizontal: 10,
    height: 50,
    marginVertical: 12,
  },
  input: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
  },
  clearButton: {
    padding: 4,
  },
});
