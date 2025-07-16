import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    fetch("http://localhost:5107/api/Activities/GetActivities")
      .then((response) => response.json())
      .then((data) => setActivities(data));
    return () => {};
  }, []);

  return (
    <>
      <h1>Reactivities</h1>
      <ul>
        {activities.map((activity) => (
          <li key={activity.id}>{activity.title}</li>
        ))}
      </ul>
    </>
  );
}

export default App;
