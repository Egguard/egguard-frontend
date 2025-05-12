// hooks/useUserNotifications.ts
import { useQuery } from '@tanstack/react-query';
import { getUserNotifications } from '@/services/api';
import { useSetAtom } from 'jotai';
import { notificationsAtom } from '@/store';

export const useUserNotifications = (page = 0, size = 5) => {
  const setNotifications = useSetAtom(notificationsAtom);

  return useQuery({
    queryKey: ['user-notifications', page, size],
    queryFn: async () => {
      const data = await getUserNotifications(page, size);
      // save it globally in atom (just the content)
      setNotifications(data.content);
      return data;
    },
    staleTime: 1000 * 60, // 1 minute
  });
};