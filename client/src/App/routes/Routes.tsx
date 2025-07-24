import { createBrowserRouter } from "react-router";
import App from "../layout/App";
import HomePage from "../../features/home/HomePage";
import ActivitiesPage from "../../features/activity/dashboard/ActivitiesPage";
import ActivityDetailsPage from "../../features/activity/details/ActivityDetailsPage";
import ActivityForm from "../../features/activity/form/ActivityForm";
import Counter from "../../features/counter/Counter";

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
        element: <ActivitiesPage />,
      },
      {
        path: "activities/:id",
        element: <ActivityDetailsPage />,
      },
      {
        path: "createActivity",
        element: <ActivityForm key={"create"} />,
      },
      {
        path: "manage/:id",
        element: <ActivityForm />,
      },
        {
        path: "counter",
        element: <Counter />,
      },
    ],
  },
]);
