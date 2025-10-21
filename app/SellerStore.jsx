import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  useColorScheme,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import colors from "../theme/colors";
import { MotiView } from "moti";
import { Ionicons } from "@expo/vector-icons";
import SellerHome from "../components/SellerHome";
import SellerAbout from "../components/SellerAbout";

const SellerStore = () => {
  const params = useLocalSearchParams();
  const router = useRouter();
  const shopName = params?.shop || "Sport Point International";
  const scheme = useColorScheme();
  const theme = scheme === "dark" ? colors.dark : colors.light;

  const [isFollowing, setIsFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState("Home");

  return (
     <KeyboardAvoidingView
    style={{ flex: 1 }}
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
  >
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
      showsVerticalScrollIndicator={false}
    >
      {/* ---------- Top Bar ---------- */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={26} color={theme.textPrimary} />
        </TouchableOpacity>
        <Text style={[styles.topBarTitle, { color: theme.textPrimary }]}>
          Store
        </Text>
      </View>

      {/* ---------- Store Info ---------- */}
      <MotiView
        from={{ opacity: 0, translateY: -10 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: "timing", duration: 400 }}
        style={[styles.storeInfoContainer, { backgroundColor: theme.card }]}
      >
        <Image
          source={{ uri: "https://randomuser.me/api/portraits/women/44.jpg" }}
          style={styles.storeImage}
        />
        <View style={styles.storeDetails}>
          <Text style={[styles.storeName, { color: theme.textPrimary }]}>
            {shopName}
          </Text>
          <Text style={[styles.followers, { color: 'gray' }]}>
            327 Followers
          </Text>
          <View style={styles.feedbackRow}>
            <Text style={[styles.feedback, { color: 'gray' }]}>
              97% Positive Feedback
            </Text>
            <TouchableOpacity
  style={[
    styles.followBtn,
    {
      backgroundColor: isFollowing
        ? scheme === "dark"
          ? colors.dark.card 
          : "#fff"           
        : colors.warning,
      borderColor: colors.warning,
      borderWidth: 0.5,
    },
  ]}
  onPress={() => setIsFollowing(!isFollowing)}
>
              <Text style={[styles.followText,{color:isFollowing?colors.warning:'white'}]}>
                {isFollowing ? "Following" : "+ Follow"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </MotiView>

      {/* ---------- Tabs & Chat ---------- */}
      <View style={styles.tabRow}>
  <View style={styles.tabs}>
    <TouchableOpacity
      style={[
        styles.tabBtn,
        activeTab === "Home" && { borderBottomColor: colors.light.redPrimary, borderBottomWidth: 2 },
      ]}
      onPress={() => setActiveTab("Home")}
    >
      <Text style={[styles.tabText, { color: theme.textPrimary }]}>Home</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={[
        styles.tabBtn,
        activeTab === "About" && { borderBottomColor: colors.light.redPrimary, borderBottomWidth: 2 },
      ]}
      onPress={() => setActiveTab("About")}
    >
      <Text style={[styles.tabText, { color: theme.textPrimary }]}>About</Text>
    </TouchableOpacity>
  </View>

  <TouchableOpacity style={[styles.chatBtn, { borderColor: colors.light.redPrimary }]}>
    <Text style={[styles.chatText, { color: colors.light.redPrimary }]}>Chat Now</Text>
  </TouchableOpacity>
</View>


      <View style={{ marginHorizontal: 16, marginBottom: 16 }}>
  {activeTab === "Home" && (
    <SellerHome/>
  )}
  {activeTab === "About" && (
    <SellerAbout/>
  )}
</View>
    </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SellerStore;

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 10 },

  // Top Bar
  topBar: { flexDirection: "row", alignItems: "center", paddingHorizontal: 16, marginBottom: 10 },
  topBarTitle: { fontSize: 18, fontWeight: "700", marginLeft: 16 },

  // Store Info
  storeInfoContainer: { flexDirection: "row", alignItems: "center", marginHorizontal: 16, borderRadius: 16, padding: 12, marginBottom: 16, shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 6, elevation: 3 },
  storeImage: { width: 70, height: 70, borderRadius: 16, marginRight: 14 },
  storeDetails: { flex: 1 },
  storeName: { fontSize: 20, fontWeight: "700" },
  followers: { fontSize: 13, marginVertical: 4 },
  feedbackRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  feedback: { fontSize: 13 },
  followBtn: { paddingVertical: 6, paddingHorizontal: 16, borderRadius: 8 },
  followText: { color: "#fff", fontWeight: "600" },

  // Tabs & Chat
  tabRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginHorizontal: 16, marginBottom: 16 },
  tabs: { flexDirection: "row" },
  tabBtn: { paddingVertical: 6, paddingHorizontal: 16 },
  tabText: { fontSize: 16, fontWeight: "600" },
  chatBtn: { paddingVertical: 6, paddingHorizontal: 16, borderWidth: 1.2, borderRadius: 8 },
  chatText: { fontWeight: "600" },
});
