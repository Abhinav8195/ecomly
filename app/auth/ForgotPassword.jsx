import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
  useColorScheme,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MotiView } from "moti";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import colors from "../../theme/colors";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const scheme = useColorScheme();
  const isDark = scheme === "dark";
  const theme = isDark ? colors.dark : colors.light;
  const router = useRouter();

  const validateEmail = (mail) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(mail);
  };

  const handleContinue = () => {
     if (!email.trim()) {
      Toast.show({
        type: "error",
        text1: "Missing Email",
        text2: "Please enter your email address.",
      });
      return;
    }
    if (!validateEmail(email)) {
      Toast.show({
        type: "error",
        text1: "Invalid Email",
        text2: "Please enter a valid email address.",
      });
      return;
    }


    Toast.show({
      type: "success",
      text1: "Email Verified",
      text2: "Redirecting to verification screen...",
    });

    setTimeout(() => {
      router.push({
        pathname: "/auth/VerifyCode",
        params: { email },
      });
    }, 1200);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <MotiView
        from={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: "timing", duration: 500 }}
        style={{ flex: 1 }}
      >
        
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={26} color={theme.textPrimary} />
        </TouchableOpacity>

       
        <Text style={[styles.title, { color: theme.textPrimary }]}>
          Forgot Password
        </Text>
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
          Please enter the email address associated{"\n"}with your account
        </Text>

       
        <Text style={[styles.label, { color: theme.textPrimary }]}>Your Email</Text>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: isDark ? colors.dark.card : "#F5F5F5",
              borderColor: isDark ? "#2A2932" : "#E3E3E3",
              color: theme.textPrimary,
            },
          ]}
          placeholder="info@onixlab.net"
          placeholderTextColor={theme.textSecondary}
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        
        <MotiView
          from={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "timing", duration: 600, delay: 200 }}
        >
          <TouchableOpacity
            style={[styles.button, { backgroundColor: colors.primary }]}
            onPress={handleContinue}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </MotiView>
      </MotiView>
    </KeyboardAvoidingView>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  backButton: {
    marginTop: 10,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontFamily: "Switzer-Bold",
    marginBottom: 6,
  },
  subtitle: {
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
    width: "100%",
    borderRadius: 12,
    padding: 16,
    fontSize: 15,
    fontFamily: "Switzer-Regular",
    borderWidth: 1,
    marginBottom: 30,
  },
  button: {
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Switzer-Semibold",
  },
});
