import { Box, Divider, Typography } from '@mui/material';
import { useProfile } from '../../../lib/hooks/profile/useProfile';
import { useParams } from 'react-router';
import ProfileCard from './ProfileCard';

type Props = {
  activeTab: number;
};
export default function ProfileFollow({ activeTab }: Props) {
  const { id } = useParams();
  const predicate = activeTab === 3 ? 'followers' : 'followings';
  const { userProfile, FollowingList } = useProfile(id, predicate);
  return (
    <Box>
      <Typography variant="subtitle2" color="text.secondary">
        {predicate === 'followers'
          ? `Peoples Follow ${userProfile?.displayName}`
          : `Peoples Followed by ${userProfile?.displayName}`}
      </Typography>
      <Divider variant="middle" sx={{ py: 1 }} />
      <Box
        display={'flex'}
        justifyContent={'flex-start'}
        alignItems={'center'}
        gap={3}
        flexWrap={'wrap'}
        py={2}
      >
        {FollowingList?.map((user: User, idx: number) => (
          <ProfileCard key={idx} profile={user} />
        ))}
      </Box>
    </Box>
  );
}
