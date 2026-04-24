import {z} from 'zod';
export const shipmentSchema = z
  .object({
    shipmentNumber: z.string().min(1, 'رقم الشحنة مطلوب'),
    wayId: z.string().min(1, 'المسار مطلوب'),
    driverId: z.string().min(1, 'سائق الشحنة مطلوب'),
    launchDate: z.date()
  })
  .superRefine((data, ctx) => {
    if (data.wayId === '0') {
      ctx.addIssue({
        code: 'custom',
        message: 'المسار مطلوب',
        path: ['way']
      });
    }
    if (data.driverId === '0') {
      ctx.addIssue({
        code: 'custom',
        message: 'سائق الشحنة مطلوب',
        path: ['driverId']
      });
    }
  });
export type shipmentFormData = z.infer<typeof shipmentSchema>;
