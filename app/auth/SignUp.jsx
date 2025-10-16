import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MotiView } from "moti";
import { useRouter } from "expo-router";
import colors from "../../theme/colors";
import Toast from "react-native-toast-message";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();
  const scheme = useColorScheme();
  const isDark = scheme === "dark";
  const theme = isDark ? colors.dark : colors.light;

 const handleSignUp = () => {
  if (!name.trim() || !email.trim() || !password.trim()) {
    Toast.show({
      type: "error",
      text1: "Missing Fields",
      text2: "Please fill all fields before continuing.",
    });
    return;
  }

  if (!email.includes("@") || !email.includes(".")) {
    Toast.show({
      type: "error",
      text1: "Invalid Email",
      text2: "Please enter a valid email address.",
    });
    return;
  }

  if (password.length < 6) {
    Toast.show({
      type: "error",
      text1: "Weak Password",
      text2: "Password must be at least 6 characters long.",
    });
    return;
  }

  Toast.show({
    type: "success",
    text1: "Account Created 🎉",
    text2: "Redirecting to Sign In screen...",
  });

  setTimeout(() => {
    router.replace("/signin"); 
  }, 1200);
};

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.background }]}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.innerContainer}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <MotiView
            from={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: "timing", duration: 500 }}
          >
            
            <View style={styles.headerRow}>
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => router.back()}
              >
                <Ionicons name="arrow-back" size={26} color={theme.textPrimary} />
              </TouchableOpacity>
              <Text style={[styles.title, { color: theme.textPrimary }]}>
                Sign Up
              </Text>
              
              <View style={{ width: 26 }} />
            </View>

           
            <Text style={[styles.heading, { color: theme.textPrimary }]}>
              Create an Account
            </Text>
            <Text style={[styles.subText, { color: theme.textSecondary }]}>
              Please create with your account
            </Text>

           
            <View style={styles.inputSection}>
              <Text style={[styles.label, { color: theme.textPrimary }]}>
                Your Name
              </Text>
              <TextInput
                placeholder="John Doe"
                placeholderTextColor={theme.textSecondary}
                style={[
                  styles.input,
                  {
                    backgroundColor: isDark ? colors.dark.card : "#F6F6F6",
                    borderColor: isDark ? "#2A2932" : "#E3E3E3",
                    color: theme.textPrimary,
                  },
                ]}
                value={name}
                onChangeText={setName}
              />

              <Text
                style={[styles.label, { color: theme.textPrimary, marginTop: 18 }]}
              >
                Email
              </Text>
              <TextInput
                placeholder="example@email.com"
                placeholderTextColor={theme.textSecondary}
                keyboardType="email-address"
                autoCapitalize="none"
                style={[
                  styles.input,
                  {
                    backgroundColor: isDark ? colors.dark.card : "#F6F6F6",
                    borderColor: isDark ? "#2A2932" : "#E3E3E3",
                    color: theme.textPrimary,
                  },
                ]}
                value={email}
                onChangeText={setEmail}
              />

              <Text
                style={[styles.label, { color: theme.textPrimary, marginTop: 18 }]}
              >
                Password
              </Text>
              <View
                style={[
                  styles.passwordContainer,
                  {
                    backgroundColor: isDark ? colors.dark.card : "#F6F6F6",
                    borderColor: isDark ? "#2A2932" : "#E3E3E3",
                  },
                ]}
              >
                <TextInput
                  placeholder="Enter your password"
                  placeholderTextColor={theme.textSecondary}
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                  style={[styles.inputField, { color: theme.textPrimary }]}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeIcon}
                >
                  <Ionicons
                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                    size={22}
                    color={theme.textSecondary}
                  />
                </TouchableOpacity>
              </View>
            </View>

           
            <MotiView
              from={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "timing", duration: 600, delay: 200 }}
            >
              <TouchableOpacity
                style={[styles.button, { backgroundColor: colors.primary }]}
                activeOpacity={0.8}
                onPress={handleSignUp}
              >
                <Text style={styles.buttonText}>Sign Up</Text>
              </TouchableOpacity>
            </MotiView>
          </MotiView>
        </ScrollView>

        
        <View style={styles.footer}>
          <Text style={[styles.bottomText, { color: theme.textSecondary }]}>
            Already have an account?{" "}
            <Text
              style={[styles.link, { color: colors.primary }]}
              onPress={() => router.push("/auth/SignIn")}
            >
              Sign In
            </Text>
          </Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  scrollContent: {
    flexGrow: 1,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 25,
  },
  backButton: {
    padding: 4,
  },
  title: {
    fontSize: 18,
    fontFamily: "Switzer-Bold",
    textAlign: "center",
  },
  heading: {
    fontSize: 22,
    fontFamily: "Switzer-Bold",
    marginBottom: 6,
  },
  subText: {
    fontSize: 14,
    fontFamily: "Switzer-Regular",
    marginBottom: 30,
    lineHeight: 20,
  },
  label: {
    fontSize: 14,
    fontFamily: "Switzer-Medium",
    marginBottom: 10,
  },
  input: {
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    fontFamily: "Switzer-Regular",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    borderWidth: 1,
  },
  inputField: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    fontFamily: "Switzer-Regular",
  },
  eyeIcon: {
    paddingHorizontal: 12,
  },
  button: {
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 40,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Switzer-Semibold",
  },
  footer: {
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 20,
  },
  bottomText: {
    textAlign: "center",
    fontSize: 14,
    fontFamily: "Switzer-Regular",
  },
  link: {
    fontFamily: "Switzer-Semibold",
  },
});
