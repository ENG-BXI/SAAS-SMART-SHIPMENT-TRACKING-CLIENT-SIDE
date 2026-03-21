import {COMPANY} from '@/lib/Constant/routes';
import {axiosInstance} from '@/lib/axios';
import {useMutation, useQueryClient} from '@tanstack/react-query';
interface IDeleteCompanyService {
  id: string;
}
const deleteCompany = async ({id}: IDeleteCompanyService) => {
  await axiosInstance.delete(`/${COMPANY}/${id}`);
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
