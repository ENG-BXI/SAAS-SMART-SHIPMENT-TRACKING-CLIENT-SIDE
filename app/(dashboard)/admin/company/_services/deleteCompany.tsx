import {COMPANY} from '@/app/_constant/routes';
import {axiosInstance} from '@/app/_provider/axios';
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
