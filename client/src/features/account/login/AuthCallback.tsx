import { GitHub } from '@mui/icons-material';
import { Box, CircularProgress, Paper, Typography } from '@mui/material';
import { useGithubLogin } from '../../../lib/hooks/account/useGithubLogin';
import { useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

export default function AuthCallback() {
  const {
    LoginWithGithub,
    isPending: isLoading,
    isError,
    error,
  } = useGithubLogin();
  const isFetched = useRef(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');
  useEffect(() => {
    if (isFetched.current || !code) return;
    isFetched.current = true;
    LoginWithGithub(code)
      .then(() => {
        navigate('/activities');
      })
      .catch((error) => {
        console.error('GitHub login error:', error);
      });
  }, [code, LoginWithGithub, navigate]);
  return (
    <Box
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
      height={'100vh'}
      sx={{
        backgroundColor: '#151a22',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          backgroundColor: '#0d1117',
          color: '#ffffff',
          p: 3,
          maxWidth: '740px',
          minWidth: '540px',
        }}
      >
        <GitHub sx={{ fontSize: 50, mx: 'auto', display: 'block' }} />
        <Typography
          variant="overline"
          align="center"
          display={'block'}
          mt={1}
          fontSize={'25px'}
        >
          Authenticating...
        </Typography>
        {isLoading && (
          <CircularProgress
            sx={{ fontSize: 50, mx: 'auto', display: 'block' }}
          />
        )}
        {isError && (
          <Typography
            variant="body1"
            align="center"
            display={'block'}
            mt={2}
            color="warning"
          >
            Error: &nbsp;
            {typeof error?.response?.data === 'string'
              ? error.response.data
              : `Something went wrong 
                We couldn't complete the GitHub connection.
                Please try again or contact support if the issue continues`}
          </Typography>
        )}
      </Paper>
    </Box>
  );
}
