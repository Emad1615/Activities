import { Facebook } from '@mui/icons-material';
import { Box, CircularProgress, Paper, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { useFacebookLogin } from '../../../lib/hooks/account/useFacebookLogin';
import FacebookForm from './form/FacebookForm';

export default function FacebookAuthCallback() {
  const { LoginWithFacebook } = useFacebookLogin();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [noEamil, setNoEmail] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');
  const isFetched = useRef(false);
  useEffect(() => {
    if (isFetched.current || !code) return;
    setIsLoading(true);
    isFetched.current = true;
    LoginWithFacebook(code, null)
      .then(() => {
        navigate('/activities');
        setIsLoading(false);
      })
      .catch((error) => {
        if (error.message === 'EmailNotAllowed') setNoEmail(true);
        else setError(error);
        setIsLoading(false);
      });
  }, [LoginWithFacebook, code, navigate]);
  return (
    <Box
      display={'flex'}
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
          p: 3,
          maxWidth: '740px',
          minWidth: '540px',
        }}
      >
        <Facebook
          sx={{ fontSize: 50, mx: 'auto', display: 'block' }}
          color="primary"
        />
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
        {error && (
          <Typography
            variant="body1"
            align="center"
            display={'block'}
            mt={2}
            color="warning"
          >
            Error: &nbsp;
            {error}
          </Typography>
        )}
        {noEamil && <FacebookForm />}
      </Paper>
    </Box>
  );
}
