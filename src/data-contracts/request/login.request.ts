import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, "The password must be at least 6 characters."),
}).strict();

export type loginUser = z.infer<typeof loginSchema>;
