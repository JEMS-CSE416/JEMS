const { ObjectId } = require("mongodb");

module.exports = [
  {
    creatorId: new ObjectId("6119dbef8b0915f12c818a37"),
    mapName: "Sample Map 1",
    description: "This is the first sample map",
    creationDate: "2023-11-04T12:00:00Z",
    public: true,
    colorType: "basic",
    displayStrings: true,
    displayNumerics: true,
    displayLegend: true,
    displayPointers: true,
    thumbnail: {
      imageUrl: "https://example.com/thumbnail.jpg",
      imageType: "jpg",
    },
    regions: {
      regionA: [
        {
          regionName: "Region A",
          coordinate: [
            [10, 20],
            [30, 40],
            [50, 60],
          ],
          stringLabel: "Label A",
          stringOffset: [5, 10],
          numericLabel: 100,
          numericUnit: "km",
          color: "#FF0000",
        },
        {
          regionName: "Region A-2",
          coordinate: [
            [15, 25],
            [35, 45],
            [55, 65],
          ],
          stringLabel: "Label A-2",
          stringOffset: [8, 12],
          numericLabel: 120,
          numericUnit: "km",
          color: "#00FF00",
        },
      ],
      regionB: [
        {
          regionName: "Region B",
          coordinate: [
            [100, 200],
            [300, 400],
            [500, 600],
          ],
          stringLabel: "Label B",
          stringOffset: [50, 100],
          numericLabel: 500,
          numericUnit: "km",
          color: "#0000FF",
        },
      ],
    },
    legend: {
      colorLegend: {
        Red: "High",
        Green: "Medium",
        Blue: "Low",
      },
      choroplethLegend: {
        Level1: 100,
        Level2: 200,
        Level3: 300,
      },
    },
  },
  {
    creatorId: new ObjectId("6119dbef8b0915f12c818a37"),
    mapName: "Private Sample Map 1",
    description: "This is the first private sample map",
    creationDate: "2023-11-04T12:00:00Z",
    public: false,
    colorType: "basic",
    displayStrings: true,
    displayNumerics: true,
    displayLegend: true,
    displayPointers: true,
    thumbnail: {
      imageUrl: "https://example.com/thumbnail.jpg",
      imageType: "jpg",
    },
    regions: {
      regionA: [
        {
          regionName: "Region A",
          coordinate: [
            [10, 20],
            [30, 40],
            [50, 60],
          ],
          stringLabel: "Label A",
          stringOffset: [5, 10],
          numericLabel: 100,
          numericUnit: "km",
          color: "#FF0000",
        },
        {
          regionName: "Region A-2",
          coordinate: [
            [15, 25],
            [35, 45],
            [55, 65],
          ],
          stringLabel: "Label A-2",
          stringOffset: [8, 12],
          numericLabel: 120,
          numericUnit: "km",
          color: "#00FF00",
        },
      ],
      regionB: [
        {
          regionName: "Region B",
          coordinate: [
            [100, 200],
            [300, 400],
            [500, 600],
          ],
          stringLabel: "Label B",
          stringOffset: [50, 100],
          numericLabel: 500,
          numericUnit: "km",
          color: "#0000FF",
        },
      ],
    },
    legend: {
      colorLegend: {
        Red: "High",
        Green: "Medium",
        Blue: "Low",
      },
      choroplethLegend: {
        Level1: 100,
        Level2: 200,
        Level3: 300,
      },
    },
  },
  {
    creatorId: new ObjectId("6119dbef8b0915f12c818a39"),
    mapName: "Sample Map 3",
    description: "This is a third sample map",
    creationDate: "2023-11-05T12:30:00Z",
    public: true,
    colorType: "gradient",
    displayStrings: false,
    displayNumerics: true,
    displayLegend: false,
    displayPointers: true,
    thumbnail: {
      imageUrl: "https://example.com/thumbnail3.png",
      imageType: "png",
    },
    regions: {
      regionA: [
        {
          regionName: "Region E",
          coordinate: [
            [210, 310],
            [410, 510],
            [610, 710],
          ],
          numericLabel: 500,
          numericUnit: "feet",
          color: "#0000FF",
        },
      ],
      regionB: [
        {
          regionName: "Region F",
          coordinate: [
            [220, 320],
            [420, 520],
            [620, 720],
          ],
          numericLabel: 600,
          numericUnit: "feet",
          color: "#FF00FF",
        },
      ],
      legend: {
        choroplethLegend: {
          Level1: 2,
          Level2: 3,
          Level3: 4,
        },
      },
    },
  },
  {
    creatorId: new ObjectId("6119dbef8b0915f12c818a3a"),
    mapName: "Sample Map 4",
    description: "This is a fourth sample map",
    creationDate: "2023-11-05T15:45:00Z",
    public: false,
    colorType: "gradient",
    displayStrings: true,
    displayNumerics: false,
    displayLegend: true,
    displayPointers: false,
    thumbnail: {
      imageUrl: "https://example.com/thumbnail4.jpg",
      imageType: "jpg",
    },
    regions: {
      regionA: [
        {
          regionName: "Region G",
          coordinate: [
            [310, 410],
            [510, 610],
            [710, 810],
          ],
          stringLabel: "Label G",
          stringOffset: [35, 40],
          color: "#00FFFF",
        },
      ],
      regionB: [
        {
          regionName: "Region H",
          coordinate: [
            [320, 420],
            [520, 620],
            [720, 820],
          ],
          stringLabel: "Label H",
          stringOffset: [38, 42],
          color: "#FFFF00",
        },
      ],
    },
    legend: {
      colorLegend: {
        Cyan: "North",
        Yellow: "South",
      },
    },
  },
  {
    creatorId: new ObjectId("6119dbef8b0915f12c818a3b"),
    mapName: "Sample Map 5",
    description: "This is a fifth sample map",
    creationDate: "2023-11-05T18:15:00Z",
    public: true,
    colorType: "choropleth",
    displayStrings: false,
    displayNumerics: false,
    displayLegend: true,
    displayPointers: true,
    thumbnail: {
      imageUrl: "https://example.com/thumbnail5.png",
      imageType: "png",
    },
    regions: {
      regionA: [
        {
          regionName: "Region I",
          coordinate: [
            [410, 510],
            [610, 710],
            [810, 910],
          ],
          color: "#FF0000",
        },
      ],
      regionB: [
        {
          regionName: "Region J",
          coordinate: [
            [420, 520],
            [620, 720],
            [820, 920],
          ],
          color: "#00FF00",
        },
      ],
    },
    legend: {
      choroplethLegend: {
        Level1: 500,
        Level2: 1000,
        Level3: 1500,
      },
    },
  },
];
