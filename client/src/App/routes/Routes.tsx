import { createBrowserRouter } from "react-router";
import App from "../layout/App";
import HomePage from "../../features/home/HomePage";

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
        element: <>activities</>,
      },
      {
        path: "activities/:id",
        element: <>activity</>,
      },
      {
        path: "createActivity",
        element: <>createActivity</>,
      },
      {
        path: "manageActivity/:id",
        element: <>manageActivity</>,
      },
    ],
  },
]);
