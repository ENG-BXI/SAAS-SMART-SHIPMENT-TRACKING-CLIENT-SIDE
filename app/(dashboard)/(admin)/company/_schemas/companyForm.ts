import z from 'zod';
export const companyFormSchema = z.object({
  name: z.string().min(3, {message: 'الاسم يجب ان يحتوي على 3 حروف على الأقل'}).max(100, {message: 'الاسم يجب ان يحتوي على 100 حروف على الأكثر'}),
  location: z.string().min(3, {message: 'الاسم يجب ان يحتوي على 3 حروف على الأقل'}).max(100, {message: 'الاسم يجب ان يحتوي على 100 حروف على الأكثر'}),
  companyEmail: z.email({message: 'البريد الالكتروني غير صحيح'})
});

export const CreateCompanyFormSchema = companyFormSchema
  .extend({
    companyPassword: z.string().min(8, {message: 'كلمة السر يجب ان يحتوي على 8 حروف على الأقل'}).max(100, {message: 'كلمة السر يجب ان يحتوي على 100 حروف على الأكثر'}),
    confirmPassword: z.string().min(8, {message: 'كلمة السر يجب ان يحتوي على 8 حروف على الأقل'}).max(100, {message: 'كلمة السر يجب ان يحتوي على 100 حروف على الأكثر'})
  })
  .refine(val => val.companyPassword == val.confirmPassword, {
    error: 'كلمة السر وتاكيد كلمة السر غير متطابقتان',
    path: ['confirmPassword']
  });
export const EditCompanyFormSchema = companyFormSchema.extend({
  companyPassword: z.string().min(8, {message: 'كلمة السر يجب ان يحتوي على 8 حروف على الأقل'}).max(100, {message: 'كلمة السر يجب ان يحتوي على 100 حروف على الأكثر'}).optional()
});
