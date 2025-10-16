// screens/Notification.js
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  useColorScheme,
  TouchableOpacity,
} from "react-native";
import { MotiView } from "moti";
import { Ionicons } from "@expo/vector-icons";
import colors from "../theme/colors";
import { useRouter } from "expo-router";

const notifications = [
  {
    id: "1",
    title: "Order Shipped 🚚",
    message: "Your order #1234 has been shipped. Track it now.",
    icon: "cube-outline",
    time: "2h ago",
  },
  {
    id: "2",
    title: "Discount Offer 💥",
    message: "Get 30% off on all T-shirts today only!",
    icon: "pricetag-outline",
    time: "5h ago",
  },
  {
    id: "3",
    title: "New Arrivals 👗",
    message: "Fresh fashion collections have just dropped.",
    icon: "sparkles-outline",
    time: "1d ago",
  },
  {
    id: "4",
    title: "Payment Successful 💳",
    message: "Your payment of ₹1,299 was successful.",
    icon: "card-outline",
    time: "2d ago",
  },
];

const Notification = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const theme = isDark ? colors.dark : colors.light;
  const router = useRouter();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={24} color={theme.textPrimary} />
        </TouchableOpacity>

        <Text style={[styles.header, { color: theme.textPrimary }]}>
          Notifications
        </Text>

        <View style={{ width: 32 }} />
      </View>

      {/* Notifications List */}
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
        renderItem={({ item, index }) => (
          <MotiView
            from={{ opacity: 0, translateY: 25 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{
              delay: index * 120,
              type: "timing",
              duration: 500,
            }}
            style={[
              styles.card,
              {
                backgroundColor: isDark ? colors.dark.card : "#fff",
                borderColor: isDark ? "#2D2C38" : "#EEE",
                shadowColor: isDark ? "#000" : "#ccc",
              },
            ]}
          >
            <View
              style={[
                styles.iconContainer,
                {
                  backgroundColor: isDark
                    ? "rgba(82, 78, 183, 0.18)"
                    : "rgba(82, 78, 183, 0.12)",
                },
              ]}
            >
              <Ionicons name={item.icon} size={24} color={isDark?colors.dark.textPrimary:colors.primary} />
            </View>

            <View style={styles.textContainer}>
              <Text
                style={[
                  styles.title,
                  { color: theme.textPrimary, fontFamily: "Switzer-Semibold" },
                ]}
              >
                {item.title}
              </Text>

              <Text
                style={[
                  styles.message,
                  { color: theme.textSecondary, fontFamily: "Switzer-Regular" },
                ]}
              >
                {item.message}
              </Text>

              <Text
                style={[
                  styles.time,
                  { color: theme.textSecondary, fontFamily: "Switzer-Light" },
                ]}
              >
                {item.time}
              </Text>
            </View>
          </MotiView>
        )}
      />
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 18,
    paddingTop: 12,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  backButton: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  header: {
    fontSize: 20,
    fontFamily: "Switzer-Bold",
    textAlign: "center",
  },
  card: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 16,
    borderRadius: 18,
    marginBottom: 14,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 2,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 15.5,
    marginBottom: 4,
  },
  message: {
    fontSize: 13.5,
    lineHeight: 18,
    marginBottom: 5,
  },
  time: {
    fontSize: 12,
  },
});
