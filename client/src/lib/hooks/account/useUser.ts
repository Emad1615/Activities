import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCurrentUser } from "../../api/account";

export const useUser = () => {
  const queryClient=useQueryClient();
  const {
    data: currentUser,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: async () => await getCurrentUser(),
    enabled:!!queryClient.getQueryData(['user'])
  });
  return { currentUser, isLoading, error };
};
