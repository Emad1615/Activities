import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {
  Avatar,
  Divider,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  ChangeCircle,
  Event,
  List,
  Logout as LogoutIcon,
  Person,
} from '@mui/icons-material';
import { Link } from 'react-router';
import { useLogout } from '../../lib/hooks/account/useLogout';

type Props = {
  DisplayName: string;
  ImageUrl: string;
  UserId: string;
};
export default function UserMenu({ DisplayName, ImageUrl, UserId }: Props) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { Logout, isPending } = useLogout();
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button onClick={handleClick} color="inherit">
        <MenuItem>
          <ListItemAvatar>
            <Avatar src={ImageUrl} alt={DisplayName} />
          </ListItemAvatar>
          <ListItemText
            primary={DisplayName}
            slotProps={{
              primary: {
                textTransform: 'none',
                fontSize: 15,
              },
            }}
          />
        </MenuItem>
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem
          component={Link}
          to={`/profile/${UserId}`}
          onClick={handleClose}
        >
          <ListItemIcon>
            <Person />
          </ListItemIcon>
          <ListItemText>Profile</ListItemText>
        </MenuItem>
        <MenuItem component={Link} to="/createActivity" onClick={handleClose}>
          <ListItemIcon>
            <Event />
          </ListItemIcon>
          <ListItemText>Create activity</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <List />
          </ListItemIcon>
          <ListItemText>Activities management</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem component={Link} to="/change-password" onClick={handleClose}>
          <ListItemIcon>
            <ChangeCircle />
          </ListItemIcon>
          <ListItemText>Change password</ListItemText>
        </MenuItem>
        <MenuItem
          disabled={isPending}
          onClick={async () => {
            await Logout();
            handleClose();
          }}
        >
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </MenuItem>
      </Menu>
    </div>
  );
}
