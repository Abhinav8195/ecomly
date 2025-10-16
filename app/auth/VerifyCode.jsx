import React, { useState, useRef } from "react";
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
import { useLocalSearchParams, useRouter } from "expo-router";
import { MotiView } from "moti";
import colors from "../../theme/colors";
import Toast from "react-native-toast-message";

const VerifyCode = () => {
  const { email } = useLocalSearchParams();
  const router = useRouter();
  const scheme = useColorScheme();
  const isDark = scheme === "dark";
  const theme = isDark ? colors.dark : colors.light;

  const [code, setCode] = useState(["", "", "", ""]);
  const inputRefs = useRef([]);

  const handleChange = (text, index) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);
    if (text && index < 3) inputRefs.current[index + 1].focus();
  };

  const handleContinue = () => {
    const entered = code.join("");
    if (entered.length < 4) {
      Toast.show({
        type: "error",
        text1: "Incomplete Code",
        text2: "Please enter the 4-digit verification code.",
      });
      return;
    }

    Toast.show({
      type: "success",
      text1: "Code Verified ✅",
      text2: "Redirecting to password reset...",
    });

    setTimeout(() => {
      router.push("/auth/NewPassword");
    }, 1000);
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
          Verify Code
        </Text>
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
          We’ve sent a 4-digit verification code to your email{"\n"}{email}
        </Text>

        
        <View style={styles.codeContainer}>
          {code.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => (inputRefs.current[index] = ref)}
              style={[
                styles.codeInput,
                {
                  backgroundColor: isDark ? colors.dark.card : "#F6F6F6",
                  borderColor: isDark ? "#2A2932" : "#E3E3E3",
                  color: theme.textPrimary,
                },
              ]}
              keyboardType="numeric"
              maxLength={1}
              value={digit}
              onChangeText={(text) => handleChange(text, index)}
              autoFocus={index === 0}
            />
          ))}
        </View>

        
        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.primary }]}
          onPress={handleContinue}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </MotiView>
    </KeyboardAvoidingView>
  );
};

export default VerifyCode;

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
  codeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 40,
  },
  codeInput: {
    width: 65,
    height: 65,
    borderRadius: 12,
    borderWidth: 1,
    textAlign: "center",
    fontSize: 20,
    fontFamily: "Switzer-Bold",
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
