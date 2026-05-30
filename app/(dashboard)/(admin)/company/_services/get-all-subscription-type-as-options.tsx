'use client';
import {IOption} from '@/components/custom-select';
import {useQuery} from '@tanstack/react-query';
import {clientAxiosInstance} from '@/lib/axios/client';
import {SUBSCRIPTION, SUBSCRIPTION_TYPE} from '@/lib/Constant/routes';
interface ISubscription {
  id: string;
  type: string;
  price: number;
}
const getAllSubscriptionTypeAsOptions = async () => {
  const response = await clientAxiosInstance.get(`${SUBSCRIPTION}/${SUBSCRIPTION_TYPE}`);
  const data: IOption[] = response.data.data.map((subscription: ISubscription) => {
    return {
      value: subscription.id,
      label: subscription.type,
      additionalInfo: subscription.price
    };
  });
  return data;
};

function useGetSubscriptionTypeAsOptions(enabled = true) {
  return useQuery({
    queryKey: ['subscriptionType'],
    queryFn: getAllSubscriptionTypeAsOptions,
    enabled
  });
}
export default useGetSubscriptionTypeAsOptions;
