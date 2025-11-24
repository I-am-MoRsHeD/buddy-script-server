import { model, Schema } from "mongoose";
import { IUser } from "./auth.interface";



const userSchema = new Schema<IUser>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
        type: String,
        default: "USER"
    },
}, {
    versionKey: false,
    timestamps: true
});



export const User = model<IUser>('User', userSchema);