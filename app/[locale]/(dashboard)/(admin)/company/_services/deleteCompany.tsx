import {COMPANY} from '@/lib/Constant/routes';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import { clientAxiosInstance } from '@/lib/axios/client';
interface IDeleteCompanyService {
  id: string;
}
const deleteCompany = async ({id}: IDeleteCompanyService) => {
  await clientAxiosInstance.delete(`/${COMPANY}/${id}`);
};
const DeleteCompanyService = () => {
  const reactQuery = useQueryClient();
  return useMutation({
    mutationKey: ['DeleteCompany'],
    mutationFn: ({id}: IDeleteCompanyService) => deleteCompany({id}),
    onSuccess: () => {
      reactQuery.refetchQueries({
        queryKey: ['GetAllCompany']
      });
    }
  });
};

export default DeleteCompanyService;
