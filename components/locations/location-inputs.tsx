import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import * as Location from "expo-location";

interface LocationInputsProps {
  onCurrentLocationChange: (location: Location.LocationObject) => void;
  onDestinationChange: (destination: string) => void;
}

const LocationInputs: React.FC<LocationInputsProps> = ({
  onCurrentLocationChange,
  onDestinationChange,
}) => {
  const [currentLocation, setCurrentLocation] = useState("");
  const [destination, setDestination] = useState("");

  const handleCurrentLocationChange = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access location was denied");
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      onCurrentLocationChange(location);

      const reverseGeocodeData = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      if (reverseGeocodeData?.length > 0) {
        const formattedLocation =
          reverseGeocodeData[0].name || "Location Name Not Available";
        setCurrentLocation(formattedLocation);
      } else {
        setCurrentLocation("Unable to retrieve location");
      }
    } catch (error) {
      console.error("Error getting current location:", error);
    }
  };

  return (
    <View className="justify-center items-center px-4 bg-white">
      <View className="w-full mb-4">
        <TextInput
          className="h-12 px-4 border font-intersemibold border-gray-300 rounded-md"
          placeholder="Pin your current location"
          value={currentLocation}
          onChangeText={setCurrentLocation}
          onFocus={handleCurrentLocationChange}
        />
      </View>
      <View className="w-full">
        <TextInput
          className="h-12 px-4 border font-intersemibold border-gray-300 rounded-md"
          placeholder="Enter your Destination"
          value={destination}
          onChangeText={(text) => {
            setDestination(text);
            onDestinationChange(text);
          }}
        />
      </View>
      <TouchableOpacity className="bg-primary p-4 rounded-lg mt-4 w-full">
        <Text className="text-white font-bold text-center">Find your Ride</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LocationInputs;
