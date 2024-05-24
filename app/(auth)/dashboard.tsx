import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import MapViewComponent from "@/components/map-view";

import * as Location from "expo-location";
import LocationInputs from "@/components/locations/location-inputs";
import { SafeAreaView } from "react-native-safe-area-context";

const Dashboard = () => {
  const handleCurrentLocationChange = (location: Location.LocationObject) => {
    // Handle the current location change
    console.log("Current location:", location);
  };

  const handleDestinationChange = (destination: string) => {
    // Handle the destination change
    console.log("Destination:", destination);
  };

  return (
    <>
      <MapViewComponent />
      <SafeAreaView>
        <ScrollView className="top-[-24vh] bg-white p-8  absolute w-full rounded-t-2xl opacity-90 ">
          <LocationInputs
            onCurrentLocationChange={handleCurrentLocationChange}
            onDestinationChange={handleDestinationChange}
          />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Dashboard;
