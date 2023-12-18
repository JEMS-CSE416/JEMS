import { handleKml, handleZip, handleShp, geoJsonConvert } from "./geojson-convert";
import { formatDistanceToNow } from "date-fns";

export interface FileInfo {
    fileType: string;
    fileContent: string | undefined;
}

export const initialFileInfo: FileInfo = {
    fileType: '',
    fileContent: undefined
};

// Function to get the file type (eg. json, geojson, shp, etc.)
export function getFileType(fileName: string): string {
    const fileExtension = fileName.split('.').pop();
    if (fileExtension === undefined) {
        return '';
    }
    return fileExtension.toLowerCase();
}

// This is the list of accepted map file types
export const MAP_TYPES = {
    'application/json': ['.json'],
    'application/geo+json': ['.geojson'],
    'application/vnd.google-earth.kml+xml': ['.kml'],
    'application/octet-stream': ['.shp', '.dbf'],
    'application/zip': ['.zip'],
}

// This function parses and grabs regions properties from GeoJSON
export const getRegions = (geojson: any) => {
    let regions = [] as any[];
    if (geojson && geojson.features) {
        let counter = 0;

        geojson.features.forEach((feature: any) => {
            // switchcase that will convert different features in different ways
            switch (feature.geometry.type) {
                case "Polygon":
                    regions.push({
                        regionName: feature.properties.name || feature.properties.NAME,
                        coordinates: feature.geometry.coordinates[0],
                        stringLabel: "",
                        stringOffset: [0],
                        numericLabel: "",
                        numericUnit: "",
                        color: "#8eb8fa", // default color
                    })
                    break;
                case "MultiPolygon":
                    feature.geometry.coordinates.forEach((coordinates: any) => {
                        regions.push({
                            regionName: feature.properties.name || feature.properties.NAME,
                            coordinates: coordinates[0],
                            stringLabel: "",
                            stringOffset: [0],
                            numericLabel: "",
                            numericUnit: "",
                            color: "#8eb8fa", // default color
                        })
                    })
                    break;
                case "GeometryCollection":
                    feature.geometry.geometries.forEach((geometry: any) => {
                        regions.push({
                            regionName: "untitled region " + counter++,
                            coordinates: geometry.coordinates[0],
                            stringLabel: "",
                            stringOffset: [0],
                            numericLabel: "",
                            numericUnit: "",
                            color: "#8eb8fa", // default color
                        })
                    })

                    break;
                default:
                    console.log("unsupported type:", feature);
            }

        });
    }
    return regions;
}

// This function gets the color type based on the template
export const getColorType = (template: string) => {
    switch (template) {
        case "Color Label Map":
            return "COLOR";
        case "Choropleth Map":
            return "CHOROPLETH";
        default:
            return "NONE";
    }
}


// This function handles the conversion based on the file type
export const handleFileConversion = async (file: File) => {
    if (file) {
        try {
            // Get the file extension
            let fileExtension = getFileType(file.name);
            let geojson;
            // Check the file type and handle accordingly
            if (fileExtension === "kml") {
                // Convert KML to GeoJSON
                geojson = await handleKml(file);
            } else if (fileExtension === "zip") {
                // Handle ZIP file
                geojson = await handleZip(file);
            } else if (fileExtension === "shp") {
                // Handle ZIP file
                geojson = await handleShp(file);
            } else {
                // Convert to GeoJSON
                geojson = await geoJsonConvert(file);
            }
            return geojson;
        } catch (error) {
            // Log any errors
            console.log(error);
        }
    }
};

// splices the createdAt string to show how long ago was it made.
// for example: 2023-10-16T21:46:26.858+00:00 -> Created 5 minutes ago
export function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const formattedDate = formatDistanceToNow(date, { addSuffix: true });
    return `Created ${formattedDate}`;
}
