import { z } from 'zod';

export const createTodoSchema = z.object({
  title: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  isCompleted: z.boolean().default(false),
  dueDate: z.preprocess(
    (val) => (typeof val === "string" || val instanceof Date ? new Date(val) : val),
    z.date()
  ),
}).strict();

export type createTodo = z.infer<typeof createTodoSchema>;

