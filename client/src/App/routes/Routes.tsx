import { lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router';
import ProfilePage from '../../features/profile/ProfilePage';
import ConfirmEmail from '../../features/account/confirmEmail/ConfirmEmail';
import ChangePasswordForm from '../../features/account/changePassword/ChangePasswordForm';
import ForgotPasswordForm from '../../features/account/forgotPassword/ForgotPasswordForm';
import ResetPasswordForm from '../../features/account/resetPassword/ResetPasswordForm';
import GithubAuthCallback from '../../features/account/login/GithubAuthCallback';
import GoogleAuthCallback from '../../features/account/login/GoogleAuthCallback';
import FacebookAuthCallback from '../../features/account/login/FacebookAuthCallback';
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
          {
            path: 'change-password',
            element: <ChangePasswordForm />,
          },
        ],
      },
      {
        path: '/',
        element: <HomePage />,
        index: true,
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
  {
    path: 'login',
    element: <Login />,
  },
  {
    path: 'register',
    element: <Register />,
  },
  {
    path: 'confirm-email',
    element: <ConfirmEmail />,
  },
  {
    path: 'forgot-password',
    element: <ForgotPasswordForm />,
  },
  {
    path: 'reset-password',
    element: <ResetPasswordForm />,
  },
  {
    path: 'auth-callback',
    element: <GithubAuthCallback />,
  },
  {
    path: 'google-auth-callback',
    element: <GoogleAuthCallback />,
  },
  {
    path: 'facebook-auth-callback',
    element: <FacebookAuthCallback />,
  },
]);
