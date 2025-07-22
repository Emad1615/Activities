import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteActivity } from "../../api/activity";
import { useSnackbar } from "../shared/useSnackbar";

export const useDeleteActivity = () => {
  const queryClient = useQueryClient();
  const { showSnackbar } = useSnackbar();
  const {
    mutate: removeActivity,
    isPending: isLoadingRemoveActivity,
    error: errorRemoveActivity,
  } = useMutation({
    mutationFn: async (id: string) => {
      await deleteActivity(id);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["activities"],
      });
      showSnackbar("Activity deleted successfully!", "success");
    },
    onError: (error: Error) => {
      showSnackbar(`Error deleting activity: ${error.message}`, "error", 5000);
    },
  });

  return { removeActivity, isLoadingRemoveActivity, errorRemoveActivity };
};
