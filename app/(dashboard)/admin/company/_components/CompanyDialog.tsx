import {Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from '@/app/_components/ui/dialog';
import CustomInput from '@/app/_components/CustomInput';
import CustomButton from '@/app/_components/CustomButton';
import {Button} from '@/app/_components/ui/button';
import {ArrowRight, File, Info, PlusCircle} from 'lucide-react';
import {ICompany, ICreateCompany, IEditCompany} from '../_interfaces/ICompany';
import {Controller, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {CreateCompanyFormSchema, EditCompanyFormSchema} from '../_schemas/companyForm';
import {FieldGroup} from '@/app/_components/ui/field';
import AddNewCompanyService from '../_services/addNewCompany';
import {toast} from 'sonner';
import {useState} from 'react';
import EditCompanyService from '../_services/editCompany';
type ICompanyDialog = {type: 'edit'; id: string; data: ICompany} | {type: 'add'};

function CompanyDialog({...props}: ICompanyDialog) {
  const [open, setOpen] = useState(false);
  const form = useForm<ICreateCompany | IEditCompany>({
    resolver: zodResolver(props.type == 'add' ? CreateCompanyFormSchema : EditCompanyFormSchema),
    defaultValues:
      props.type == 'edit'
        ? props.data
        : {
            companyEmail: '',
            location: '',
            name: ''
          }
  });
  const {mutate: AddCompanyMutate, isPending: isAddCompanyPending} = AddNewCompanyService();
  const {mutate: EditCompanyMutate, isPending: isEditCompanyPending} = EditCompanyService();
  function getTitle() {
    switch (props.type) {
      case 'add':
        return 'اضافة شركة جديدة';
      case 'edit':
        return 'تعديل شركة ';
    }
  }
  function getDescription() {
    switch (props.type) {
      case 'add':
        return 'إنشاء شركة جديدة لتمكينها من استخدام النظام وإدارة عمليات الشحن الخاصة بها.';
      case 'edit':
        return 'تعديل بيانات الشركة وحالة تفعيلها. أي تغيير سيتم تطبيقه فورًا على جميع المستخدمين التابعين للشركة.';
    }
  }
  function onSubmit(data: ICreateCompany | IEditCompany) {
    if (props.type == 'add')
      AddCompanyMutate(
        {company: data as ICreateCompany},
        {
          onSuccess: () => {
            toast.success('تم اضافة شركة جديدة بنجاح');
          },
          onError: error => {
            toast.error(`فشل في اضافة شركة جديدة ${error.message}`);
            console.error('Error In Add New Company \n', error);
          }
        }
      );
    else if (props.type == 'edit')
      EditCompanyMutate(
        {id: props.id, company: props.data},
        {
          onSuccess: () => {
            toast.success('تم تعديل الشركة بنجاح');
          },
          onError: error => {
            toast.error(`فشل في تعديل شركة ${props.data.name} ${error.message}`);
            console.error('Error In Edit Company \n', error);
          }
        }
      );
    form.reset({
      name: '',
      location: '',
      companyEmail: '',
      companyPassword: '',
      confirmPassword: ''
    });
    setOpen(false);
  }
  const isPending = isAddCompanyPending || isEditCompanyPending;
  return (
    <Dialog open={open} onOpenChange={e => setOpen(e)}>
      <DialogTrigger asChild>
        {props.type == 'add' ? (
          <Button className='bg-custom-primary-color'>
            <PlusCircle className='min-w-5 min-h-5' /> {getTitle()}
          </Button>
        ) : (
          <Button variant={'ghost'} className='w-full justify-start text-[15px]'>
            <File className='min-w-6 min-h-6' /> {getTitle()}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent dir='rtl'>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <DialogHeader>
            <div className='bg-[#dbecfa] max-w-min p-2 rounded-full text-[#175CD3]'>
              <Info />
            </div>
            <DialogTitle className=''>{getTitle() + ' ' + form.getValues('name')}</DialogTitle>
            <DialogDescription>{getDescription()}</DialogDescription>
          </DialogHeader>

          <FieldGroup className='gap-y-2 mb-3'>
            <Controller
              name='name'
              control={form.control}
              render={({field, fieldState}) => {
                return <CustomInput disabled={isPending} type='controller' invalid={fieldState.invalid} error={fieldState.error} field={field} hasLabel label='اسم الشركة' required placeHolder='مثال: الخط السريع للشحن' />;
              }}
            />
            <Controller
              name='location'
              control={form.control}
              render={({field, fieldState}) => {
                return <CustomInput disabled={isPending} type='controller' invalid={fieldState.invalid} error={fieldState.error} field={field} hasLabel label='موقع الشركة' required placeHolder='مثال: الرياض، السعودية' />;
              }}
            />
            <Controller
              name='companyEmail'
              control={form.control}
              render={({field, fieldState}) => {
                return <CustomInput disabled={isPending} type='controller' invalid={fieldState.invalid} error={fieldState.error} field={field} hasLabel label='ايميل الشركة' required placeHolder='مثال: example@gmail.com' />;
              }}
            />
            {props.type == 'add' && (
              <Controller
                name='companyPassword'
                control={form.control}
                render={({field, fieldState}) => {
                  return <CustomInput disabled={isPending} type='controller' invalid={fieldState.invalid} error={fieldState.error} field={field} hasLabel label='كلمة السرة' required placeHolder='***********' />;
                }}
              />
            )}
            {props.type == 'add' && (
              <Controller
                name='confirmPassword'
                control={form.control}
                render={({field, fieldState}) => {
                  return <CustomInput disabled={isPending} type='controller' invalid={fieldState.invalid} error={fieldState.error} field={field} hasLabel label='تاكيد كلمة السرة ' required placeHolder='***********' />;
                }}
              />
            )}
          </FieldGroup>

          <DialogFooter>
            <DialogClose>
              <CustomButton text='الغاء' icon={<ArrowRight />} type='secondary' className='flex-row-reverse' />
            </DialogClose>
            <CustomButton disable={isPending} IsSubmit text={props.type == 'add' ? 'اضافة' : 'تعديل'} icon={<PlusCircle />} className='bg-black' />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default CompanyDialog;
