import {
  clusterCountLayer,
  clusterLayer,
  unclusteredPointLayer,
} from "@/constants/map";
import { config } from "@/helpers/config/envConfig";
import { ILocation } from "@/types";
import { Button } from "antd";
import React, { useCallback, useState } from "react";
import Map, { Layer, Marker, Source } from "react-map-gl";

interface MapContainerProps {
  location?: ILocation;
  zoom?: number;
}

const locationData = {
  latitude: 41.902782,
  longitude: 12.496366,
};

const MapView = ({ location = locationData, zoom }: MapContainerProps) => {
  const [isSatelliteMode, setIsSatelliteMode] = useState<boolean>(false);

  const mapStyle = `mapbox://styles/mapbox/${
    isSatelliteMode ? "satellite-streets" : "streets"
  }-v11`;

  const [settings, setSettings] = useState({
    scrollZoom: true,
    boxZoom: true,
    dragRotate: true,
    dragPan: true,
    keyboard: true,
    doubleClickZoom: true,
    touchZoomRotate: true,
    touchPitch: true,
    minZoom: 0,
    maxZoom: 20,
    minPitch: 0,
    maxPitch: 85,
  });

  // const updateSettings = useCallback(
  //   (name: string, value: string) =>
  //     setSettings((s) => ({
  //       ...s,
  //       [name]: value,
  //     })),
  //   []
  // );

  const initialViewState = {
    ...location,
    zoom: zoom || 0,
    bearing: 0,
    pitch: 50,
  };

  return (
    <div className="relative" aria-label="map container">
      <Map
        initialViewState={initialViewState}
        {...settings}
        mapStyle={mapStyle}
        mapboxAccessToken={config.mapbox_token}
        style={{ height: 300 }}
        aria-label="map container"
      >
        <Source
          id="earthquakes"
          type="geojson"
          data="https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson"
          cluster={true}
          clusterMaxZoom={14}
          clusterRadius={50}
        >
          <Layer {...clusterLayer} />
          <Layer {...clusterCountLayer} />
          <Layer {...unclusteredPointLayer} />
        </Source>
      </Map>
      <Button
        onClick={() => setIsSatelliteMode(!isSatelliteMode)}
        type="primary"
        className="pb-4 rounded-none absolute bottom-0 right-0"
        ghost={isSatelliteMode}
      >
        <span className="text-[#303030] hover:text-white font-semibold">
          {isSatelliteMode ? "Normal Mode" : "Satellite Mode"}
        </span>
      </Button>
    </div>
  );
};

export default MapView;
