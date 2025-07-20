import { useEffect, useState } from "react";
import { Box, Container, CssBaseline } from "@mui/material";
import axios from "axios";
import NavBar from "./NavBar";
import Activities from "../../features/activity/dashboard/Activities";
import type {Activity} from "../../lib/types/index";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [activity, setActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState<boolean>(false);
  useEffect(() => {
    axios
      .get<Activity[]>("http://localhost:5107/api/Activities/GetActivities")
      .then((response) => setActivities(response.data));
    return () => {};
  }, []);
  const handelSelectActivity = (id: string) => {
    setActivity(activities.find((x) => x.id === id));
    setEditMode(false);
  };
  const handleCancelSelectActivity = () => {
    setActivity(undefined);
  };
  const handleEditActivity = (id?: string) => {
    if (id) {
      handelSelectActivity(id);
    } else {
      handleCancelSelectActivity();
    }
    setEditMode(true);
  };
  const handleCancelEditActivity = () => {
    setEditMode(false);
    setActivity(undefined);
  };
  const handleAddActivity = (activity: Activity) => {
    if (activity.id) {
      setActivities(
        activities.map((x) => (x.id === activity.id ? activity : x))
      );
      setActivity(activity);
    } else {
      const newActivity = {...activity, id: Math.random().toString(36).substring(2, 9) };
      setActivities([...activities, newActivity]);
    }
    setEditMode(false);
  };
  const handleDeleteActivity = (id: string) => {
    setActivities(activities.filter((x) => x.id !== id));
  };
  console.log("activity:", activity);
  return (
    <Box
      sx={{
        height: "100vh", // 100% of viewport height
        backgroundColor: "#f0f0f0",
        overflow: "auto",
      }}
    >
      <CssBaseline />
      <NavBar handleEditActivity={handleEditActivity} />
      <Container maxWidth="xl" sx={{ mt: 13 }}>
        <Activities
          activities={activities}
          selectedActivity={activity}
          handelSelectActivity={handelSelectActivity}
          handleEditActivity={handleEditActivity}
          handleCancelEditActivity={handleCancelEditActivity}
          handleCancelSelectActivity={handleCancelSelectActivity}
          editMode={editMode}
          handleAddActivity={handleAddActivity}
          handleDeleteActivity={handleDeleteActivity}
        />
      </Container>
    </Box>
  );
}

export default App;
