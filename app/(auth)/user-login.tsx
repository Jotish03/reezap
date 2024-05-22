import {
  Image,
  ScrollView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
import OTPInput from "@/components/otp-fields";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Link } from "expo-router";

const UserLogin = () => {
  const [phoneNo, setPhoneNo] = useState<string>("");
  const [confirmationResult, setConfirmationResult] =
    useState<FirebaseAuthTypes.ConfirmationResult | null>(null);
  const navigation = useNavigation<NavigationProp<any>>();
  const [loading, setLoading] = useState(false);
  const signInWithPhoneNumber = async () => {
    try {
      const confirmation: FirebaseAuthTypes.ConfirmationResult =
        await auth().signInWithPhoneNumber(`+91${phoneNo}`);
      setLoading(true);
      console.log("Confirmation result:", confirmation);
      setConfirmationResult(confirmation);
    } catch (error) {
      if (error instanceof Error) {
        setLoading(false);
        console.log(error.message);
      } else {
        setLoading(false);
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

  const confirmCode = async (otp: string) => {
    try {
      if (confirmationResult) {
        const userCredential = await confirmationResult.confirm(otp);
        const user = userCredential?.user;

        const userDocument = await retryFirestoreOperation(() =>
          firestore().collection("users").doc(user?.uid).get()
        );

        if (userDocument.exists) {
          navigation.navigate("main-screen");
        } else {
          navigation.navigate("user-register", { uid: user?.uid });
        }
      } else {
        console.log("No confirmation result available.");
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log("An unexpected error occurred", error);
      }
    }
  };

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView>
        <View className="w-full justify-center items-center h-[70vh] px-4 my-6">
          <Image source={images.reezaplogo} />
          <Text className="font-interbold text-xl mt-1">
            Reez<Text className="text-primary">ap</Text>
          </Text>
          {!confirmationResult ? (
            <>
              <View className="flex flex-col items-center justify-center mt-16">
                <Text className="font-intersemibold text-xl">
                  Create an Account
                </Text>
                <Text className="font-interregular">
                  Enter your phone number to sign up
                </Text>
              </View>
              <TextInput
                className="h-12 w-full border border-gray-300 rounded-lg px-4 mt-8 font-intersemibold text-lg"
                placeholder="Enter your phone number"
                value={phoneNo}
                onChangeText={setPhoneNo}
                keyboardType="phone-pad"
              />
              <TouchableOpacity
                className="flex flex-row items-center justify-center bg-primary py-3 px-6 rounded-lg mt-4 w-full "
                onPress={signInWithPhoneNumber}
              >
                <Text className="text-white font-interbold text-center">
                  {loading ? "Signing up..." : "Sign Up"}
                </Text>
                {loading && (
                  <ActivityIndicator
                    size={20}
                    color={"#ffffff"}
                    className="ml-2"
                  />
                )}
              </TouchableOpacity>
              <Text className="font-interregular text-gray-500 text-[12px] mt-2">
                Sign up Reezap using Phone Number
              </Text>
            </>
          ) : (
            <OTPInput onCodeFilled={confirmCode} />
          )}
        </View>

        <View className="flex  items-center justify-center mt-36">
          <Text className="font-interregular text-center px-4">
            By clicking continue, you agree to our{" "}
            <Link href={"user-otp-demo"} className="font-intersemibold">
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

export default UserLogin;
