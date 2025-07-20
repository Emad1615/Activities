import Grid from "@mui/material/Grid";
import ActivityList from "./ActivityList";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";

type Props = {
  activities: Activity[];
  selectedActivity: Activity | undefined;
  editMode: boolean;
  handelSelectActivity: (id: string) => void;
  handleCancelSelectActivity: () => void;
  handleEditActivity: (id?: string) => void;
  handleCancelEditActivity: () => void;
};
export default function Activities({
  activities,
  selectedActivity,
  editMode,
  handelSelectActivity,
  handleCancelSelectActivity,
  handleEditActivity,
  handleCancelEditActivity,
}: Props) {
  return (
    <Grid container spacing={3}>
      <Grid size={7}>
        <ActivityList
          activities={activities}
          handelSelectActivity={handelSelectActivity}
        />
      </Grid>
      <Grid size={5} mt={1}>
        {selectedActivity && !editMode && (
          <ActivityDetails
            selectedActivity={selectedActivity}
            handleCancelSelectActivity={handleCancelSelectActivity}
            handleEditActivity={handleEditActivity}
          />
        )}
        {editMode && (
          <ActivityForm
            handleCancelEditActivity={handleCancelEditActivity}
            activity={selectedActivity}
          />
        )}
      </Grid>
    </Grid>
  );
}
