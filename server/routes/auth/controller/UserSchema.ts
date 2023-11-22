import { Schema } from 'mongoose';

// typescript interface:
export interface User {
    email: string;
    displayName: string;
    password: string;
    activeUntil: Date;
}

export const userSchema = new Schema<User>({
    email: { type: String, required: true },
    displayName: { type: String, required: true },
    activeUntil: { type: Date, required: true },
    password: { type: String, required: true }
});
