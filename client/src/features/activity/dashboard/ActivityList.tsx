import { Box, CircularProgress, Typography } from "@mui/material";
import ActivityCard from "./ActivityCard";
import { useActivities } from "../../../lib/hooks/activities/useActivities";

export default function ActivityList() {
  const { activities, activitiesLoading } = useActivities();
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
  if (activities?.length===0) {
    return (
        <Typography color="text.secondary" variant="body2" textAlign={"center"}>
          There are no activities to display at the moment...
        </Typography>
    );
  }
  return (
    <Box>
      {activities?.map((activity, idx: number) => (
        <ActivityCard key={idx} activity={activity} />
      ))}
    </Box>
  );
}
