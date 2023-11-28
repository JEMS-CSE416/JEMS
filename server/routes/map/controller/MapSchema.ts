import { Schema , Types} from 'mongoose';

// Document interface
interface Image {
    imageUrl: string;
    imageType: string;
}

interface Legend {
    colorLegend: { [key: string]: string };
    choroplethLegend: { [key: string]: Number };
}

interface Region {
    regionName: string;
    coordinates: Types.Array<Types.Array<Number>>;
    stringLabel: string;
    stringOffset: Types.Array<Number>;
    numericLabel: Number;
    numericUnit: string;
    color: string;
}

export interface Map {
  creatorId: Types.ObjectId;
  mapName: string;
  description: string;
  creationDate: Date;
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

// Schema
const imageSchema = new Schema<Image>({
    imageUrl: {type: String},
    imageType: {type: String}
})

const regionSchema = new Schema<Region>({
    regionName: {type: String},
    coordinates: {type: [[Number]], required: true},
    stringLabel: {type: String},
    stringOffset:  {type: [Number]},
    numericLabel: {type: Number},
    numericUnit: {type: String},
    color: {type: String},
})

const legendSchema = new Schema<Legend>({
   colorLegend: {type: Map, of: String, required: true},
   choroplethLegend: {type: Map, of: Number, required: true},
})

export const mapSchema = new Schema<Map>({
    creatorId: {type: Schema.Types.ObjectId, required: true},
    mapName: {type: String, required: true},
    description: {type: String, required: true},
    creationDate: {type: Date, required: true},
    public: {type: Boolean, required: true},
    colorType: {type: String},
    displayStrings: {type: Boolean},
    displayNumerics: {type: Boolean},
    displayLegend: {type: Boolean},
    displayPointers: {type: Boolean},
    thumbnail: {type: imageSchema},
    regions: {type: {}, of: [regionSchema]},
    legend: {type: legendSchema},
});
