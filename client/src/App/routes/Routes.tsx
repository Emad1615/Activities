import { createBrowserRouter } from "react-router";
import App from "../layout/App";
import HomePage from "../../features/home/HomePage";
import Activities from "../../features/activity/dashboard/Activities";
import ActivityDetails from "../../features/activity/details/ActivityDetails";
import ActivityForm from "../../features/activity/form/ActivityForm";

export const routes = createBrowserRouter([
  {
    element: <App />,
    path: "/",
    errorElement: <div>Page Not Found : 404</div>,
    children: [
      {
        element: <HomePage />,
        index: true,
      },
      {
        path: "activities",
        element: <Activities />,
      },
      {
        path: "activities/:id",
        element: <ActivityDetails />,
      },
      {
        path: "createActivity",
        element: <ActivityForm key={"create"} />,
      },
      {
        path: "manage/:id",
        element: <ActivityForm />,
      },
    ],
  },
]);
