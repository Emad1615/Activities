import { Box, AppBar, Toolbar, Container, MenuItem } from '@mui/material';
import MenuItemLink from '../shared/components/MenuItemLink';
import Logo from '../shared/components/Logo';
import { useStore } from '../../lib/hooks/shared/useStore';
import { useUser } from '../../lib/hooks/account/useUser';
import UserMenu from './UserMenu';
import { observer } from 'mobx-react-lite';
import { useNotification } from '../../lib/hooks/notification/useNotification';
import NotificationMenu from './NotificationMenu';
import CircularProgress from '@mui/material/CircularProgress';

const NavBar = observer(function NavBar() {
  const { uiStore } = useStore();
  const { currentUser, isLoading } = useUser();
  const { storeNotification } = useNotification();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: '#845ec2',
        }}
      >
        <Container maxWidth="lg" disableGutters>
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
              {currentUser && (
                <>
                  <NotificationMenu
                    notifications={storeNotification.notifications}
                    notifyAlert={storeNotification.notifyAlert}
                    UserId={currentUser.id}
                    storeNotification={storeNotification}
                  />
                  <UserMenu
                    DisplayName={currentUser.displayName}
                    ImageUrl={currentUser.imageUrl!}
                    UserId={currentUser.id}
                  />
                </>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      {uiStore.isLoading && (
        <>
          <CircularProgress
            size={20}
            color="secondary"
            sx={{
              position: 'fixed',
              top: 75,
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          />
        </>
      )}
    </Box>
  );
});

export default NavBar;
