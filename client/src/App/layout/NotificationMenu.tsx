import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { Circle, HideSource, NotificationsActive } from '@mui/icons-material';
import { Avatar, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { timeAgo } from '../../lib/utils/helper';
import { useNavigate } from 'react-router';
import { NotificationTypes } from '../../lib/types/enums';
import { useHideNotification } from '../../lib/hooks/notification/useHideNotification';

type Props = {
  notifications: NotificationT[];
  UserId: string;
  notifyAlert: boolean;
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  storeNotification?: any;
};
export default function NotificationMenu({
  notifications,
  UserId,
  notifyAlert,
  storeNotification,
}: Props) {
  const filteredNotifications = notifications.filter(
    (x) => x.notifierId !== UserId
  );
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const navigate = useNavigate();
  const { hideNotifications } = useHideNotification();
  const handleClose = () => {
    setAnchorEl(null);
    storeNotification.notifyAlert = false;
  };

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Notifications">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2, position: 'relative' }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <NotificationsActive sx={{ color: 'white' }} />
            <Circle
              sx={{
                fontSize: '8px',
                position: 'absolute',
                top: 12,
                color: !notifyAlert ? 'white' : 'tomato',
              }}
            />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              width: 500,
              minHeight: 370,
              maxHeight: 400,
              overflowY: 'scroll',
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
              '&::-webkit-scrollbar': {
                width: '3px',
              },
              '&::-webkit-scrollbar-track': {
                backgroundColor: '#f0f0f0',
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: (theme) => theme.palette.secondary.light,
              },
              '&::-webkit-scrollbar-thumb:hover': {
                backgroundColor: (theme) => theme.palette.secondary.main,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Typography
          variant="subtitle2"
          sx={{
            pb: '5px',
            display: 'block',
            textAlign: 'center',
            color: (theme) => `${theme.palette.secondary.light}`,
            borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
          }}
        >
          Notifications
        </Typography>
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
            onClick={() => {
              if (NotificationTypes.AddActivity === not.notificationTypeId)
                navigate(`/activities/${not.activityId}`);
              handleClose();
            }}
            sx={(theme) => ({
              position: 'relative',
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
            <ListItemIcon
              sx={{
                position: 'absolute',
                right: -10,
                transition: 'all 0.3s',
                '&:hover': {
                  transform: 'scale(1.3)',
                },
              }}
              onClick={(e) => {
                e.stopPropagation();
                hideNotifications(not.id);
              }}
            >
              <HideSource sx={{ fontSize: '13px', color: 'text.disabled' }} />
            </ListItemIcon>
          </MenuItem>
        ))}
      </Menu>
    </React.Fragment>
  );
}
