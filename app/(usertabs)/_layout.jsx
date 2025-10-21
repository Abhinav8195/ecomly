import { Drawer } from "expo-router/drawer";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import {
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import {
  Ionicons,
  MaterialCommunityIcons,
  Feather,
  FontAwesome,
} from "@expo/vector-icons";
import { MotiView } from "moti";
import { router } from "expo-router";
import colors from "../../theme/colors"; 

export default function Layout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const theme = isDark ? colors.dark : colors.light;

  return (
    <Drawer
      screenOptions={{
        headerShown: false,
        drawerType: "front",
        overlayColor: "rgba(0,0,0,0.3)",
        drawerStyle: {
          width: 300,
          borderTopRightRadius: 30,
          borderBottomRightRadius: 30,
          backgroundColor: isDark ? theme.card : "#FFFFFF",
        },
        sceneContainerStyle: {
          backgroundColor: isDark ? theme.background : "#F9F9F9",
        },
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="(tabs)"
        options={{
          drawerLabel: "Home",
          drawerIcon: ({ color }) => (
            <Ionicons
              name="home-outline"
              size={22}
              color={isDark ? "#FFF" : "#333"}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="Orders"
        options={{
          drawerLabel: "My Orders",
          drawerIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="truck-delivery-outline"
              size={22}
              color={isDark ? "#FFF" : "#333"}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="Return"
        options={{
          drawerLabel: "My Returns",
          drawerIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="rotate-3d-variant"
              size={22}
              color={isDark ? "#FFF" : "#333"}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="Contact"
        options={{
          drawerLabel: "Contact Us",
          drawerIcon: ({ color }) => (
            <Ionicons
              name="call-outline"
              size={22}
              color={isDark ? "#FFF" : "#333"}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="PrivacyPolicy"
        options={{
          drawerLabel: "Privacy Policy",
          drawerIcon: ({ color }) => (
            <Feather
              name="shield"
              size={22}
              color={isDark ? "#FFF" : "#333"}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="Terms"
        options={{
          drawerLabel: "Terms & Conditions",
          drawerIcon: ({ color }) => (
            <FontAwesome
              name="file-text-o"
              size={22}
              color={isDark ? "#FFF" : "#333"}
            />
          ),
        }}
      />
    </Drawer>
  );
}

function CustomDrawerContent(props) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const theme = isDark ? colors.dark : colors.light;

  const redActive = "#E53935";
  const redLight = "rgba(229, 57, 53, 0.1)";

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{
        flex: 1,
        backgroundColor: isDark ? theme.background : "#FFFFFF",
        paddingTop: 0,
      }}
    >
      {/* 👤 Profile Section */}
      <MotiView
        from={{ translateY: -30, opacity: 0 }}
        animate={{ translateY: 0, opacity: 1 }}
        transition={{ type: "spring", damping: 15, stiffness: 120 }}
        style={[
          styles.profileSection,
          { backgroundColor: isDark ? '#1A1A1A' : "#F6F6FA" },
        ]}
      >
        <Image
          source={{ uri: "https://i.pravatar.cc/150?img=3" }}
          style={styles.avatar}
        />
        <Text style={[styles.name, { color: theme.textPrimary }]}>
          Abhinav Bhatia
        </Text>
      </MotiView>

      {/* 🧭 Drawer Items */}
      <View style={{ flex: 1, paddingHorizontal: 15 }}>
        {props.state.routes.map((route, index) => {
          const focused = index === props.state.index;
          const { options } = props.descriptors[route.key];

          // 🎨 Extract icon and colorize based on focus
          const IconComponent = options.drawerIcon?.({ color: redActive });
          const coloredIcon = React.cloneElement(IconComponent, {
            color: focused ? redActive : theme.textPrimary,
          });

          return (
            <MotiView
              key={route.key}
              from={{ opacity: 0, translateX: -50 }}
              animate={{ opacity: 1, translateX: 0 }}
              transition={{
                delay: 50 * index,
                type: "spring",
                damping: 12,
                stiffness: 120,
              }}
            >
              <DrawerItem
                label={options.drawerLabel || route.name}
                icon={() => coloredIcon}
                focused={focused}
                onPress={() => props.navigation.navigate(route.name)}
                labelStyle={{
                  color: focused ? redActive : theme.textPrimary,
                  fontWeight: "500",
                  fontSize: 15,
                }}
                style={{
                  borderRadius: 12,
                  marginVertical: 4,
                  backgroundColor: focused ? redLight : "transparent",
                }}
              />
            </MotiView>
          );
        })}
      </View>

      {/* 🚪 Sign Out */}
      <MotiView
        from={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: "timing", duration: 500 }}
      >
        <TouchableOpacity
          style={[
            styles.signOutButton,
            {
              backgroundColor: redActive,
              shadowColor: redActive,
            },
          ]}
          onPress={() => router.replace("/")}
        >
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
      </MotiView>
    </DrawerContentScrollView>
  );
}


const styles = StyleSheet.create({
  profileSection: {
    alignItems: "center",
    paddingVertical: 40,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 5,
  },
  avatar: {
    width: 85,
    height: 85,
    borderRadius: 42.5,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "700",
  },
  signOutButton: {
    marginHorizontal: 20,
    marginVertical: 30,
    paddingVertical: 14,
    borderRadius: 15,
    alignItems: "center",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 6,
  },
  signOutText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
