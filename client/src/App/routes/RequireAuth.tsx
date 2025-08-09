import { Navigate, Outlet, useLocation } from 'react-router';
import { Typography } from '@mui/material';
import { useIsAuthenticated } from '../../lib/hooks/account/useIsAuthenticated';

export default function RequireAuth() {
  const {isAuthenticated,isLoading}=useIsAuthenticated()
  const location = useLocation();

  if (isLoading) return <Typography>Loading...</Typography>;

  if (!isAuthenticated) return <Navigate to="/login" state={{ from: location }} />;

  return <Outlet />;
}
