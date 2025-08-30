import { Person } from '@mui/icons-material';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Divider,
  ListItemText,
  Typography,
} from '@mui/material';
import { Link } from 'react-router';

type Props = {
  profile: User;
};
export default function ProfileCard({ profile }: Props) {
  //   const isFollowing = false;
  return (
    <Link to={`/profile/${profile.id}`} style={{ textDecoration: 'none' }}>
      <Card elevation={3} sx={{ borderRadius: 4, p: 2, maxWidth: 300 }}>
        <CardMedia
          component={'img'}
          alt={`${profile.displayName} + Image`}
          src={profile.imageUrl || '/images/user.png'}
          sx={{
            width: '100%',
            height: 200,
            zIndex: 50,
          }}
        />
        <CardContent>
          <Box
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
            gap={1}
          >
            <ListItemText
              primary={profile.displayName}
              secondary={profile.bio}
              slotProps={{
                primary: { fontWeight: 'bold', fontSize: '1.1rem' },
                secondary: { fontSize: '.8rem', color: 'text.secondary' },
              }}
            />
          </Box>
        </CardContent>
        <Divider />
        <Box
          display={'flex'}
          alignItems={'center'}
          justifyContent={'start'}
          py={2}
        >
          <Person />
          <Typography
            ml={1}
            variant="body2"
            color="text.secondary"
            fontSize={'.9rem'}
          >
            20 Followers
          </Typography>
        </Box>
      </Card>
    </Link>
  );
}
