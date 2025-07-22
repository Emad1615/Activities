import Grid from "@mui/material/Grid";
import ActivityList from "./ActivityList";

export default function Activities() {
  return (
    <Grid container spacing={3}>
      <Grid size={7}>
        <ActivityList />
      </Grid>
      <Grid size={5} mt={1}>
        Activities filter and details
      </Grid>
    </Grid>
  );
}
