import { lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router';
import ProfilePage from '../../features/profile/ProfilePage';
const App = lazy(() => import('../layout/App'));
const HomePage = lazy(() => import('../../features/home/HomePage'));
const ActivitiesPage = lazy(
  () => import('../../features/activity/dashboard/ActivitiesPage')
);
const ActivityDetailsPage = lazy(
  () => import('../../features/activity/details/ActivityDetailsPage')
);
const ActivityForm = lazy(
  () => import('../../features/activity/form/ActivityForm')
);
const NotFound = lazy(() => import('../../features/errors/NotFound'));
const ServerError = lazy(() => import('../../features/errors/ServerError'));
const RequireAuth = lazy(() => import('./RequireAuth'));

const Login = lazy(() => import('../../features/account/login/Login'));
const Register = lazy(() => import('../../features/account/register/Register'));

export const routes = createBrowserRouter([
  {
    element: <App />,
    path: '/',
    children: [
      {
        element: <RequireAuth />,
        children: [
          {
            path: 'activities',
            element: <ActivitiesPage />,
          },
          {
            path: 'activities/:id',
            element: <ActivityDetailsPage />,
          },
          {
            path: 'createActivity',
            element: <ActivityForm key={'create'} />,
          },
          {
            path: 'manage/:id',
            element: <ActivityForm />,
          },
          {
            path: 'profile/:id',
            element: <ProfilePage />,
          },
        ],
      },
      {
        path: '/',
        element: <HomePage />,
        index: true,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'not-found',
        element: <NotFound />,
      },
      {
        path: 'server-error',
        element: <ServerError />,
      },
      {
        path: '*',
        element: <Navigate replace to={'/not-found'} />,
      },
    ],
  },
]);
