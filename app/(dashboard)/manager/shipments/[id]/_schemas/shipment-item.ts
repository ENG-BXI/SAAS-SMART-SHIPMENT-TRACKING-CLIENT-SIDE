import z from 'zod';
const shipmentItem = z.object({
  item: z.string().min(1, 'الغرض مطلوب'),
  quantity: z.coerce.number<number>().min(1, 'الكمية يجب ان تكون اكبر من صفر'),
  isBreakable: z.string()
});
export const shipmentItems = z.object({
  personName: z.string().min(1, 'اسم العميل مطلوب'),
  items: z.array(shipmentItem).min(1, 'يجب اضافة غرض واحد على الاقل')
});
export type shipmentItemFormData = z.infer<typeof shipmentItems>;
