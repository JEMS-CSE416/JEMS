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
  creatorId: string;
  mapName: string;
  description: string;
  public: boolean;
  colorType: string;
  displayStrings: boolean;
  displayNumerics: boolean;
  displayLegend: boolean;
  displayPointers: boolean;
  thumbnail: Image;
  regions: { [key: string]: Region[] };
  legend: Legend;
}

export const ErrorMap = {
    "creatorId": "652daf32e2225cdfeceea17f",
    "mapName": "ERROR/TEST Map",
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
