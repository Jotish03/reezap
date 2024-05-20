import React, { useState } from "react";
import {
  ScrollView,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import firestore from "@react-native-firebase/firestore";
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { Link } from "expo-router";
import { images } from "@/constants";

interface UserRegisterParams {
  uid: string;
}

const UserRegister = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const route = useRoute<RouteProp<{ params: UserRegisterParams }>>();
  const { uid } = route.params;

  if (!uid) {
    return <Text>Loading...</Text>;
  }

  const [username, setUsername] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const saveDetails = async () => {
    try {
      await retryFirestoreOperation(() =>
        firestore().collection("users").doc(uid).set({ name, email, username })
      );
      navigation.navigate("dashboard");
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log("An unexpected error occurred", error);
      }
    }
  };

  const retryFirestoreOperation = async (
    operation: () => Promise<any>,
    retries: number = 3,
    delay: number = 1000
  ): Promise<any> => {
    for (let attempt = 0; attempt < retries; attempt++) {
      try {
        return await operation();
      } catch (error) {
        if (
          error instanceof Error &&
          error.message.includes("firestore/unavailable")
        ) {
          if (attempt === retries - 1) {
            throw error;
          }
          await new Promise((resolve) =>
            setTimeout(resolve, delay * 2 ** attempt)
          );
        } else {
          throw error;
        }
      }
    }
  };

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
      >
        <View className="justify-center items-center h-[70vh] px-4 my-6">
          <Image source={images.reezaplogo} />
          <Text className="font-interbold text-xl mt-1">
            Reez<Text className="text-primary">ap</Text>
          </Text>
          <Text className="text-2xl  mb-4 mt-16 font-interbold">
            Register & Continue
          </Text>
          <TextInput
            className="bg-gray-100 px-4 py-2 rounded-md mb-4 w-full font-intersemibold"
            placeholder="Enter your username"
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            className="bg-gray-100 px-4 py-2 rounded-md mb-4 w-full font-intersemibold"
            placeholder="Enter your full name"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            className="bg-gray-100 px-4 py-2 rounded-md mb-4 w-full font-intersemibold"
            placeholder="Enter you email address"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <TouchableOpacity
            className="flex items-center justify-center bg-primary py-3 px-6 rounded-lg w-full"
            onPress={saveDetails}
          >
            <Text className="text-white font-intersemibold text-center ">
              Register
            </Text>
          </TouchableOpacity>
          <Text className="font-interregular text-gray-500 text-[12px] mt-2">
            Register to continue
          </Text>
        </View>

        <View className="flex  items-center justify-center mt-36">
          <Text className="font-interregular text-center px-4">
            By clicking continue, you agree to our{" "}
            <Link href={""} className="font-intersemibold">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href={""} className="font-intersemibold">
              Privacy Policy
            </Link>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UserRegister;
