import Grid from "@mui/material/Grid";
import ActivityList from "./ActivityList";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import type {Activity} from "../../../lib/types/index";


type Props = {
  activities: Activity[];
  selectedActivity: Activity | undefined;
  editMode: boolean;
  handelSelectActivity: (id: string) => void;
  handleCancelSelectActivity: () => void;
  handleEditActivity: (id?: string) => void;
  handleCancelEditActivity: () => void;
  handleAddActivity: (activity: Activity) => void;
  handleDeleteActivity: (id: string) => void;
};
export default function Activities({
  activities,
  selectedActivity,
  editMode,
  handelSelectActivity,
  handleCancelSelectActivity,
  handleEditActivity,
  handleAddActivity,
  handleCancelEditActivity,
  handleDeleteActivity
}: Props) {
  return (
    <Grid container spacing={3}>
      <Grid size={7}>
        <ActivityList
          activities={activities}
          handelSelectActivity={handelSelectActivity}
          handleDeleteActivity={handleDeleteActivity}
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
            handleAddActivity={handleAddActivity}
          />
        )}
      </Grid>
    </Grid>
  );
}
