import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MotiView, AnimatePresence } from "moti";
import colors from "../../theme/colors";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

const Terms = () => {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const theme = isDark ? colors.dark : colors.light;

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar
        barStyle={isDark ? "light-content" : "dark-content"}
        backgroundColor={theme.background}
      />

      {/* Header with Animated Gradient */}
      <LinearGradient
        colors={
          isDark
            ? ["#201F27", "#191821"]
            : [colors.primary, "#9E9CDC"]
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.headerContainer}
      >
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Ionicons name="menu-outline" size={28} color="#FFF" />
        </TouchableOpacity>

        <MotiView
          from={{ opacity: 0, translateY: -10 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "timing", duration: 400 }}
        >
          <Text style={[styles.headerTitle, { color: "#FFF" }]}>
            Terms & Conditions
          </Text>
        </MotiView>

        <View style={{ width: 28 }} />
      </LinearGradient>

      {/* Content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <AnimatePresence>
          {sections.map((item, index) => (
            <MotiView
              key={index}
              from={{ opacity: 0, translateY: 30 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{
                type: "spring",
                delay: 150 * index,
                damping: 12,
                stiffness: 120,
              }}
              style={[
                styles.card,
                {
                  backgroundColor: isDark ? colors.dark.card : "#FFF",
                  shadowColor: isDark ? "#000" : "#524EB7",
                },
              ]}
            >
              <Text
                style={[
                  styles.sectionTitle,
                  {
                    color: isDark
                      ? theme.textPrimary
                      : colors.primary,
                  },
                ]}
              >
                {item.title}
              </Text>
              <Text
                style={[
                  styles.paragraph,
                  { color: theme.textSecondary },
                ]}
              >
                {item.content}
              </Text>
            </MotiView>
          ))}
        </AnimatePresence>

        <MotiView
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 900, duration: 500 }}
        >
          <Text
            style={[
              styles.footer,
              { color: theme.textSecondary },
            ]}
          >
            Last Updated: October 2025
          </Text>
        </MotiView>
      </ScrollView>
    </View>
  );
};

export default Terms;

// Content sections (cleanly separated)
const sections = [
  {
    title: "1. Use of Service",
    content:
      "You agree to use this app responsibly and in compliance with applicable laws. Misuse may lead to suspension or permanent termination of your account.",
  },
  {
    title: "2. User Data",
    content:
      "We value your privacy. All personal data is handled according to our Privacy Policy, ensuring your information remains protected.",
  },
  {
    title: "3. Liability",
    content:
      "We are not responsible for direct or indirect damages resulting from using this app. Use the service at your own discretion.",
  },
  {
    title: "4. Modifications",
    content:
      "We reserve the right to modify these terms anytime. Continued use of the app constitutes your acceptance of the updated terms.",
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    paddingVertical: 16,
    borderBottomWidth: 0,
    elevation: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: "Switzer-Semibold",
    letterSpacing: 0.5,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 80,
  },
  card: {
    borderRadius: 18,
    padding: 16,
    marginBottom: 15,
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: "Switzer-Bold",
    marginBottom: 6,
  },
  paragraph: {
    fontSize: 14,
    fontFamily: "Switzer-Regular",
    lineHeight: 22,
  },
  footer: {
    fontSize: 12,
    textAlign: "center",
    marginTop: 35,
    fontFamily: "Switzer-Medium",
  },
});
