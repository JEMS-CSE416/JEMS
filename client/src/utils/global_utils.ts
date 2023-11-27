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