import React from "react";
import MapView, { Marker } from "react-native-maps";

interface MapComponentProps {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
  title: string;
  description: string;
}

const MapComponent: React.FC<MapComponentProps> = ({
  latitude,
  longitude,
  latitudeDelta,
  longitudeDelta,
  title,
  description,
}) => {
  return (
    <MapView
      style={{ height: 300 }}
      initialRegion={{
        latitude,
        longitude,
        latitudeDelta,
        longitudeDelta,
      }}
    >
      <Marker
        coordinate={{ latitude, longitude }}
        title={title}
        description={description}
      />
    </MapView>
  );
};

export default MapComponent;
