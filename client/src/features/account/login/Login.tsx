import { Lock } from '@mui/icons-material';
import { Box, Divider, Paper, Typography } from '@mui/material';
import LoginForm from './form/LoginForm';
import { useLocation, useNavigate } from 'react-router';
import { useEffect } from 'react';
import { useIsAuthenticated } from '../../../lib/hooks/account/useIsAuthenticated';

export default function Login() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useIsAuthenticated();

  useEffect(() => {
    if (location.pathname === '/login' && isAuthenticated && !isLoading)
      navigate(-1);
  }, [location, isAuthenticated, navigate, isLoading]);
  return (
    <Paper
      elevation={3}
      sx={{
        py: 3,
        px: 4,
        mx: 'auto',
        maxWidth: '740px',
      }}
    >
      <Box
        display="flex"
        flexDirection="column"
        gap={1}
        alignItems="center"
        justifyContent={'center'}
      >
        <Lock color="secondary" sx={{ fontSize: 48 }} />
        <Typography variant="h4" color="text.secondary" fontWeight={600}>
          Login
        </Typography>
        <Divider color="secondary" />
        <LoginForm />
      </Box>
    </Paper>
  );
}
