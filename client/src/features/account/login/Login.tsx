import { Lock } from '@mui/icons-material';
import { Box, Divider, Paper, Typography } from '@mui/material';
import Form from './form/form';

export default function Login() {
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
        <Form />
      </Box>
    </Paper>
  );
}
