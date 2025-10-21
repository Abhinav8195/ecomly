import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  useColorScheme,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MotiView } from "moti";
import { useRouter } from "expo-router";
import colors from "../../theme/colors";

const { width, height } = Dimensions.get("window");

const SignIn = () => {
  const router = useRouter();
  const scheme = useColorScheme();
  const isDark = scheme === "dark";

  const theme = isDark ? colors.dark : colors.light;
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.background }]}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons
              name="arrow-back"
              size={26}
              color={theme.textPrimary}
              style={{ padding: 6 }}
            />
          </TouchableOpacity>
          <Text style={[styles.headerText, { color: theme.textPrimary }]}>
            Sign In
          </Text>
          <View style={{ width: 30 }} />
        </View>

       
        <MotiView
          from={{ opacity: 0, translateY: 30 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "timing", duration: 600 }}
          style={styles.textContainer}
        >
          <Text style={[styles.title, { color: theme.textPrimary }]}>
            Hello User 👋
          </Text>
          <Text style={[styles.subtitle, { color:isDark?"#ddd": theme.textSecondary }]}>
            Please sign in with your account
          </Text>
        </MotiView>

       
        <MotiView
          from={{ opacity: 0, translateY: 50 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "timing", duration: 700, delay: 150 }}
          style={styles.form}
        >
          <Text style={[styles.label, { color: theme.textPrimary }]}>Email</Text>
          <TextInput
            placeholder="Your Email"
            placeholderTextColor={isDark?colors.light.background:theme.textSecondary}
            value={email}
            onChangeText={setEmail}
            style={[
              styles.input,
              {
                backgroundColor: isDark ? colors.dark.card : "#F6F6F6",
                borderColor: isDark ? "#2A2932" : "#E3E3E3",
                color: theme.textPrimary,
              },
            ]}
          />

          <Text style={[styles.label, { color: theme.textPrimary, marginTop: 20 }]}>
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
              placeholder="Password"
              placeholderTextColor={isDark?colors.light.background:theme.textSecondary}
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
              style={[styles.input, { flex: 1, borderWidth: 0, marginBottom: 0 }]}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={styles.eyeIcon}
            >
              <Ionicons
                name={showPassword ? "eye-off-outline" : "eye-outline"}
                size={22}
                color={isDark?colors.light.background:theme.textSecondary}
              />
            </TouchableOpacity>
          </View>

          
          <TouchableOpacity onPress={() => router.push("/auth/ForgotPassword")}>
            <Text style={[styles.forgotText, { color: colors.light.redPrimary }]}>
              Forgot Password?
            </Text>
          </TouchableOpacity>

         
          <MotiView
            from={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "timing", duration: 600, delay: 200 }}
          >
            <TouchableOpacity
              style={[styles.button, { backgroundColor: colors.light.redPrimary }]}
             onPress={() => {
    router.dismissAll(); 
    router.replace("/(usertabs)/(tabs)/Home");
  }}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>
          </MotiView>
        </MotiView>
      </ScrollView>

      
      <View style={styles.footer}>
        <Text style={[styles.footerText, { color: isDark?colors.light.background : theme.textSecondary }]}>
          Don’t have an account?{" "}
          <Text
            style={[styles.createText, { color: colors.light.redPrimary }]}
            onPress={() => router.push("/auth/SignUp")}
          >
            Create Account
          </Text>
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  headerText: {
    fontSize: 18,
    fontFamily: "Switzer-Bold",
  },
  textContainer: {
    marginTop: 40,
  },
  title: {
    fontSize: 28,
    fontFamily: "Switzer-Extrabold",
  },
  subtitle: {
    fontSize: 15,
    fontFamily: "Switzer-Regular",
    marginTop: 6,
  },
  form: {
    marginTop: 40,
  },
  label: {
    fontSize: 14,
    fontFamily: "Switzer-Medium",
    marginBottom: 8,
  },
  input: {
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 14,
    fontFamily: "Switzer-Regular",
    borderWidth: 1,
    marginBottom: 10,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    borderWidth: 1,
  },
  eyeIcon: {
    paddingHorizontal: 12,
  },
  forgotText: {
    textAlign: "right",
    fontFamily: "Switzer-Medium",
    fontSize: 13,
    marginTop: 6,
  },
  button: {
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Switzer-Bold",
  },
  footer: {
    position: "absolute",
    bottom: 30,
    alignSelf: "center",
    width: width,
  },
  footerText: {
    textAlign: "center",
    fontSize: 13,
    fontFamily: "Switzer-Regular",
  },
  createText: {
    fontFamily: "Switzer-Medium",
  },
});
