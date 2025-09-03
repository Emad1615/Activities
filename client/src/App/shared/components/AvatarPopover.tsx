import * as React from 'react';
import Popover from '@mui/material/Popover';
import { Avatar, Box } from '@mui/material';
import ProfileCard from '../../../features/profile/section/ProfileCard';
import { Link } from 'react-router';

type Props = {
  profile: User;
};
export default function AvatarPopover({ profile }: Props) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <Box
      sx={{ cursor: 'pointer' }}
      component={Link}
      to={`/profile/${profile.id}`}
    >
      <Avatar
        alt={profile.displayName + ' Image'}
        src={profile.imageUrl || '/images/user.png'}
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        sizes="small"
      />
      <Popover
        aria-hidden="false"
        id="mouse-over-popover"
        sx={{ pointerEvents: 'none' }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <ProfileCard profile={profile} />
      </Popover>
    </Box>
  );
}
