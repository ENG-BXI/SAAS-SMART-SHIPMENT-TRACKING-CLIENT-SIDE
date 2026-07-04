import z from 'zod';

const pointSchema = z.object({
  name: z.string().min(1, 'اسم النقطة مطلوب'),
  order: z.coerce.number<number>().min(1, 'ترتيب النقطة مطلوب'),
  id: z.string().optional(),
  lat: z.coerce.number<number>().optional(),
  lng: z.coerce.number<number>().optional()
});
export const waySchema = z
  .object({
    name: z.string().min(1, 'اسم العميل مطلوب'),
    points: z.array(pointSchema).min(1, 'النقاط مطلوبة'),
    showMapLocation: z.coerce.boolean<boolean>()
  })
  .refine(
    data => {
      if (!data.showMapLocation) return true;

      return data.points.every(p => p.lat != null && p.lng != null);
    },
    {
      error: 'كل نقطة لازم يكون لها موقع على الخريطة',
      path: ['points']
    }
  );
export type pointFormData = z.infer<typeof pointSchema>;
export type wayFormData = z.infer<typeof waySchema>;
