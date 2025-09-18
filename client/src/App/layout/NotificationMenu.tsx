import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { NotificationsActive } from '@mui/icons-material';
import { Avatar, ListItemText, Typography } from '@mui/material';
import { timeAgo } from '../../lib/utils/helper';

type Props = {
  notifications: NotificationT[];
  UserId: string;
  notifyAlert: boolean;
};
export default function NotificationMenu({
  notifications,
  UserId,
  notifyAlert,
}: Props) {
  const filteredNotifications = notifications.filter(
    (x) => x.notifierId !== UserId
  );
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <NotificationsActive
              sx={{ color: !notifyAlert ? 'white' : 'red' }}
            />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              width: 500,
              minHeight: 370,
              maxHeight: 400,
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              // mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {filteredNotifications.length === 0 && (
          <Typography
            variant="body2"
            sx={{
              py: 2,
              display: 'block',
              color: 'text.disabled',
              textAlign: 'center',
            }}
          >
            No notifications found...
          </Typography>
        )}
        {filteredNotifications.map((not) => (
          <MenuItem
            key={not.id}
            onClick={handleClose}
            sx={(theme) => ({
              bgcolor: theme.palette.grey[100],
              borderBottomColor: theme.palette.divider,
              borderBottomWidth: 1,
              borderBottomStyle: 'solid',
              whiteSpace: 'pre-wrap',
              transition: 'all  0.3s',
              '&:hover': {
                bgcolor: theme.palette.grey[200],
              },
            })}
          >
            <ListItemAvatar sx={{ minWidth: 40 }}>
              <Avatar
                src={not.notifierImageUrl}
                alt={`${not.notifierName} - image`}
              />
            </ListItemAvatar>
            <ListItemText
              primary={not.description}
              secondary={timeAgo(not.createdAt)}
              sx={{ pt: 2 }}
              slotProps={{
                primary: {
                  fontSize: 13,
                  fontWeight: 400,
                  color: 'textSecondary',
                },
                secondary: {
                  textAlign: 'right',
                  fontSize: 10,
                },
              }}
            />
          </MenuItem>
        ))}
      </Menu>
    </React.Fragment>
  );
}
