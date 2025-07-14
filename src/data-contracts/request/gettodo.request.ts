import { z } from 'zod';

export const getTodoSchema = z.object({
    pageSize: z.number().min(1, 'Page size is required'),
    pageIndex: z.number().default(0),
    searchString: z.string().default(""),
}).strict();

export type getTodo = z.infer<typeof getTodoSchema>;
