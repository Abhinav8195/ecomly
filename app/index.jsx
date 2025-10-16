import { Redirect } from "expo-router";
import { useContext, useState } from "react";
import { Text, View } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Welcome from "../components/Welcome";

export default function Index() {
  const { isUserVerified, setIsUserVerified } = useState(null);
  const [loading, setLoading] = useState(true);
  return (
     <View style={{ flex: 1 }}>
      {isUserVerified ? <Redirect href={'/home'} /> : <Welcome />}
    </View>
  );
}
