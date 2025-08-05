import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { LoginSchema } from "../../../features/account/login/loginSchema";
import { login } from "../../api/account";
import { toast } from "react-toastify";

export const useLogin = () => {
  const queryClient = useQueryClient();
  const {
    mutate: Login,
    isPending,
    error,
  } = useMutation({
    mutationFn: async (cred: LoginSchema) => await login(cred),
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: ["account"],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { Login, isPending, error };
};
