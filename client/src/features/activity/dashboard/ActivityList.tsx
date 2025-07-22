import { Box, CircularProgress } from "@mui/material";
import ActivityCard from "./ActivityCard";
import { useActivities } from "../../../lib/hooks/activities/useActivities";

export default function ActivityList() {
  const { activites, activitiesLoading } = useActivities();
  if (activitiesLoading)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  console.log(activites);
  return (
    <Box>
      {activites?.map((activity, idx: number) => (
        <ActivityCard key={idx} activity={activity} />
      ))}
    </Box>
  );
}
