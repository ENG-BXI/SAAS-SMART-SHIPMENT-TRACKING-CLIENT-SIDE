import z from 'zod';

export const loginSchema = z.object({
  email: z.email('الرجاء إدخال بريد إلكتروني صحيح').min(1, 'الرجاء إدخال بريد إلكتروني'),
  password: z.string().min(1, 'الرجاء إدخال كلمة المرور').min(6, 'كلمة المرور يجب أن تكون 6 أحرف على الأقل')
});

export type loginFormData = z.infer<typeof loginSchema>;
