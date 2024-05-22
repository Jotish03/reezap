import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";

const BottomTabLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen name="user-login" options={{ headerShown: false }} />
        <Stack.Screen name="user-register" options={{ headerShown: false }} />
        <Stack.Screen name="dashboard" options={{ headerShown: false }} />
      </Stack>
      <StatusBar backgroundColor="#ffffff" style="dark" />
    </>
  );
};

export default BottomTabLayout;
