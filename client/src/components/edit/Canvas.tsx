import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Legend from "./Legend";
import { useEditContext } from "../../context/EditContextProvider";

export default function Canvas() {
  const editPageState = useEditContext();
  console.log(editPageState, "remove me");

  // Convert JEMS JSON to GeoJSON
  function convertToGeoJSON(jemsJSON: any): string {
    const geoJSON: any = {
      type: "FeatureCollection",
      features: [],
    };

    for (const group in jemsJSON.regions) {
      const regionGroup = jemsJSON.regions[group];
      console.log(regionGroup)
      regionGroup.forEach((region: any) => {
        const feature: any = {
          type: "Feature",
          properties: {
            name: region.regionName,
            stringLabel: region.stringLabel,
            stringOffset: region.stringOffset,
            numericLabel: region.numericLabel,
            numericUnit: region.numericUnit,
            color: region.color,
          },
          geometry: {
            type: "Polygon",
            coordinates: [region.coordinates],
          },
        };

        geoJSON.features.push(feature);
      });
    }

    return JSON.stringify(geoJSON);
  }

  const convertedGeoJSON = convertToGeoJSON(editPageState.map);
  console.log("====================================================")
  console.log(JSON.parse(convertedGeoJSON));

  return (
    <>
      <MapContainer
        center={[23.6978, 120.9605]}
        zoom={5}
        style={{
          width: "100%",
          height: "calc(100Vh - 60px)",
          zIndex: 125
        }}
      >
        <TileLayer
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <GeoJSON data={JSON.parse(convertedGeoJSON)} />
        <Legend />
      </MapContainer>
    </>
  )
}

