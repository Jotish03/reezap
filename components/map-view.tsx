import React from "react";
import { View } from "react-native";
import Mapbox from "@rnmapbox/maps";

Mapbox.setAccessToken(
  "sk.eyJ1IjoicmVlemFwZGV2IiwiYSI6ImNsd2diY2F1ZzAxc2sya3BsNG14aDZzOGYifQ.ivK9oFTKpLD9SRK75ns3iQ"
);

const MapViewComponent = () => {
  return (
    <View className="flex-1 mb-4 ">
      <View className="h-full w-full ">
        <Mapbox.MapView className="flex-1 " />
      </View>
    </View>
  );
};

export default MapViewComponent;
