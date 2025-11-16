import { Alert, Box, Button, Divider, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useResendEmailConfirmation } from '../../../../lib/hooks/account/useResendEmailConfirmation';

type Props = {
  email?: string;
};
export default function RegisterSuccessfullMessage({ email }: Props) {
  const { resendEmailConfirmation, isPending, error, isError } =
    useResendEmailConfirmation();
  console.log(error);
  return (
    <Box
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
      flexDirection={'column'}
      gap={2}
    >
      <CheckCircleIcon fontSize="large" color="success" />
      <Typography
        variant="h5"
        fontWeight={'bold'}
        textTransform={'uppercase'}
        color="text.secondary"
      >
        Accout created successfully 😉
      </Typography>
      <Divider flexItem />
      <Typography variant="body1" color="text.secondary" textAlign={'center'}>
        A confirmation email has been sent to your email address{' '}
        <Typography variant="overline" color="info">
          {email}
        </Typography>
        . Please check your inbox and click on the confirmation link to activate
        your account.
      </Typography>
      <Button
        variant="outlined"
        color="primary"
        size="medium"
        onClick={() => resendEmailConfirmation({ email })}
        disabled={isPending}
      >
        Resend
      </Button>
      {isError && <Alert severity="error">{error?.response?.data}</Alert>}
    </Box>
  );
}
