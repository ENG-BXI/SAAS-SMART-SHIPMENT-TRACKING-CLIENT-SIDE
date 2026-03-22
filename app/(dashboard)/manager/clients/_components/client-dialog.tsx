import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { clientFormData, clientSchema } from "../_schemas/clientSchema";
import { Button } from "@/components/ui/button";
import { ArrowRight, File, PlusCircle } from "lucide-react";
import { FieldGroup } from "@/components/ui/field";
import CustomSelect from "@/components/custom-select";
import CustomButton from "@/components/custom-button";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomInput from "@/components/custom-input";

interface ClientDialogProps {
  type: 'add' | 'edit';
  id?: string;
  triggerTitle: string;
  data?: clientFormData;
}
function getTitle(type: 'add' | 'edit') {
  switch (type) {
    case 'add':
      return 'إضافة عميل جديد';
    case 'edit':
      return 'تعديل بيانات العميل';
  }
}
function getDescription(type: 'add' | 'edit') {
  switch (type) {
    case 'add':
      return 'تسجيل عميل جديد وإضافة وسائل التواصل المعتمدة لإشعارات الشحن.';
    case 'edit':
      return 'تعديل بيانات العميل المسجل مسبقًا وإضافة وسائل التواصل المعتمدة لإشعارات الشحن.';
  }
}
function onSubmit() {
  console.log('submit');
}
function ClientDialog(props: ClientDialogProps) {
  const {
    control,
    handleSubmit,
    formState: {errors}
  } = useForm<clientFormData>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      name: props.data?.name || '',
      contactWays: props.data?.contactWays || [{contactWay: '', contactType: 'phoneNumber', isPrimary: 'false'}]
    }
  });
  const {fields, append, remove} = useFieldArray({name: 'contactWays', control: control});
  return (
    <Dialog>
      <DialogTrigger asChild>
        {props.type == 'add' ? (
          <Button className='bg-custom-primary-color'>
            {props.triggerTitle}
            <PlusCircle className='min-w-5 min-h-5' />
          </Button>
        ) : (
          <Button variant={'ghost'} className='w-full justify-start text-[15px]'>
            <File className='min-w-6 min-h-6' /> {props.triggerTitle}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent dir='rtl'>
        <DialogHeader>
          <DialogTitle>{getTitle(props.type)}</DialogTitle>
          <DialogDescription>{getDescription(props.type)}</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup className='gap-y-2'>
            <Controller control={control} name='name' render={({field, fieldState: {invalid, error}}) => <CustomInput type='controller' field={field} error={error} invalid={invalid} required hasLabel label='اسم العميل' placeHolder='ادخل اسم العميل' />} />
            {fields.map((field, index) => (
              <div key={field.id} className='flex items-end gap-x-2'>
                <Controller control={control} name={`contactWays.${index}.contactWay`} render={({field, fieldState: {invalid}}) => <CustomInput type='controller' field={field} error={undefined} invalid={invalid} required hasLabel label='طريقة التواصل' placeHolder='ادخل طريقة التواصل' />} />
                <Controller
                  control={control}
                  name={`contactWays.${index}.contactType`}
                  render={({field, fieldState: {invalid}}) => (
                    <CustomSelect
                      onChange={field.onChange}
                      value={field.value}
                      ref={field.ref}
                      invalid={invalid}
                      errorMessage={undefined}
                      required
                      label='نوع التواصل'
                      placeHolder='اختر نوع التواصل'
                      options={[
                        {value: 'phoneNumber', label: 'رقم الهاتف'},
                        {value: 'email', label: 'البريد الالكتروني'}
                      ]}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name={`contactWays.${index}.isPrimary`}
                  render={({field, fieldState: {invalid}}) => (
                    <CustomSelect
                      onChange={field.onChange}
                      value={field.value}
                      ref={field.ref}
                      invalid={invalid}
                      errorMessage={undefined}
                      required
                      label='هل هو اساسي'
                      placeHolder='اختر هل هو اساسي'
                      options={[
                        {value: 'true', label: 'نعم'},
                        {value: 'false', label: 'لا'}
                      ]}
                    />
                  )}
                />
                <Button variant={'destructive'} onClick={() => remove(index)}>
                  حذف
                </Button>
              </div>
            ))}
            <CustomButton text='اضافة غرض' icon={<PlusCircle className='min-w-5 min-h-5' />} onClick={() => append({contactWay: '', contactType: 'phoneNumber', isPrimary: 'false'})} className='bg-black text-white' />
            {fields.length == 0 && errors.contactWays?.root?.message && <p className='text-red-500 text-sm'>{errors.contactWays.root.message}</p>}
            <div className='flex justify-end gap-x-2 mt-2'>
              <DialogClose>
                <CustomButton text='الغاء' icon={<ArrowRight className='min-w-5 min-h-5' />} className=' flex-row-reverse' type='secondary' />
              </DialogClose>
              <CustomButton text={props.type == 'add' ? 'اضافة' : 'تعديل'} icon={<PlusCircle className='min-w-5 min-h-5' />} type='primary' className='bg-black text-white' IsSubmit />
            </div>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default ClientDialog