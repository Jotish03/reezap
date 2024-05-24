import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { NavigationProp, useNavigation } from "@react-navigation/native";
const Settings = () => {
  const [username, setUsername] = useState("");
  const navigation = useNavigation<NavigationProp<any>>();

  const handleLogout = async () => {
    try {
      await auth().signOut();
      navigation.reset({ index: 0, routes: [{ name: "user-login" }] });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth().currentUser;
        if (user) {
          const userDoc = await firestore()
            .collection("users")
            .doc(user.uid)
            .get();
          if (userDoc.exists) {
            const userData = userDoc.data();
            setUsername(userData?.username || "");
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);
  return (
    <>
      <SafeAreaView className="p-3">
        <ScrollView>
          <View className="flex-row items-center mb-6">
            <MaterialIcons name="account-circle" size={54} color="#333" />
            <Text className="text-lg font-intersemibold ml-4">
              Welcome, {username}
            </Text>
          </View>

          <View className="flex-row justify-between mb-6">
            <TouchableOpacity className="bg-gray-800 p-4 rounded-lg flex-1 mr-2 items-center">
              <MaterialIcons name="sports-motorsports" size={24} color="#fff" />
              <Text className="text-white font-intersemibold mt-2">
                Bookings
              </Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-gray-800 p-4 rounded-lg flex-1 mx-2 items-center">
              <MaterialIcons
                name="account-balance-wallet"
                size={24}
                color="#fff"
              />
              <Text className="text-white font-intersemibold mt-2">Wallet</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-gray-800 p-4 rounded-lg flex-1 ml-2 items-center">
              <MaterialIcons name="settings" size={24} color="#fff" />
              <Text className="text-white font-intersemibold mt-2">
                Settings
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            className="bg-red-500 p-4 rounded-lg"
            onPress={handleLogout}
          >
            <Text className="text-white font-bold text-center">Logout</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
  },
});

export default Settings;
