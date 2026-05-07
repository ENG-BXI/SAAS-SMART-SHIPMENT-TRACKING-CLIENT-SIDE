import {enUserRole} from '@/lib/Constant/user-role';
import z from 'zod';

export const userSchema = z.object({
  name: z.string().min(1, 'اسم المستخدم مطلوب'),
  email: z.string().email('البريد الالكتروني غير صحيح').min(1, 'البريد الالكتروني مطلوب'),
  role: z.enum(enUserRole)
});

export const createUserSchema = userSchema.extend({
  password: z.string().min(8, 'كلمة المرور يجب ان تكون 8 احرف على الاقل')
});
export const editUserSchema = userSchema.extend({
  password: z.string().optional()
});

export type userFormData = z.infer<typeof userSchema>;
export type createUserFormData = z.infer<typeof createUserSchema>;
export type editUserFormData = z.infer<typeof editUserSchema>;
