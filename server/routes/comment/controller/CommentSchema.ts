import { Schema, Types } from 'mongoose';

// typescript interface:
export interface Comment {
    displayName: string;
    mapId: Types.ObjectId;
    content: string;
    creationDate: Date;
}

export const commentSchema = new Schema<Comment>({
    displayName: { type: String, required: true },
    mapId: { type: Schema.Types.ObjectId, required: true },
    content: { type: String, required: true },
    creationDate: { type: Date, required: true }
});
