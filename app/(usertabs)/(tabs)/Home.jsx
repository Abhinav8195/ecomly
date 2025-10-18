import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  useColorScheme,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MotiView } from "moti";
import colors from "../../../theme/colors";
import { router, useNavigation } from "expo-router";
import SearchBar from "../../../components/SearchBar";
import OfferCard from "../../../components/OfferCard";
import OfferCarousel from "../../../components/OfferCard";
import CategoriesCarousel from "../../../components/CategoriesCarousel";
import PopularProduct from "../../../components/PopularProduct";
import NewArrival from "../../../components/NewArrival";

const Home = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const navigation=useNavigation();
   const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: isDark ? colors.dark.background : colors.light.background }]}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 90 }}
    >
      <View style={[styles.header]}>
        <MotiView from={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ type: "spring", damping: 12, stiffness: 130 }}>
          <TouchableOpacity onPress={()=>navigation.openDrawer()} style={[styles.menuButton]}>
            <Ionicons name="menu-outline" size={24} color={isDark ? colors.dark.textPrimary : colors.primary} />
          </TouchableOpacity>
        </MotiView>

        <View style={styles.logoContainer}>
          <Text style={[styles.logoText1, { color: isDark ? colors.dark.textSecondary : colors.primary }]}>Ecom</Text>
          <Text style={[styles.logoText2]}>ly</Text>
        </View>

        <MotiView from={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ type: "spring", damping: 12, stiffness: 130 }}>
          <TouchableOpacity onPress={()=>router.push('/Notification')} style={[styles.notificationButton]}>
            <Ionicons name="notifications-outline" size={22} color={isDark ? colors.dark.textPrimary : colors.primary} />
          </TouchableOpacity>
        </MotiView>
      </View>

     <SearchBar
          onResults={(results, text) => {
            setSearchResults(results);
            setSearchQuery(text);
          }}
        />

{searchQuery.length > 0 && searchResults.length > 0 && (
  <View
    style={[
      styles.suggestionsOverlay,
      { backgroundColor: isDark ? "#2A2A2A" : "#FFF" },
    ]}
  >
    <ScrollView
      style={{ maxHeight: 300 }}
      nestedScrollEnabled
      showsVerticalScrollIndicator={false}
    >
   {searchResults.length > 0 && (
  <>
    <TouchableOpacity
  activeOpacity={0.8}
  onPress={() =>
    router.push({
      pathname: "/SearchResults",
      params: {
        query: searchQuery,
        results: JSON.stringify(searchResults),
      },
    })
  }
>
  <MotiView
    from={{ opacity: 0, translateY: -10 }}
    animate={{ opacity: 1, translateY: 0 }}
    transition={{ type: "timing", duration: 400 }}
    style={{ paddingVertical: 6, paddingHorizontal: 10 ,marginVertical:5}}
  >
    <Text
      style={{
        fontSize: 16,
        fontFamily: "Switzer-Bold",
        color: isDark ? colors.dark.textPrimary : colors.primary,
        textDecorationLine: "underline",
      }}
    >
      Showing results for “{searchQuery}”
    </Text>
  </MotiView>
</TouchableOpacity>


    {searchResults.map((item) => (
      <TouchableOpacity
        key={item.id}
        style={[
          styles.suggestionItem,
          { backgroundColor: isDark ? "#333" : "#F5F5F5" },
        ]}
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
        <Image
          source={{ uri: item.image }}
          style={styles.suggestionImage}
        />
        <View style={{ flex: 1, marginLeft: 10 }}>
          <Text
            numberOfLines={1}
            style={{
              color: isDark ? "#fff" : "#000",
              fontWeight: "600",
              fontSize: 16,
            }}
          >
            {item.name}
          </Text>
          <Text style={{ color: colors.warning, fontSize: 14 }}>
            {item.price}
          </Text>
          <Text
            style={{
              color: isDark ? "#aaa" : "#555",
              fontSize: 12,
            }}
          >
            {item.category}
          </Text>
        </View>
      </TouchableOpacity>
    ))}
  </>
)}


    </ScrollView>
  </View>
)}



     
      <OfferCarousel/>

    
<CategoriesCarousel />

<PopularProduct/>
<NewArrival/>

    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 10,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 5,
    marginBottom: 12,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoText1: {
    fontSize: 24,
    fontWeight: "800",
  },
  logoText2: {
    fontSize: 24,
    fontWeight: "800",
    color: colors.warning,
  },
  menuButton: {
    padding: 10,
    borderRadius: 14,
  },
  notificationButton: {
    padding: 10,
    borderRadius: 14,
  },
  suggestionsOverlay: {
  position: "absolute",
  top: 130, 
  left: 15,
  right: 15,
  zIndex: 999,
  borderRadius: 12,
  padding: 5,
  shadowColor: "#000",
  shadowOpacity: 0.1,
  shadowRadius: 5,
  elevation: 5,
},

suggestionItem: {
  flexDirection: "row",
  alignItems: "center",
  padding: 10,
  borderRadius: 12,
  marginBottom: 8,
},

suggestionImage: { width: 50, height: 50, borderRadius: 8 },

  
});
