
// Convert JEMS JSON to GeoJSON
export function convertToGeoJSON(jemsJSON: any): string {
  const geoJSON: any = {
    type: "FeatureCollection",
    features: [],
  };

  for (const group in jemsJSON.regions) {
    const regionGroup = jemsJSON.regions[group];
    console.log(regionGroup)
    regionGroup.forEach((region: any, i: number) => {
      const feature: any = {
        type: "Feature",
        properties: {
          groupName: group,
          i: i,
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
