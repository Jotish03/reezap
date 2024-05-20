import { Link } from "expo-router";
import React from "react";
import {
  Image,
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const OnboardingScreen = () => {
  return (
    <SafeAreaView className="flex bg-white h-full px-6">
      <ScrollView>
        <View className="h-[100vh] items-center justify-center">
          <Image
            source={require("../../assets/images/mountain-bike.png")} // Replace with your own onboarding image
            className="w-80 h-80 mb-1"
          />
          <Text className="text-3xl font-interlight text-center mt-8">
            Welcome to{" "}
            <Text className="font-interbold text-6xl text-darktext">
              Reezap!
            </Text>
          </Text>
          <Text className="text-gray-500 text-center mt-4 text-lg">
            We help you make better decisions with AI-powered insights.
          </Text>
          <TouchableOpacity className="flex items-center justify-center bg-primary py-3 px-6 rounded-lg mt-16 w-full ">
            <Link
              href={"user-login"}
              className="text-white font-interbold text-center"
            >
              Get Started
            </Link>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OnboardingScreen;
