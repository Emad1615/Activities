import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Activity } from "../../types";
import { createActivity } from "../../api/activity";
import { useSnackbar } from "../shared/useSnackbar";

export const useCreateActivity = () => {
  const queryClient = useQueryClient();
  const { showSnackbar } = useSnackbar();
  const {
    mutate: addActivity,
    isPending: isLoadingAddActivity,
    error: errorAddActivity,
  } = useMutation({
    mutationFn: (activity: Activity) => {
      const response = createActivity(activity);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["activities"],
      });
      showSnackbar("Activity created successfully!", "success");
    },
    onError: (error: Error) => {
      showSnackbar(`Error creating activity: ${error.message}`, "error", 5000);
    },
  });
  return { addActivity, isLoadingAddActivity, errorAddActivity };
};
