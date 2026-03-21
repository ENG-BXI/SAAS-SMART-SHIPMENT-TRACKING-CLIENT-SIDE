import {COMPANY} from '@/lib/Constant/routes';
import {axiosInstance} from '@/lib/axios';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {ICreateCompany} from '../_interfaces/company';
interface IAddNewCompanyService {
  company: ICreateCompany;
}
const addNewCompany = async ({company}: IAddNewCompanyService) => {
  await axiosInstance.post(`/${COMPANY}`, company);
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
