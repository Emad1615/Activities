import { useQuery } from "@tanstack/react-query";
import { getActivity } from "../../api/activity";

export const useActivity = (id: string) => {
  const {
    data: activity,
    isLoading: activityLoading,
    error: activityError,
  } = useQuery({
    queryKey: ["activities", id],
    queryFn: async () => await getActivity(id),
    enabled: !!id,
  });
  return { activity, activityLoading, activityError };
};
