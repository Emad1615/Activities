import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Activity } from "../../types";
import { editActivity } from "../../api/activity";
import { useSnackbar } from "../shared/useSnackbar";

export const useEditActivity = () => {
  const queryClient = useQueryClient();
  const { showSnackbar } = useSnackbar();

  const {
    mutate: updateActivity,
    isPending: isLoadingEditActivity,
    error: errorEditActivity,
  } = useMutation({
    mutationFn: async (activity: Activity) => {
      const response = await editActivity(activity);
      return response;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["activities"],
      });
      showSnackbar("Activity updated successfully!", "success");
    },
    onError: (error: Error) => {
      showSnackbar(`Error deleting activity: ${error.message}`, "error", 5000);
    },
  });
  return { updateActivity, isLoadingEditActivity, errorEditActivity };
};
