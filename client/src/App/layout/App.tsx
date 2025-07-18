import { useEffect, useState } from "react";
import {
  Container,
  CssBaseline,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import axios from "axios";
import NavBar from "./NavBar";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  useEffect(() => {
    axios
      .get<Activity[]>("http://localhost:5107/api/Activities/GetActivities")
      .then((response) => setActivities(response.data));
    return () => {};
  }, []);

  return (
    <>
      <CssBaseline />
      <NavBar />
      <Container maxWidth="xl" sx={{ mt: 2 }}>
        <List>
          {activities.map((activity) => (
            <ListItem key={activity.id}>
              <ListItemText>
                <ListItemText
                  slotProps={{
                    primary: {
                      color: "#333",
                    },
                    secondary: {
                      color: "#3333",
                    },
                  }}
                  primary={activity.title}
                  secondary={activity.category}
                />
              </ListItemText>
            </ListItem>
          ))}
        </List>
      </Container>
    </>
  );
}

export default App;
