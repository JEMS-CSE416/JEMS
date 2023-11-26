import { Types } from "mongoose";

// Document interface
export interface Image {
    imageUrl: string;
    imageType: string;
}

export interface Legend {
    colorLegend: { [key: string]: string };
    choroplethLegend: { [key: string]: Number };
}

export interface Region {
    regionName: string;
    coordinates: Number[][]
    stringLabel: string;
    stringOffset: Number[];
    numericLabel: Number;
    numericUnit: string;
    color: string;
}

export interface Map {
    _id: string;
    creatorId: string;
    mapName: string;
    description: string;
    creationDate: string;
    public: boolean;
    colorType: string;
    displayStrings: boolean;
    displayNumerics: boolean;
    displayLegend: boolean;
    displayPointers: boolean;
    thumbnail: Image;
    regions: { [key: string]: Region[] };
    legend: Legend;
    visibility?: string;
  }

export const ErrorMap = {
    "_id": "ERROR/TEST Map",
    "creatorId": "652daf32e2225cdfeceea17f",
    "mapName": "ERROR/TEST Map",
    "creationDate": "2021-04-01T00:00:00.000Z",
    "description": "This map is a testing map. See either in an error or in a testing/hard-coded version of code.",
    "public": true,
    "colorType": "Color",
    "displayStrings": true,
    "displayNumerics": true,
    "displayLegend": true,
    "displayPointers": true,
    "thumbnail": {
        "imageUrl": "dummyUrl.com",
        "imageType": "jpg"
    },
    "regions": {
        "testGroup1": [
            {
                "regionName": "dummyName1",
                "coordinates": [
                    [
                        0,
                        0
                    ],
                    [
                        1,
                        1
                    ]
                ],
                "stringLabel": "dummyLabel",
                "stringOffset": [
                    0,
                    0
                ],
                "numericLabel": 0,
                "numericUnit": "dummyUnit",
                "color": "#eeeeee"
            },
            {
                "regionName": "dummyName2",
                "coordinates": [
                    [
                        0,
                        0
                    ],
                    [
                        1,
                        1
                    ]
                ],
                "stringLabel": "dummyLabel",
                "stringOffset": [
                    0,
                    0
                ],
                "numericLabel": 0,
                "numericUnit": "dummyUnit",
                "color": "#eeeeee"
            }
        ],
        "testGroup2": [
            {
                "regionName": "dummyName1",
                "coordinates": [
                    [
                        0,
                        0
                    ],
                    [
                        1,
                        1
                    ]
                ],
                "stringLabel": "dummyLabel",
                "stringOffset": [
                    0,
                    0
                ],
                "numericLabel": 0,
                "numericUnit": "dummyUnit",
                "color": "#eeeeee"
            },
            {
                "regionName": "dummyName2",
                "coordinates": [
                    [
                        0,
                        0
                    ],
                    [
                        1,
                        1
                    ]
                ],
                "stringLabel": "dummyLabel",
                "stringOffset": [
                    0,
                    0
                ],
                "numericLabel": 0,
                "numericUnit": "dummyUnit",
                "color": "#eeeeee"
            }
        ]
    },
    "legend": {
        "colorLegend": {
            "#000000": "black",
            "#ffffff": "white"
        },
        "choroplethLegend": {
            "#000000": 0,
            "#ffffff": 10
        }
    }
}
