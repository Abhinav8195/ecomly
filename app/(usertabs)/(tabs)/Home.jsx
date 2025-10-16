import React from "react";
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

const Home = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const navigation=useNavigation();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: isDark ? colors.dark.background : colors.light.background }]}
      showsVerticalScrollIndicator={false}
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

      <SearchBar onFilterPress={() => console.log("Filter pressed")} />

     
<OfferCarousel/>

    
<CategoriesCarousel />

<PopularProduct/>

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
  
});
