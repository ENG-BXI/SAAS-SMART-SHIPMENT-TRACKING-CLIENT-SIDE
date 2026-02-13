import {COMPANY} from '@/app/_constant/routes';
import {axiosInstance} from '@/app/_provider/axios';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {ICreateCompany} from '../_interfaces/ICompany';
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
