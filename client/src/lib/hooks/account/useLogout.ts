import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../../api/account";
import { useNavigate } from "react-router";

export const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate=useNavigate();
  const {
    mutate: Logout,
    isPending,
    error,
  } = useMutation({
    mutationFn: async () => await logout(),
    onSuccess: async () => {
     await queryClient.removeQueries({
        queryKey: ["user",'activities'],
      });
      navigate('/')
    },
  });
  return { Logout, isPending, error };
};
