import { Navigate, Outlet, useLocation } from 'react-router';
import { Typography } from '@mui/material';
import { useUser } from '../../lib/hooks/account/useUser';

export default function RequireAuth() {
  const { currentUser, isLoading } = useUser();
  const location = useLocation();

  if (isLoading) return <Typography>Loading...</Typography>;

  if (!currentUser) return <Navigate to="/login" state={{ from: location }} />;

  return <Outlet />;
}
