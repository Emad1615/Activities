import { Box, AppBar, Toolbar, Container } from "@mui/material";
import MenuItemLink from "../shared/components/MenuItemLink";
import Logo from "../shared/components/Logo";

export default function NavBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "#845ec2",
        }}
      >
        <Container maxWidth="xl" disableGutters>
          <Toolbar
            disableGutters
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box>
              <Logo />
            </Box>
            <Box sx={{ display: "flex" }}>
              <MenuItemLink to="/activities">Activities</MenuItemLink>
              <MenuItemLink to="/createActivity">create activity</MenuItemLink>
              <MenuItemLink to="/">user menu</MenuItemLink>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
