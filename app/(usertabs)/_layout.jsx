import { Drawer } from "expo-router/drawer";
import React from "react";
import { View, Text, StyleSheet, useColorScheme } from "react-native";
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Layout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <Drawer
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: isDark ? "#121212" : "#fff",
          width: 280,
        },
        drawerActiveTintColor: "#524EB7",
        drawerInactiveTintColor: isDark ? "#ccc" : "#000",
        drawerLabelStyle: { fontSize: 16, fontWeight: "500" },
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="(tabs)" // points to your Tabs navigator
        options={{
          drawerLabel: "Dashboard",
          drawerIcon: ({ color }) => (
            <MaterialCommunityIcons name="view-dashboard-outline" size={22} color={color} />
          ),
        }}
      />
    </Drawer>
  );
}

function CustomDrawerContent(props) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{
        flex: 1,
        backgroundColor: isDark ? "#121212" : "#fff",
        paddingTop: 20,
      }}
    >
      <View style={styles.topSection}>
        <Text style={[styles.title, { color: isDark ? "#fff" : "#000" }]}>Dashboard</Text>
      </View>

      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  topSection: {
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
  },
});
