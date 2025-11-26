import { useNavigate, useSearchParams } from 'react-router';
import { useConfirmEmail } from '../../../lib/hooks/account/useConfirmEmail';
import { useEffect } from 'react';
import { Avatar, Box, Button, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import { useResendEmailConfirmation } from '../../../lib/hooks/account/useResendEmailConfirmation';
import { toast } from 'react-toastify';

export default function ConfirmEmail() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const userId = searchParams.get('userId');
  const { confirmEmail, isError, isPending, isSuccess } = useConfirmEmail();
  const { resendEmailConfirmation } = useResendEmailConfirmation();
  const handleResendEmailConfirmation = () => {
    resendEmailConfirmation(
      { userId },
      {
        onSuccess: () => {
          toast.success('Confirmation email resent successfully');
        },
        onError: () => {
          toast.error('Failed to resend confirmation email');
        },
      }
    );
  };
  useEffect(() => {
    if (token && userId) {
      confirmEmail({ token, userId });
    }
  }, [token, userId, confirmEmail]);
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '96vh',
        gap: 2,
        bgcolor: 'background.default',
        position: 'relative',
      }}
    >
      <Avatar
        src="/images/logo.png"
        alt="Logo"
        sx={{
          bgcolor: '#b39cd0',
          p: 1,
          position: 'absolute',
          top: 20,
          left: 20,
        }}
      />

      {isPending && (
        <>
          <span className="loader"></span>
          <Typography variant="h6" color="text.secondary">
            Confirming your email, please wait...
          </Typography>
        </>
      )}

      {isSuccess && (
        <>
          <CheckCircleIcon sx={{ fontSize: '4rem' }} color="success" />
          <Typography variant="h6" color="text.secondary">
            Your email has been successfully confirmed. You can now continue
            using your account without any restrictions.
          </Typography>
          <Button
            variant="text"
            color="primary"
            onClick={() => navigate('/login', { replace: true })}
          >
            Back to login
          </Button>
        </>
      )}
      {isError && (
        <>
          <ErrorIcon sx={{ fontSize: '4rem' }} color="error" />
          <Typography variant="h6" color="text.secondary">
            Email confirmation failed. The link may be invalid or expired.
            Please request a new confirmation link.
          </Typography>
          <Button
            variant="text"
            color="primary"
            onClick={() => handleResendEmailConfirmation()}
          >
            Resend Confirmation Email
          </Button>
        </>
      )}
    </Box>
  );
}
