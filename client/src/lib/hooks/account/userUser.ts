import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../api/account";

export const useUser = () => {
  const {
    data: currentUser,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["account"],
    queryFn: async () => await getCurrentUser(),
  });
  return { currentUser, isLoading, error };
};
