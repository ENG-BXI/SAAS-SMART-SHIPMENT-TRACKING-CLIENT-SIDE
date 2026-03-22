import z from 'zod';

export const noteSchema = z.object({
  createdDate: z.string().min(1, 'تاريخ الانشاء مطلوب'),
  type: z.string().min(1, 'نوع الملاحظة مطلوب'),
  note: z.string().optional()
});

export type noteFormData = z.infer<typeof noteSchema>;
