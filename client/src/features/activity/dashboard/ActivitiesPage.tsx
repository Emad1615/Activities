import Grid from "@mui/material/Grid";
import ActivityList from "./ActivityList";
import ActiviiesFilters from "./ActiviiesFilters";

export default function ActivitiesPage() {
  return (
    <Grid container spacing={3}>
      <Grid size={8}>
        <ActivityList />
      </Grid>
      <Grid size={4} mt={1}>
        <ActiviiesFilters />
      </Grid>
    </Grid>
  );
}
