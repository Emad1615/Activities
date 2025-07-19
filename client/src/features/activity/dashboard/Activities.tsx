import Grid from "@mui/material/Grid";
import ActivityList from "./ActivityList";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";

type Props = {
  activities: Activity[];
};
export default function Activities({ activities }: Props) {
  return (
    <Grid container spacing={3}>
      <Grid size={7}>
        <ActivityList  activities={activities}/>
      </Grid>
      <Grid size={5}>
        <ActivityDetails />
        <ActivityForm />
      </Grid>
    </Grid>
  );
}
