import { Box, Container, CssBaseline } from '@mui/material';
import NavBar from './NavBar';
import { Outlet, ScrollRestoration } from 'react-router';
import { SnackbarProvider } from '../../lib/context/snackbar';
import { Suspense } from 'react';
import Loader from '../shared/components/Loader';

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <SnackbarProvider>
        <Box
          sx={{
            minHeight: '100vh',
            backgroundColor: '#eeeeee',
          }}
        >
          <ScrollRestoration />
          <CssBaseline />
          <NavBar />
          <Container maxWidth="lg" sx={{ pt: 13 }}>
            <Outlet />
          </Container>
        </Box>
      </SnackbarProvider>
    </Suspense>
  );
}

export default App;

// #845ec2
// #b39cd0
// #fbeaff
// #00c9a7
//#4b4453
//#b0a8b9
//#c34a36
//#ff8066
//#fcf8ff
//#d5cabd
//#296073
//#3596b5
//#adc5cf
//#b25b00
//#008c81
//#bea6a0
