import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../../api/account";

export const useLogout = () => {
  const queryClient = useQueryClient();
  const {
    mutate: Logout,
    isPending,
    error,
  } = useMutation({
    mutationFn: async () => await logout(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["account"],
      });
    },
  });
  return { Logout, isPending, error };
};
