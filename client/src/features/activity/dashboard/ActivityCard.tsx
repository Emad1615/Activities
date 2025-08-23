import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  Typography,
} from '@mui/material';
import { Place, AccessTime } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router';
import { DateFormat } from '../../../lib/utils/helper';
import AvatarPopover from '../../../App/shared/components/AvatarPopover';

type Props = {
  activity: Activity;
};
export default function ActivityCard({ activity }: Props) {
  const navigate = useNavigate();
  const label = activity.IsHost
    ? 'You are hosting this activity'
    : 'You are going to this activity';
  const color = activity.IsHost
    ? 'secondary'
    : activity.IsGoing
    ? 'warning'
    : 'default';
  return (
    <Card elevation={3} sx={{ borderRadius: 3, my: 1 }}>
      <Box display="flex" justifyContent={'space-between'}>
        <CardHeader
          avatar={<Avatar sx={{ width: 50, height: 50 }} />}
          title={activity.title}
          subheader={
            <>
              Hosted by{' '}
              <Link
                to={`/profiles/${activity.hostUserId}`}
                style={{ textDecoration: 'none' }}
              >
                {activity.hostDisplayName}
              </Link>
            </>
          }
          slotProps={{
            title: {
              fontWeight: 'bold',
              fontSize: '.9rem',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              maxWidth: '18rem',
            },
            subheader: {
              fontSize: '.7rem',
              color: 'text.secondary',
            },
          }}
        />
      </Box>
      <CardMedia
        component={'img'}
        width={'100%'}
        height={'100'}
        src={`/images/categoryImages/${activity.category}.jpg`}
        sx={{
          width: '100%',
          height: '200px',
          objectFit: 'cover',
        }}
      />
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
        px={1}
        pt={0.5}
      >
        <Box display={'flex'} alignItems={'center'} gap={0.5}>
          <Place sx={{ color: 'text.secondary' }} fontSize={'small'} />
          <Typography
            variant="caption"
            color="text.secondary"
            fontSize={'.8rem'}
          >
            {activity.city}
          </Typography>
        </Box>
        <Box display={'flex'} alignItems={'center'} gap={0.5}>
          <AccessTime sx={{ color: 'text.secondary' }} fontSize={'small'} />
          <Typography
            variant="caption"
            color="text.secondary"
            fontSize={'.8rem'}
          >
            {DateFormat(activity.date)}
          </Typography>
        </Box>
      </Box>
      <Box
        display={'flex'}
        alignItems={'center'}
        justifyContent={'start'}
        gap={1}
        sx={{ bgcolor: 'grey.50', py: 2, px: 2, my: 1 }}
      >
        {activity.attendees?.map((att) => (
          <AvatarPopover profile={att} key={att.id} />
        ))}
      </Box>
      <CardContent>
        <Typography variant="body2" color="text.secondary" fontSize={'.8rem'}>
          {activity.description}
        </Typography>
        <Box display={'flex'} justifyContent={'space-between'} mt={3}>
          <Box display={'flex'} alignItems={'center'} mr={2} gap={1}>
            {(activity.IsHost || activity.IsGoing) && (
              <Chip
                label={label}
                variant={'outlined'}
                color={color}
                size="small"
                sx={{ fontSize: '.7rem', fontWeight: 'bold' }}
              />
            )}
            {activity.isCancelled && (
              <Chip
                label={'Cancelled'}
                variant={'outlined'}
                color={'error'}
                size="small"
                sx={{ fontSize: '.7rem', fontWeight: 'bold' }}
              />
            )}
          </Box>
          <Button
            variant="text"
            color="secondary"
            size="small"
            onClick={() => navigate(`/activities/${activity.id}`)}
          >
            View
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
