import z from 'zod';

const pointSchema = z.object({
  name: z.string().min(1, 'اسم النقطة مطلوب'),
  order: z.coerce.number().min(1, 'ترتيب النقطة مطلوب')
});
export const waySchema = z.object({
  name: z.string().min(1, 'اسم العميل مطلوب'),
  points: z.array(pointSchema).min(1, 'النقاط مطلوبة')
});
export type pointFormData = z.infer<typeof pointSchema>;
export type wayFormData = z.infer<typeof waySchema>;
