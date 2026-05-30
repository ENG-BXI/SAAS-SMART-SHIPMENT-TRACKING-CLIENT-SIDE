import z from 'zod';

export const subscriptionTypeSchema = z.object({
  type: z.string().min(3, {message: 'نوع الباقة يجب ان يحتوي على 3 حروف على الأقل'}).max(100, {message: 'نوع الباقة يجب ان لا يتجاوز 100 حرف'}),
  price: z.coerce.number<number>({message: 'السعر يجب ان يكون رقم'}).positive({message: 'السعر يجب ان يكون أكبر من صفر'}),
  durationByMonth: z.coerce.number<number>({message: 'مدة الاشتراك يجب ان تكون رقم'}).int({message: 'مدة الاشتراك يجب ان تكون رقم صحيح'}).positive({message: 'مدة الاشتراك يجب ان تكون أكبر من صفر'})
});

export type SubscriptionTypeFormData = z.infer<typeof subscriptionTypeSchema>;
