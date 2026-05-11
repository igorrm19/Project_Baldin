const { z } = require("zod");

const userSchema = z.object({
    name: z.string()
        .min(1, "Name and surname are required")
        .max(100, "Name and surname are too long")
        .trim()
        .transform((val: string) => val.toLowerCase()),
    
    email: z.string()
        .email("Invalid email address")
        .trim()
        .toLowerCase(),
    
    password: z.string()
        .min(8, "Password must be at least 8 characters long")
});

const updateUserSchema = userSchema.partial();

export { userSchema, updateUserSchema };