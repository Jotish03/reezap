import { StyleSheet, Text, View } from "react-native";
import React from "react";
import BottomNav from "@/components/bottom-nav/bottomnav";

const MainScreen = () => {
  return (
    <View className="flex-1">
      <BottomNav />
    </View>
  );
};

export default MainScreen;

const styles = StyleSheet.create({});
