import { Box, Grid, Paper, Skeleton } from '@mui/material';
import ProfileHeader from './section/ProfileHeader';
import ProfileContent from './section/ProfileContent';
import { useParams } from 'react-router';
import { useProfile } from '../../lib/hooks/profile/useProfile';

export default function ProfilePage() {
  const { id } = useParams();
  const {
    userProfile,
    loadingProfile,
    isCurrentUser,
    FollowToggle,
    LoadingFollowToggle,
  } = useProfile(id);
  if (loadingProfile)
    return (
      <Box display={'flex'} flexDirection="column" gap={2}>
        <Skeleton
          variant="rectangular"
          component={Paper}
          width={'100%'}
          height={300}
        />
        <Skeleton
          variant="rectangular"
          component={Paper}
          width={'100%'}
          height={500}
        />
      </Box>
    );
  if (!userProfile) return <div>No profile found</div>;
  return (
    <Grid container spacing={2}>
      <Grid size={12}>
        <ProfileHeader
          userProfile={userProfile}
          isCurrentUser={isCurrentUser}
          FollowToggle={FollowToggle}
          LoadingFollowToggle={LoadingFollowToggle}
        />
      </Grid>
      <Grid size={12}>
        <ProfileContent />
      </Grid>
    </Grid>
  );
}
