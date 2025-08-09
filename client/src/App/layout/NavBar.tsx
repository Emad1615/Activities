import {
  Box,
  AppBar,
  Toolbar,
  Container,
  LinearProgress,
  MenuItem,
} from '@mui/material';
import MenuItemLink from '../shared/components/MenuItemLink';
import Logo from '../shared/components/Logo';
import { Observer } from 'mobx-react-lite';
import { useStore } from '../../lib/hooks/shared/useStore';
import { useUser } from '../../lib/hooks/account/useUser';
import UserMenu from './UserMenu';

export default function NavBar() {
  const { uiStore } = useStore();
   const { currentUser, isLoading } = useUser();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: '#845ec2',
          position: 'relative',
        }}
      >
        <Container maxWidth="xl" disableGutters>
          <Toolbar
            disableGutters
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Box>
              <Logo />
            </Box>
            <Box sx={{ display: 'flex' }}>
              <MenuItemLink to="/activities">Activities</MenuItemLink>
              {isLoading && (
                <MenuItem
                  sx={{
                    fontSize: '.8rem',
                    textTransform: 'uppercase',
                    fontWeight: '500',
                  }}
                >
                  Loading...
                </MenuItem>
              )}
              {currentUser ? (
                <>
                  <UserMenu DisplayName={currentUser.displayName} ImageUrl={currentUser.ImageUrl!}/>
                </>
              ) : (
                <>
                  <MenuItemLink to="/login">Login</MenuItemLink>
                  <MenuItemLink to="/register">Register</MenuItemLink>
                </>
              )}
            </Box>
          </Toolbar>
        </Container>
        <Observer>
          {() => (
            <>
              {uiStore.isLoading && (
                <LinearProgress
                  color="secondary"
                  sx={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    bottom: 0,
                    right: 0,
                    height: 4,
                  }}
                />
              )}
            </>
          )}
        </Observer>
      </AppBar>
    </Box>
  );
}
