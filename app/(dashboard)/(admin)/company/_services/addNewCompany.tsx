import {COMPANY} from '@/lib/Constant/routes';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {ICreateCompany} from '../_interfaces/company';
import { clientAxiosInstance } from '@/lib/axios/client';
interface IAddNewCompanyService {
  company: ICreateCompany;
}
const addNewCompany = async ({company}: IAddNewCompanyService) => {
  await clientAxiosInstance.post(`/${COMPANY}`, company);
};
const AddNewCompanyService = () => {
  const reactQuery = useQueryClient();
  return useMutation({
    mutationKey: ['AddNewCompany'],
    mutationFn: ({company}: IAddNewCompanyService) => addNewCompany({company}),
    onSuccess: () => {
      reactQuery.refetchQueries({
        queryKey: ['GetAllCompany']
      });
    }
  });
};

export default AddNewCompanyService;
