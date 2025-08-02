import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import { useParams } from "react-router";
import { useActivity } from "../../../lib/hooks/activities/useActivity";
import ActivitySidebar from "./ActivitySidebar";
import ActivityHeader from "./ActivityHeader";
import ActivityInfo from "./ActivityInfo";
import ActivityChat from "./ActivityChat";

export default function ActivityDetailsPage() {
  const { id } = useParams<string>();
  const { activity, activityLoading } = useActivity(id ?? "");
  if (activityLoading)
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
  if (!activity)
    return <Typography variant="h5">Activity not found</Typography>;
  return (
    <Grid container spacing={5}>
      <Grid size={8}>
        <Box display={"flex"} flexDirection={"column"} gap={3}>
          <ActivityHeader activity={activity} />
          <ActivityInfo activity={activity}/>
          <ActivityChat />
        </Box>
      </Grid>
      <Grid size={4}>
        <ActivitySidebar activity={activity} />
      </Grid>
    </Grid>
  );
}
