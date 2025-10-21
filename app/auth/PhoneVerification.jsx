import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Keyboard,
  useColorScheme,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import CountryPicker from "react-native-country-picker-modal";
import Toast from "react-native-toast-message";
import { MotiView } from "moti";
import colors from "../../theme/colors";

const PhoneVerification = () => {
  const router = useRouter();
  const [countryCode, setCountryCode] = useState("IN");
  const [callingCode, setCallingCode] = useState("91");
  const [phone, setPhone] = useState("");
  const [visible, setVisible] = useState(false);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const theme = isDark ? colors.dark : colors.light;

  const onSelect = (country) => {
    setCountryCode(country.cca2);
    setCallingCode(country.callingCode[0]);
  };

  const handleContinue = () => {
    Keyboard.dismiss();
    if (!phone.trim()) {
      Toast.show({
        type: "error",
        text1: "Missing Number",
        text2: "Please enter your phone number",
      });
      return;
    }

    if (phone.length < 7) {
      Toast.show({
        type: "error",
        text1: "Invalid Number",
        text2: "Please enter a valid phone number",
      });
      return;
    }

    Toast.show({
      type: "success",
      text1: "Success",
      text2: "Verification code sent successfully!",
    });

     setTimeout(() => {
      router.dismissAll();
      router.replace("/(usertabs)/(tabs)/Home"); 
    }, 800)
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
   
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={26} color={theme.textPrimary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.textPrimary }]}>
          Phone Number
        </Text>
        <View style={{ width: 26 }} />
      </View>

    
      <MotiView
        from={{ opacity: 0, translateY: 40 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: "timing", duration: 600 }}
        style={styles.content}
      >
        <Text style={[styles.title, { color: theme.textPrimary }]}>
          What’s Your Number
        </Text>
        <Text style={[styles.subtitle, { color:colors.light.redPrimary }]}>
          Please enter your number
        </Text>

        
        <MotiView
          from={{ opacity: 0, translateY: 30 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "timing", duration: 500, delay: 200 }}
          style={styles.inputContainer}
        >
          <View
            style={[
              styles.phoneContainer,
              {
                backgroundColor: isDark ? colors.dark.card : "#F7F7F7",
                borderColor: isDark ? "#2A2932" : "#E3E3E3",
              },
            ]}
          >
            <TouchableOpacity
              style={styles.flagContainer}
              onPress={() => setVisible(true)}
            >
              <CountryPicker
                countryCode={countryCode}
                withFilter
                withFlag
                withCallingCode
                withAlphaFilter
                withEmoji
                visible={visible}
                onSelect={onSelect}
                onClose={() => setVisible(false)}
              />
              <Text style={[styles.codeText, { color: theme.textPrimary }]}>
                +{callingCode}
              </Text>
            </TouchableOpacity>

            <TextInput
              style={[styles.textInput, { color: theme.textPrimary }]}
              placeholder="Enter phone number"
              placeholderTextColor={isDark?"white":"black" + "90"}
              keyboardType="phone-pad"
              maxLength={15}
              value={phone}
              onChangeText={setPhone}
            />
          </View>
        </MotiView>

       
        <MotiView
          from={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "timing", duration: 500, delay: 400 }}
        >
          <TouchableOpacity
            style={[styles.button, { backgroundColor: colors.light.redPrimary }]}
            onPress={handleContinue}
            activeOpacity={0.9}
          >
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </MotiView>
      </MotiView>
    </View>
  );
};

export default PhoneVerification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: "Switzer-Semibold",
  },
  content: {
    marginTop: 50,
  },
  title: {
    fontSize: 26,
    fontFamily: "Switzer-Bold",
  },
  subtitle: {
    fontSize: 15,
    fontFamily: "Switzer-Regular",
    marginTop: 6,
  },
  inputContainer: {
    marginTop: 40,
  },
  phoneContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 12,
    height: 58,
  },
  flagContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  codeText: {
    fontSize: 16,
    fontFamily: "Switzer-Medium",
  },
  textInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    fontFamily: "Switzer-Medium",
  },
  button: {
    marginTop: 50,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 17,
    fontFamily: "Switzer-Semibold",
  },
});
