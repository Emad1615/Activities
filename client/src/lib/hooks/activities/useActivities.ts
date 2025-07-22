import { useQuery } from "@tanstack/react-query";
import { getActivities } from "../../api/activity";

export const useActivities = () => {
  const {
    data: activites,
    error: activitiesError,
    isLoading: activitiesLoading,
  } = useQuery({
    queryKey: ["activities"],
    queryFn: async () => await getActivities(),
  });
  return { activites, activitiesError, activitiesLoading };
};
