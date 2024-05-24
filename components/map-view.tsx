import React, { useState, useEffect, useRef } from "react";
import { View } from "react-native";
import Mapbox, {
  StyleURL,
  UserLocation,
  MapView,
  Camera,
} from "@rnmapbox/maps";
import * as Location from "expo-location";

Mapbox.setAccessToken(
  "sk.eyJ1IjoicmVlemFwZGV2IiwiYSI6ImNsd2diY2F1ZzAxc2sya3BsNG14aDZzOGYifQ.ivK9oFTKpLD9SRK75ns3iQ"
);

const MapViewComponent = () => {
  const [userLocation, setUserLocation] =
    useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const cameraRef = useRef<Camera | null>(null);

  useEffect(() => {
    const requestLocationPermission = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
          return;
        }

        const location = await Location.getCurrentPositionAsync({});
        setUserLocation(location);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setErrorMsg("Error getting location: " + error.message);
        } else {
          setErrorMsg("An unknown error occurred");
        }
      }
    };

    requestLocationPermission();
  }, []);

  useEffect(() => {
    if (userLocation && cameraRef.current) {
      cameraRef.current.setCamera({
        centerCoordinate: [
          userLocation.coords.longitude,
          userLocation.coords.latitude,
        ],
        zoomLevel: 16,
        pitch: 0,
        heading: 0,
      });
    }
  }, [userLocation]);

  return (
    <View style={{ flex: 1 }} className="bg-white">
      <Mapbox.MapView
        style={{ flex: 1, marginBottom: 20 }}
        styleURL={StyleURL.Street}
        zoomEnabled={true}
      >
        <Camera ref={cameraRef} />
        {userLocation && (
          <UserLocation
            onUpdate={(location) => {
              setUserLocation({
                ...location,
                coords: {
                  ...location.coords,
                  altitudeAccuracy: 0,
                  altitude: location.coords.altitude ?? null,
                  accuracy: location.coords.accuracy ?? null,
                  heading: location.coords.heading ?? null,
                  speed: location.coords.speed ?? null,
                },
                timestamp: location.timestamp ?? Date.now(),
              });
            }}
          />
        )}
      </Mapbox.MapView>
    </View>
  );
};

export default MapViewComponent;
