import { useEffect, useState } from "react";
import { Box, Container, CssBaseline } from "@mui/material";
import axios from "axios";
import NavBar from "./NavBar";
import Activities from "../../features/activity/dashboard/Activities";

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
    } else {
      setActivities([...activities, activity]);
    }
  };
  const handleDeleteActivity = (id: string) => {
    setActivities(activities.filter((x) => x.id !== id));
  };
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
        />
      </Container>
    </Box>
  );
}

export default App;
