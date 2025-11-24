import z from "zod";



export const createCommentZodSchema = z.object({
    description: z
        .string({ error: "Description must be string" })
        .min(2, { message: "Description must be at least 2 characters long." })
        .max(5000, { message: "Description cannot exceed 5000 characters." }),
    post_id: z.string()
});