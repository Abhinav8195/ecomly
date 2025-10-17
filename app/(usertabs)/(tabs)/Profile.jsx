import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  useColorScheme,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { MotiView, AnimatePresence } from "moti";
import colors from "../../../theme/colors";
import { Easing } from "react-native-reanimated";

const Profile = () => {
  const scheme = useColorScheme();
  const isDark = scheme === "dark";
  const theme = isDark ? colors.dark : colors.light;

  const [editMode, setEditMode] = useState(false);
  const [profileImage, setProfileImage] = useState(
    "https://randomuser.me/api/portraits/men/32.jpg"
  );
  const [fullName, setFullName] = useState("Alex Smith");
  const [phone, setPhone] = useState("+917206642153");
  const [email] = useState("info@onixlab.net");
  const [selectedGender, setSelectedGender] = useState("");

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
      showsVerticalScrollIndicator={false}
    >
      {/* Animated Header */}
      <MotiView
        from={{ opacity: 0, translateY: -20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: "timing", duration: 500 }}
        style={styles.header}
      >
        <Text style={[styles.headerTitle, { color: theme.textPrimary }]}>
          Profile
        </Text>
        <TouchableOpacity onPress={() => setEditMode(!editMode)}>
          <Ionicons
            name={editMode ? "close-outline" : "pencil-outline"}
            size={24}
            color={colors.primary}
          />
        </TouchableOpacity>
      </MotiView>

      {/* Animated Profile Picture */}
      <MotiView
  from={{ opacity: 0, translateY: 40, scale: 0.95 }}
  animate={{ opacity: 1, translateY: 0, scale: 1 }}
  transition={{
    type: "timing",
    duration: 700,
     easing: Easing.out(Easing.cubic),
  }}
  style={styles.profileContainer}
>
  <TouchableOpacity disabled={!editMode} onPress={pickImage}>
    <Image
      source={{ uri: profileImage }}
      style={[styles.profileImage, { shadowColor: "#000", shadowOpacity: 0.2, shadowRadius: 10 }]}
    />
  </TouchableOpacity>

  <AnimatePresence>
    {editMode && (
      <MotiView
        from={{ opacity: 0, translateY: 8 }}
        animate={{ opacity: 1, translateY: 0 }}
        exit={{ opacity: 0, translateY: 8 }}
        transition={{ type: "timing", duration: 400, delay: 200 }}
      >
        <Text style={[styles.changePhoto, { color: colors.primary }]}>
          Tap to change
        </Text>
      </MotiView>
    )}
  </AnimatePresence>
</MotiView>


      {/* Form Fields */}
      <MotiView
        from={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 300, duration: 500 }}
        style={styles.fieldContainer}
      >
        {[
          { label: "Full Name", value: fullName, set: setFullName, editable: true },
          { label: "Email", value: email, editable: false },
          { label: "Phone Number", value: phone, set: setPhone, editable: true },
        ].map((field, index) => (
          <MotiView
            key={field.label}
            from={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ delay: index * 100 + 400 }}
          >
            <Text style={[styles.label, { color: theme.textSecondary }]}>
              {field.label}
            </Text>
            <TextInput
              value={field.value}
              onChangeText={field.set}
              editable={editMode && field.editable}
              style={[
                styles.inputBox,
                {
                  backgroundColor: theme.card,
                  color: theme.textPrimary,
                  borderColor: isDark ? "#333" : "#DDD",
                  borderWidth: 1,
                  fontFamily: "Switzer-Medium",
                },
              ]}
            />
          </MotiView>
        ))}

        {/* Gender Section */}
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ delay: 700 }}
        >
          <Text style={[styles.label, { color: theme.textSecondary }]}>
            Gender
          </Text>
          <View style={styles.genderRow}>
            {["Male", "Female", "Other"].map((gender, i) => (
              <MotiView
                key={gender}
                from={{ opacity: 0, translateY: 10 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ delay: 800 + i * 100 }}
              >
                <TouchableOpacity
                  onPress={() => editMode && setSelectedGender(gender)}
                  style={styles.genderOption}
                >
                  <View
                    style={[
                      styles.radioCircle,
                      {
                        borderColor:
                          selectedGender === gender
                            ? colors.primary
                            : theme.textSecondary,
                      },
                    ]}
                  >
                    {selectedGender === gender && (
                      <View
                        style={[
                          styles.radioInner,
                          { backgroundColor: colors.primary },
                        ]}
                      />
                    )}
                  </View>
                  <Text
                    style={[
                      styles.genderLabel,
                      {
                        color:
                          selectedGender === gender
                            ? colors.primary
                            : theme.textSecondary,
                        fontFamily: "Switzer-Medium",
                      },
                    ]}
                  >
                    {gender}
                  </Text>
                </TouchableOpacity>
              </MotiView>
            ))}
          </View>
        </MotiView>

        {/* Save Button Animation */}
        <AnimatePresence>
          {editMode && (
            <MotiView
              from={{ opacity: 0, translateY: 30 }}
              animate={{ opacity: 1, translateY: 0 }}
              exit={{ opacity: 0, translateY: 30 }}
              transition={{ type: "timing", duration: 400 }}
            >
              <TouchableOpacity
                style={[styles.saveButton, { backgroundColor: colors.primary }]}
                onPress={() => setEditMode(false)}
              >
                <Text style={[styles.saveText, { fontFamily: "Switzer-Bold" }]}>
                  Save
                </Text>
              </TouchableOpacity>
            </MotiView>
          )}
        </AnimatePresence>
      </MotiView>
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  headerTitle: { fontSize: 19, fontFamily: "Switzer-Extrabold" },
  profileContainer: { alignItems: "center", marginTop: 30 },
  profileImage: { width: 100, height: 100, borderRadius: 50 },
  changePhoto: { marginTop: 8, fontSize: 14, fontFamily: "Switzer-Medium" },
  fieldContainer: { marginTop: 30, paddingHorizontal: 20 },
  label: { fontSize: 14, marginBottom: 6, fontFamily: "Switzer-Medium" },
  inputBox: {
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
    fontSize: 15,
  },
  genderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 30,
  },
  genderOption: { flexDirection: "row", alignItems: "center" },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  radioInner: { width: 10, height: 10, borderRadius: 5 },
  genderLabel: { fontSize: 15 },
  saveButton: {
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginTop: 20,
  },
  saveText: { color: "#fff", fontSize: 16 },
});
