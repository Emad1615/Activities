import { EventNote } from '@mui/icons-material';
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { ClockIcon } from '@mui/x-date-pickers';
import { Link } from 'react-router';
import { fnFormat } from '../../../lib/utils/helper';
type Props = {
  activity: Activity;
};
export default function MiniActivityCard({ activity }: Props) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={`/images/categoryImages/${activity.category}.jpg`}
        title="green iguana"
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="subtitle2"
          component={Link}
          to={`/activities/${activity.id}`}
          sx={{
            textDecoration: 'none',
            color: 'inherit',
            textTransform: 'uppercase',
          }}
          display={'block'}
        >
          {activity.title}
        </Typography>
        <Typography
          variant="caption"
          color="text.secondary"
          fontSize={'small'}
          sx={{}}
        >
          {activity.description}
        </Typography>
        <Box position={'relative'} my={2}>
          <Typography
            variant="caption"
            sx={{
              position: 'absolute',
              left: 1,
              bottom: 0,
              top: 0,
              fontWeight: 'bold',
            }}
            color="text.secondary"
            display={'flex'}
            gap={0.4}
          >
            <EventNote sx={{ fontSize: '16px', color: 'text.secondary' }} />
            {activity.category}
          </Typography>
          <Typography
            variant="caption"
            sx={{
              position: 'absolute',
              right: 0,
              bottom: 0,
              top: 0,
              fontWeight: 'bold',
              fontSize: '0.75rem',
            }}
            color="text.disabled"
            display={'flex'}
            gap={0.4}
          >
            <ClockIcon sx={{ fontSize: '16px', color: 'text.secondary' }} />
            {fnFormat(activity.date)}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
