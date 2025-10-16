import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  useColorScheme,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MotiView, AnimatePresence } from "moti";

const reviewsData = [
  {
    id: 1,
    name: "HR Rumen",
    date: "February 23, 2023",
    rating: 5,
    review:
      "The shipment was on time and the pair of Sportswear Fleece Hoodies were in great condition. Overall, very happy with the purchase!",
  },
  {
    id: 2,
    name: "Alex Morgan",
    date: "March 2, 2023",
    rating: 4,
    review:
      "Great quality fabric and perfect fit. The hoodie is lightweight yet warm — perfect for daily wear!",
  },
  {
    id: 3,
    name: "Jamie Taylor",
    date: "April 11, 2023",
    rating: 5,
    review:
      "Absolutely love the stitching and the feel of the material. Definitely worth the price!",
  },
  {
    id: 4,
    name: "Chris Evans",
    date: "May 7, 2023",
    rating: 5,
    review:
      "The hoodie exceeded expectations — soft inside and stylish outside. I’ll definitely order again.",
  },
];

const ReviewSection = () => {
  const [showAll, setShowAll] = useState(false);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const bgColor = isDark ? "#1E1E1E" : "#FFF";
  const textColor = isDark ? "#FFF" : "#111";
  const subText = isDark ? "#BDBDBD" : "#555";
  const borderColor = isDark ? "#333" : "#DDD";

  const visibleReviews = showAll ? reviewsData : reviewsData.slice(0, 2);

  return (
    <View style={[styles.container, { backgroundColor: bgColor, borderColor }]}>
      {/* Header */}
      <View style={styles.headerRow}>
        <Text style={[styles.title, { color: textColor }]}>Customer Review</Text>
        <TouchableOpacity onPress={() => setShowAll(!showAll)}>
          <Text style={[styles.viewAll, { color: "#FF7043" }]}>
            {showAll ? "Hide" : "View all"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Reviews */}
      <FlatList
        data={visibleReviews}
        keyExtractor={(item) => item.id.toString()}
        scrollEnabled={false}
        renderItem={({ item, index }) => (
          <AnimatePresence key={item.id}>
            <MotiView
              from={{ opacity: 0, translateY: 20 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ type: "timing", duration: 350, delay: index * 100 }}
              style={[styles.reviewCard, { borderColor }]}
            >
              {/* Rating Stars */}
              <View style={styles.starsRow}>
                {[...Array(5)].map((_, i) => (
                  <Ionicons
                    key={i}
                    name={i < item.rating ? "star" : "star-outline"}
                    size={16}
                    color="#FFC107"
                  />
                ))}
              </View>

              {/* Review Text */}
              <Text style={[styles.reviewText, { color: subText }]}>{item.review}</Text>

              {/* User + Date */}
              <Text style={styles.userText}>
                <Text style={[styles.userName, { color: textColor }]}>{item.name}</Text>
                <Text style={[styles.dateText, { color: subText }]}> • {item.date}</Text>
              </Text>
            </MotiView>
          </AnimatePresence>
        )}
      />
    </View>
  );
};

export default ReviewSection;

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    padding: 16,
    borderRadius: 18,
    borderWidth: 1,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  title: { fontSize: 16, fontWeight: "700" },
  viewAll: { fontSize: 14, fontWeight: "500" },
  reviewCard: {
    marginBottom: 16,
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
    backgroundColor: "transparent",
  },
  starsRow: { flexDirection: "row", marginBottom: 6 },
  reviewText: { fontSize: 13, lineHeight: 18 },
  userText: { marginTop: 8 },
  userName: { fontWeight: "600" },
  dateText: { fontSize: 12 },
});
