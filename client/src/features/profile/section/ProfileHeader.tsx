import {
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
type Props = {
  userProfile: User;
  isCurrentUser: boolean;
  FollowToggle: () => void;
  LoadingFollowToggle: boolean;
};
export default function ProfileHeader({
  userProfile,
  isCurrentUser,
  FollowToggle,
  LoadingFollowToggle,
}: Props) {
  console.log(userProfile);
  return (
    <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
      <Grid container spacing={3}>
        <Grid size={{ lg: 6, md: 6, xs: 12 }}>
          <Stack
            direction={'row'}
            alignItems={'center'}
            spacing={2}
            sx={{
              overflow: 'hidden',
            }}
          >
            <Avatar
              src={userProfile.imageUrl || '/assets/user.png'}
              alt={userProfile.displayName + ' image'}
              variant="circular"
              sx={{
                width: 160,
                height: 160,
              }}
            />
            <Stack
              direction={'column'}
              justifyContent={'center'}
              alignItems={'flex-start'}
              spacing={1}
            >
              <ListItemText
                primary={
                  <Typography
                    variant="h5"
                    fontWeight={'500'}
                    color="text.secondary"
                  >
                    {userProfile.displayName}
                  </Typography>
                }
                secondary={
                  userProfile.bio?.split(' ').slice(0, 5).join('') + '...' ||
                  'No bio'
                }
                slotProps={{
                  secondary: {
                    color: 'text.secondary',
                    fontSize: '.7rem',
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                  },
                }}
              />
              {!isCurrentUser && userProfile.following && (
                <Chip
                  variant="outlined"
                  color="secondary"
                  label={'Following'}
                  sx={{ borderRadius: 1 }}
                />
              )}
            </Stack>
          </Stack>
        </Grid>
        <Grid size={{ lg: 6, md: 6, xs: 12 }}>
          <Box display={'flex'} justifyContent={'space-around'}>
            <Stack direction={'column'} alignItems={'center'}>
              <Typography
                variant="h5"
                color="text.secondary"
                fontWeight={'500'}
              >
                Following
              </Typography>
              <Typography variant="subtitle1" fontWeight={'bold'}>
                {userProfile.followingCount || 0}
              </Typography>
            </Stack>
            <Stack direction={'column'} alignItems={'center'}>
              <Typography
                variant="h5"
                color="text.secondary"
                fontWeight={'500'}
              >
                Followers
              </Typography>
              <Typography variant="subtitle1" fontWeight={'bold'}>
                {userProfile.followersCount || 0}
              </Typography>
            </Stack>
          </Box>
          {!isCurrentUser && (
            <>
              <Divider sx={{ width: '100%', my: 2 }} />
              <Button
                onClick={() => FollowToggle()}
                disabled={LoadingFollowToggle}
                loading={LoadingFollowToggle}
                variant="outlined"
                sx={{ width: '100%' }}
                color={userProfile.following ? 'error' : 'primary'}
              >
                {userProfile.following ? 'Unfollow' : 'Follow'}
              </Button>
            </>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
}
