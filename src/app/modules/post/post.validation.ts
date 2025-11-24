import z from "zod";
import { Privacy } from "./post.interface";


export const createPostZodSchema = z.object({
    description: z
        .string({ error: "Description must be string" })
        .min(2, { message: "Description must be at least 2 characters long." })
        .max(5000, { message: "Description cannot exceed 5000 characters." }).optional(),
    imageUrl: z.
        string().optional(),
    privacy: z.
        enum(Object.values(Privacy) as [string])
        .optional()
});