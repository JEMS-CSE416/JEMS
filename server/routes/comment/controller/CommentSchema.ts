import { Schema, Types } from 'mongoose';

// typescript interface:
export interface Comment {
    commenterId: Types.ObjectId;
    displayName: string;
    mapId: Types.ObjectId;
    content: string;
    creationDate: Date;
}

export const commentSchema = new Schema<Comment>({
    commenterId: { type: Schema.Types.ObjectId, required: true },
    displayName: { type: String, required: true },
    mapId: { type: Schema.Types.ObjectId, required: true },
    content: { type: String, required: true },
    creationDate: { type: Date, required: true }
});
