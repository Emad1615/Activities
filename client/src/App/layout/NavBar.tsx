import { Box, AppBar, Toolbar, Container, LinearProgress } from "@mui/material";
import MenuItemLink from "../shared/components/MenuItemLink";
import Logo from "../shared/components/Logo";
import { Observer } from "mobx-react-lite";
import { useStore } from "../../lib/hooks/shared/useStore";

export default function NavBar() {
  const {uiStore}=useStore()
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "#845ec2",
          position:'relative'
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
              <MenuItemLink to="/counter">Counter by Mobx</MenuItemLink>
              <MenuItemLink to="/errors">Errors</MenuItemLink>
              <MenuItemLink to="/">user menu</MenuItemLink>
            </Box>
          </Toolbar>
        </Container>
        <Observer>
            {
              ()=>(
                <>
                  {uiStore.isLoading && <LinearProgress  color="secondary" sx={{
                    position:'absolute',
                    top:'100%',
                    left:0,
                    bottom:0,
                    right:0,
                    height:4
                  }}/>}
                </>
              )
            }
        </Observer>
      </AppBar>
    </Box>
  );
}
