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
import colors from "../../theme/colors";
import Toast from "react-native-toast-message";

const NewPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const scheme = useColorScheme();
  const isDark = scheme === "dark";
  const theme = isDark ? colors.dark : colors.light;
  const router = useRouter();

  const handleReset = () => {
  if (!newPassword.trim() || !confirmPassword.trim()) {
    Toast.show({
      type: "error",
      text1: "Missing Fields",
      text2: "Please fill out both password fields.",
    });
    return;
  }

  if (newPassword.length < 6) {
    Toast.show({
      type: "error",
      text1: "Weak Password",
      text2: "Password must be at least 6 characters long.",
    });
    return;
  }

  if (newPassword !== confirmPassword) {
    Toast.show({
      type: "error",
      text1: "Password Mismatch",
      text2: "Both passwords must match.",
    });
    return;
  }

  Toast.show({
    type: "success",
    text1: "Password Reset Successful 🎉",
    text2: "Redirecting to sign-in screen...",
  });

  setTimeout(() => {
    router.dismissAll();
    router.replace("/"); 
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
          Create New Password
        </Text>
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
          Your new password must be different{"\n"}from previously used ones.
        </Text>

       
        <Text style={[styles.label, { color: theme.textPrimary }]}>New Password</Text>
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
            placeholder="Enter new password"
            placeholderTextColor={theme.textSecondary}
            secureTextEntry={!showPassword}
            value={newPassword}
            onChangeText={setNewPassword}
            style={[styles.input, { color: theme.textPrimary }]}
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

       
        <Text style={[styles.label, { color: theme.textPrimary, marginTop: 20 }]}>
          Confirm Password
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
            placeholder="Re-enter new password"
            placeholderTextColor={theme.textSecondary}
            secureTextEntry={!showConfirm}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            style={[styles.input, { color: theme.textPrimary }]}
          />
          <TouchableOpacity
            onPress={() => setShowConfirm(!showConfirm)}
            style={styles.eyeIcon}
          >
            <Ionicons
              name={showConfirm ? "eye-off-outline" : "eye-outline"}
              size={22}
              color={theme.textSecondary}
            />
          </TouchableOpacity>
        </View>

      
        <MotiView
          from={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "timing", duration: 600, delay: 200 }}
        >
          <TouchableOpacity
            style={[styles.button, { backgroundColor: colors.light.redPrimary }]}
            onPress={handleReset}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Reset Password</Text>
          </TouchableOpacity>
        </MotiView>
      </MotiView>
    </KeyboardAvoidingView>
  );
};

export default NewPassword;

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
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    borderWidth: 1,
  },
  input: {
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
});
