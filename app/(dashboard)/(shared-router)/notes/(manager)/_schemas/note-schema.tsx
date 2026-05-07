import z from 'zod';

export const noteSchema = z.object({
  type: z.string().min(1, 'نوع الملاحظة مطلوب'),
  text: z.string().optional()
});

export type noteFormData = z.infer<typeof noteSchema>;
