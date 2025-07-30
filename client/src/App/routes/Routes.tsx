import { createBrowserRouter, Navigate } from "react-router";
import App from "../layout/App";
import HomePage from "../../features/home/HomePage";
import ActivitiesPage from "../../features/activity/dashboard/ActivitiesPage";
import ActivityDetailsPage from "../../features/activity/details/ActivityDetailsPage";
import ActivityForm from "../../features/activity/form/ActivityForm";
import Counter from "../../features/counter/Counter";
import TestErrors from "../../features/errors/TestErrors";
import NotFound from "../../features/errors/NotFound";
import ServerError from "../../features/errors/ServerError";

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
       {
        path: "errors",
        element: <TestErrors />,
      },
      {
        path: "not-found",
        element: <NotFound />,
      },
       {
        path: "server-error",
        element: <ServerError />,
      },
      {
        path: "*",
        element: <Navigate  replace to={'/not-found'}/>,
      },
    ],
  },
]);
