import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createActivity } from "../../api/activity";
import { useSnackbar } from "../shared/useSnackbar";
import { useNavigate } from "react-router";

export const useCreateActivity = () => {
  const queryClient = useQueryClient();
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const {
    mutate: addActivity,
    isPending: isLoadingAddActivity,
    error: errorAddActivity,
  } = useMutation({
    mutationFn: (activity: Activity) => {
      const response = createActivity(activity);
      return response;
    },
    onSuccess: (id) => {
      queryClient.invalidateQueries({
        queryKey: ["activities"],
      });
      showSnackbar("Activity created successfully!", "success");
      navigate(`/activities/${id}`);
    },
    onError: (error: Error) => {
      showSnackbar(`Error creating activity: ${error.message}`, "error", 5000);
    },
  });
  return { addActivity, isLoadingAddActivity, errorAddActivity };
};
