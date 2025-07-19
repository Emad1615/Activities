import { useEffect, useState } from "react";
import { Box, Container, CssBaseline } from "@mui/material";
import axios from "axios";
import NavBar from "./NavBar";
import Activities from "../../features/activity/dashboard/Activities";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  useEffect(() => {
    axios
      .get<Activity[]>("http://localhost:5107/api/Activities/GetActivities")
      .then((response) => setActivities(response.data));
    return () => {};
  }, []);

  return (
    <Box
      sx={{
        height: "100vh", // 100% of viewport height
        backgroundColor: "#f0f0f0",
        overflow:'auto'
      }}
    >
      <CssBaseline />
      <NavBar />
      <Container maxWidth="xl" sx={{ mt: 13 }} >
        <Activities activities={activities} />
      </Container>
    </Box>
  );
}

export default App;
