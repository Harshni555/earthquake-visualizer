import { useEffect } from "react";
import { createRoot } from "react-dom/client";
import L, { LatLng, GeoJSON, Layer } from "leaflet";
import { useMap } from "react-leaflet";
import { useQuery } from "@tanstack/react-query";
import { useShallow } from "zustand/react/shallow";

import PopupContent from "./PopupContent";
import { AppSpinner } from "../../ui/AppSpinner";
import { geojsonMarkerOptions } from "../utils";
import { getEarthquakes } from "../../../api/earthquakes";
import { FeatureProps } from "./models";
import { useStore } from "../../../hooks";

let geojson: GeoJSON;

// ✅ New props for interactivity and filtering
type EarthquakesProps = {
  onSelectQuake?: (quake: any) => void;
  filterMag?: number;
};

export default function Earthquakes({
  onSelectQuake,
  filterMag = 0,
}: EarthquakesProps) {
  const map = useMap();

  const { magnitudePalette, numOfDays, startTime, endTime, searchByTab } =
    useStore(
      useShallow((state) => ({
        magnitudePalette: state.magnitudePalette,
        numOfDays: state.numOfDays,
        startTime: state.startTime,
        endTime: state.endTime,
        searchByTab: state.searchByTab,
      }))
    );

  const { data: earthquakes, isLoading } = useQuery({
    queryKey: ["earthquakes", searchByTab, numOfDays, startTime, endTime],
    queryFn: () =>
      getEarthquakes({ searchByTab, numOfDays, startTime, endTime }),
    staleTime: 120000, // 2min
  });

  useEffect(() => {
    if (!earthquakes) return;

    // remove old layer
    if (map && geojson && map.hasLayer(geojson)) map.removeLayer(geojson);

    // ✅ filter by magnitude
    const filteredFeatures = earthquakes.features.filter(
      (f: FeatureProps) => f.properties.mag >= filterMag
    );

    // ✅ create new GeoJSON layer
    geojson = L.geoJSON(filteredFeatures, {
      onEachFeature: (feature: FeatureProps, layer: Layer) => {
        const {
          properties,
          geometry: { coordinates },
        } = feature;

        // ✅ handle marker click
        layer.on("click", () => {
          if (onSelectQuake) {
            onSelectQuake({
              place: properties.place,
              mag: properties.mag,
              time: properties.time,
              lat: coordinates[1],
              lon: coordinates[0],
            });
          }
        });

        // ✅ popup rendering
        const popupContainer = document.createElement("div");
        createRoot(popupContainer).render(
          <PopupContent properties={properties} coordinates={coordinates} />
        );
        layer.bindPopup(popupContainer);
      },
      pointToLayer: (feature: FeatureProps, latlng: LatLng) => {
        const magnitude = feature.properties.mag;
        return L.circleMarker(
          latlng,
          geojsonMarkerOptions(magnitude, magnitudePalette)
        );
      },
    });

    // ✅ add new layer to map
    if (map) geojson.addTo(map);
  }, [earthquakes, map, magnitudePalette, filterMag, onSelectQuake]);

  if (isLoading) return <AppSpinner size="large" />;

  return null;
}
