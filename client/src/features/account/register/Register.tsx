import Grid from '@mui/material/Grid';
import RegisterForm from './form/RegisterForm';
import { Box } from '@mui/material';

export default function Register() {
  return (
    <Grid
      container
      sx={{
        height: '98vh',
      }}
    >
      <Grid
        size={6}
        sx={{
          backgroundImage: 'url(/images/categoryImages/culture.jpg)',
          objectFit: 'cover',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      ></Grid>
      <Grid size={6} sx={{ height: '98%' }}>
        <Box
          display="flex"
          flexDirection="column"
          gap={1}
          alignItems="center"
          justifyContent={'flex-start'}
          p={2}
          height={'98%'}
          sx={{
            backgroundColor: '#FCF8F8',
          }}
        >
          <RegisterForm />
        </Box>
      </Grid>
    </Grid>
  );
}
