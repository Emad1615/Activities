import { Group } from "@mui/icons-material";
import {
  Box,
  AppBar,
  Toolbar,
  Button,
  Container,
  MenuItem,
  Typography,
} from "@mui/material";

export default function NavBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="sticky"
        sx={{
          backgroundImage:
            "linear-gradient(90deg,rgba(42, 123, 155, 1) 0%, rgba(87, 199, 133, 1) 100%)",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box>
              <MenuItem sx={{ display: "flex", gap: 2 }}>
                <Group fontSize="large" />
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  children={"Reactivities"}
                />
              </MenuItem>
            </Box>
            <Box sx={{ display: "flex" }}>
              <MenuItem
                sx={{
                  fontSize: "1rem",
                  textTransform: "uppercase",
                  fontWeight: "600",
                }}
              >
                Activities
              </MenuItem>
              <MenuItem
                sx={{
                  fontSize: "1rem",
                  textTransform: "uppercase",
                  fontWeight: "600",
                }}
              >
                about
              </MenuItem>
              <MenuItem
                sx={{
                  fontSize: "1rem",
                  textTransform: "uppercase",
                  fontWeight: "600",
                }}
              >
                contacts
              </MenuItem>
              <Button variant="outlined" color="info" size="small">
                Create Activity
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
