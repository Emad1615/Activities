import { Box, Container, CssBaseline } from "@mui/material";
import NavBar from "./NavBar";
import { Outlet } from "react-router";
import { SnackbarProvider } from "../../lib/context/snackbar";

function App() {
  return (
    <SnackbarProvider>
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: "#f0f0f0",
          overflow: "auto",
        }}
      >
        <CssBaseline />
        <NavBar />
        <Container maxWidth="xl" sx={{ mt: 13 }}>
          <Outlet />
        </Container>
      </Box>
    </SnackbarProvider>
  );
}

export default App;

// #845ec2
// #b39cd0
// #fbeaff
// #00c9a7
