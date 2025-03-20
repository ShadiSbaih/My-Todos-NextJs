 import {z} from 'zod';
 
 
 export const todoFormSchema = z.object({
    title: z
      .string()
      .min(5, {
        message: "Todo Title must be at least 5 characters.",
      })
      .max(30, {
        message: "Todo Title must not be longer than 30 characters.",
      }),
    body: z
      .string()
      .max(200, {
        message: "Todo body must not be longer than 200 characters.",
      })
      .optional(),
     completed: z.boolean().optional(),
  });

 export type TodoFormValues = z.infer<typeof todoFormSchema>;