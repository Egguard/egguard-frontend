import { useQuery } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { getUserStats } from '@/services/api.ts' //api route
import { statsAtom } from '@/store/index.ts' //store route

export const useUserStats = () => {
  const setUserStats = useSetAtom(statsAtom);

  return useQuery({
    queryKey: ['user-stats'],
    queryFn: async () => {
      const data = await getUserStats();
      // save globally in atom
      setUserStats(data);
      return data;
    },
    // time before refetching data
    staleTime: 1000 * 60, // 1 min
  });
};