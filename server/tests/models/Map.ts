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
  regions: { [key: string]: Types.Array<Region> };
  legend: Legend;
}

// Schema
const imageSchema = new Schema<Image>({
    imageUrl: {type: String, required: true},
    imageType: {type: String, required: true}
})

const regionSchema = new Schema<Region>({
    regionName: {type: String, required: true},
    coordinates: {type: [[Number]], required: true},
    stringLabel: {type: String, required: true},
    stringOffset:  {type: [Number], required: true},
    numericLabel: {type: Number, required: true},
    numericUnit: {type: String, required: true},
    color: {type: String, required: true},
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
    colorType: {type: String, required: true},
    displayStrings: {type: Boolean, required: true},
    displayNumerics: {type: Boolean, required: true},
    displayLegend: {type: Boolean, required: true},
    displayPointers: {type: Boolean, required: true},
    thumbnail: {type: imageSchema, required: true},
    regions: {type: Map, of: [regionSchema], required: true},
    legend: {type: legendSchema, required: true},
});