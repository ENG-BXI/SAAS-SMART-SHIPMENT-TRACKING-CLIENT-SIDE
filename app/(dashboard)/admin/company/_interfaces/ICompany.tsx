import z from 'zod';
import {CreateCompanyFormSchema, EditCompanyFormSchema, companyFormSchema} from '../_schemas/companyForm';

export type ICompany = z.infer<typeof companyFormSchema>;
export type ICreateCompany = z.infer<typeof CreateCompanyFormSchema>;
export type IEditCompany = z.infer<typeof EditCompanyFormSchema>;
