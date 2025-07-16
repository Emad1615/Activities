import { useEffect, useState } from "react";
import "./App.css";
import { List, ListItem, ListItemText, Typography } from "@mui/material";
import axios from "axios";

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
      <Typography
        variant="h3"
        fontWeight={600}
        sx={{
          color: "blue",
        }}
      >
        Reactivities
      </Typography>
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
    </>
  );
}

export default App;
