import z from 'zod';

const contactWaySchema = z.object({
  text: z.string().min(1, 'طريقة التواصل مطلوبة'),
  contactType: z.enum(['phoneNumber', 'email']),
  isPrimary: z.string().min(1, 'هل هو اساسي مطلوب')
});
export const clientSchema = z.object({
  name: z.string().min(1, 'اسم العميل مطلوب'),
  contactWays: z.array(contactWaySchema).min(1, 'طرق التواصل مطلوبة')
});
export type clientFormData = z.infer<typeof clientSchema>;
