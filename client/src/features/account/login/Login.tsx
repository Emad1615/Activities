import { GitHub } from '@mui/icons-material';
import { Avatar, Box, Button, Divider, Paper, Typography } from '@mui/material';
import LoginForm from './form/LoginForm';
import { useLocation, useNavigate } from 'react-router';
import { useEffect } from 'react';
import { useIsAuthenticated } from '../../../lib/hooks/account/useIsAuthenticated';

export default function Login() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useIsAuthenticated();
  const loginWithGtihub = () => {
    const clientId = import.meta.env.VITE_GITHUB_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_GITHUB_REDIRECT_URI;
    window.open(
      `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=read:user user:email user:follow`,
      '_self'
    );
  };
  useEffect(() => {
    if (location.pathname === '/login' && isAuthenticated && !isLoading)
      navigate(-1);
  }, [location, isAuthenticated, navigate, isLoading]);
  return (
    <Box
      display={'grid'}
      justifyContent={'center'}
      alignItems={'center'}
      height={'100vh'}
      sx={{
        backgroundColor: '#FCF8F8',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          py: 3,
          px: 4,
          mx: 'auto',
          maxWidth: '740px',
          minWidth: '540px',
        }}
      >
        <Box
          display="flex"
          flexDirection="column"
          gap={1}
          alignItems="center"
          justifyContent={'center'}
        >
          <Avatar
            src="/images/logo.png"
            sx={{ backgroundColor: '#845ec2', padding: 1 }}
          />
          <Typography
            variant="overline"
            color="text.secondary"
            fontWeight={600}
            fontSize={'25px'}
            gap={0}
          >
            Login
          </Typography>
          <Divider color="secondary" />
          <LoginForm />
          <Button
            startIcon={<GitHub />}
            sx={{
              backgroundColor: '#21262d',
              width: '100%',
              mt: 1,
            }}
            variant="contained"
            onClick={loginWithGtihub}
          >
            Sign in with Github
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
