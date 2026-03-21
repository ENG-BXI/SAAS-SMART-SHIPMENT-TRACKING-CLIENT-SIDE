import {z} from 'zod';
export const shipmentSchema = z
  .object({
    shipmentNumber: z.string().min(1, 'رقم الشحنة مطلوب'),
    way: z.string().min(1, 'المسار مطلوب'),
    shipmentDriver: z.string().min(1, 'سائق الشحنة مطلوب')
  })
  .superRefine((data, ctx) => {
    if (data.way === '0') {
      ctx.addIssue({
        code: 'custom',
        message: 'المسار مطلوب',
        path: ['way']
      });
    }
    if (data.shipmentDriver === '0') {
      ctx.addIssue({
        code: 'custom',
        message: 'سائق الشحنة مطلوب',
        path: ['shipmentDriver']
      });
    }
  });
export type shipmentFormData = z.infer<typeof shipmentSchema>;
