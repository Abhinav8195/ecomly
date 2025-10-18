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
import { MotiView } from "moti";
import { LinearGradient } from "expo-linear-gradient";
import colors from "../../theme/colors";
import { useNavigation } from "@react-navigation/native";

const PrivacyPolicy = () => {
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

      {/* Animated Gradient Header */}
      <LinearGradient
        colors={
          isDark
            ? ["#3E3AA0", "#282582", "#1C1A4F"]
            : ["#726DFF", "#908DFF", "#B3B0FF"]
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientHeader}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Ionicons
              name="menu-outline"
              size={28}
              color="#fff"
            />
          </TouchableOpacity>

          <MotiView
            from={{ opacity: 0, translateY: -10 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: "timing", duration: 500 }}
          >
            <Text style={styles.headerTitle}>Privacy Policy</Text>
          </MotiView>

          <View style={{ width: 28 }} />
        </View>
      </LinearGradient>

      {/* Content */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <MotiView
          from={{ opacity: 0, translateY: 40 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "timing", duration: 500 }}
        >
          <Text style={[styles.intro, { color: theme.textSecondary }]}>
            We value your trust and are committed to protecting your privacy.
            This Privacy Policy explains how we collect, use, and protect your
            personal data when you use our app.
          </Text>
        </MotiView>

        {/* Section 1 */}
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ delay: 150, type: "timing", duration: 500 }}
        >
          <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>
            1. Information We Collect
          </Text>
          <Text style={[styles.paragraph, { color: theme.textSecondary }]}>
            We may collect information such as your name, email address, phone
            number, and usage data when you use our app. This helps us provide a
            better user experience, troubleshoot issues, and enhance features.
          </Text>
        </MotiView>

        {/* Section 2 */}
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ delay: 250, type: "timing", duration: 500 }}
        >
          <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>
            2. How We Use Your Information
          </Text>
          <Text style={[styles.paragraph, { color: theme.textSecondary }]}>
            Your information is used to:
          </Text>
          <View style={styles.list}>
            <Text style={[styles.listItem, { color: theme.textSecondary }]}>
              • Improve app performance and functionality
            </Text>
            <Text style={[styles.listItem, { color: theme.textSecondary }]}>
              • Respond to your queries and feedback
            </Text>
            <Text style={[styles.listItem, { color: theme.textSecondary }]}>
              • Send important updates or notifications
            </Text>
          </View>
        </MotiView>

        {/* Section 3 */}
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ delay: 350, type: "timing", duration: 500 }}
        >
          <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>
            3. Data Security
          </Text>
          <Text style={[styles.paragraph, { color: theme.textSecondary }]}>
            We use industry-standard security measures to safeguard your data
            from unauthorized access or disclosure. However, no digital system
            is completely secure, and we cannot guarantee absolute protection.
          </Text>
        </MotiView>

        {/* Section 4 */}
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ delay: 450, type: "timing", duration: 500 }}
        >
          <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>
            4. Third-Party Services
          </Text>
          <Text style={[styles.paragraph, { color: theme.textSecondary }]}>
            We may use trusted third-party services (e.g., analytics or payment
            providers) that follow strict data protection standards. These
            services only access data necessary to perform their functions.
          </Text>
        </MotiView>

        {/* Section 5 */}
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ delay: 550, type: "timing", duration: 500 }}
        >
          <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>
            5. Your Rights
          </Text>
          <Text style={[styles.paragraph, { color: theme.textSecondary }]}>
            You have the right to access, correct, or delete your personal data.
            You can also opt out of receiving promotional emails at any time.
          </Text>
        </MotiView>

        {/* Section 6 */}
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ delay: 650, type: "timing", duration: 500 }}
        >
          <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>
            6. Cookies & Tracking
          </Text>
          <Text style={[styles.paragraph, { color: theme.textSecondary }]}>
            We may use cookies or similar technologies to enhance your app
            experience, analyze trends, and collect anonymous usage data.
          </Text>
        </MotiView>

        {/* Section 7 */}
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ delay: 750, type: "timing", duration: 500 }}
        >
          <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>
            7. Updates to This Policy
          </Text>
          <Text style={[styles.paragraph, { color: theme.textSecondary }]}>
            We may revise this Privacy Policy from time to time. Any updates
            will be posted here with a revised "Last Updated" date.
          </Text>
        </MotiView>

        {/* Footer */}
        <MotiView
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 900, type: "timing", duration: 600 }}
          style={styles.footerBox}
        >
          <Text style={[styles.footerText, { color: theme.textSecondary }]}>
            Last Updated: October 2025
          </Text>
        </MotiView>
      </ScrollView>
    </View>
  );
};

export default PrivacyPolicy;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradientHeader: {
   paddingTop: 15,
    paddingBottom: 16,
    paddingHorizontal: 18,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 5,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: "Switzer-Bold",
    color: "#fff",
    textAlign: "center",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    paddingBottom: 100,
  },
  intro: {
    fontSize: 14,
    lineHeight: 22,
    fontFamily: "Switzer-Regular",
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: "Switzer-Bold",
    marginTop: 20,
    marginBottom: 8,
  },
  paragraph: {
    fontSize: 14,
    fontFamily: "Switzer-Regular",
    lineHeight: 22,
  },
  list: {
    marginLeft: 10,
    marginTop: 5,
  },
  listItem: {
    fontSize: 14,
    lineHeight: 22,
    fontFamily: "Switzer-Regular",
  },
  footerBox: {
    marginTop: 40,
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 0.6,
    borderColor: "rgba(150,150,150,0.2)",
  },
  footerText: {
    fontSize: 12,
    fontFamily: "Switzer-Medium",
  },
});
