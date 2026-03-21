import {COMPANY} from '@/lib/Constant/routes';
import {axiosInstance} from '@/lib/axios';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {IEditCompany} from '../_interfaces/company';
interface IEditCompanyService {
  id: string;
  company: IEditCompany;
}
const editCompany = async ({id, company}: IEditCompanyService) => {
  const response = await axiosInstance.patch(`/${COMPANY}/${id}`, company);
  // TODO Delete This
  console.log(response);

  return response;
};
const EditCompanyService = () => {
  const reactQuery = useQueryClient();
  return useMutation({
    mutationKey: ['EditCompany'],
    mutationFn: ({id, company}: IEditCompanyService) => editCompany({id, company}),
    onSuccess: () => {
      reactQuery.refetchQueries({
        queryKey: ['GetAllCompany']
      });
    }
  });
};

export default EditCompanyService;
