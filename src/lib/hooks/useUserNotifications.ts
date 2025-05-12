// hooks/useUserNotifications.ts
import { useQuery } from '@tanstack/react-query';
import { getUserNotifications } from '@/services/api';
import { useSetAtom } from 'jotai';
import { notificationsAtom } from '@/store';

export const useUserNotifications = () => {
  const setNotifications = useSetAtom(notificationsAtom);

  return useQuery({
    queryKey: ['user-notifications'],
    queryFn: async () => {
      const data = await getUserNotifications();
      // save it globally in atom
      setNotifications(data);
      return data;
    },
    // time before refetching the data
    staleTime: 1000 * 60, // 1 minute
  });
};
