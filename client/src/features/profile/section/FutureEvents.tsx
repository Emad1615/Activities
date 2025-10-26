import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Skeleton,
  Typography,
} from '@mui/material';
import { useProfile } from '../../../lib/hooks/profile/useProfile';
import { useParams } from 'react-router';

export default function FutureEvents() {
  const { id } = useParams();
  const { userActivitiesGroup, loadingUserProfileActivities } = useProfile(id);
  if (loadingUserProfileActivities)
    return (
      <Grid container spacing={2}>
        {Array.from({ length: 3 }).map((_, index) => (
          <Box key={index} sx={{ width: 210, marginRight: 0.5, my: 5 }}>
            <Skeleton variant="rectangular" width={210} height={118} />
            <Skeleton />
            <Skeleton width="60%" />
          </Box>
        ))}
      </Grid>
    );
  console.log('userActivitiesGroup in FutureEvents:', userActivitiesGroup);
  return (
    <Box sx={{ overflowY: 'auto', height: 375, p: 1 }}>
      {userActivitiesGroup?.pages.map((page, idx) => (
        <Box
          key={idx}
          display={'grid'}
          gridTemplateColumns={'repeat(auto-fit,minmax(210px, 1fr))'}
          gap={2}
          justifyContent={'center'}
          alignItems={'flex-start'}
        >
          {page.items.map((activity, index) => (
            <Box key={index} sx={{ width: 250, marginRight: 0.5, my: 5 }}>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  sx={{ height: 140 }}
                  image={`/images/categoryImages/${activity.category}.jpg`}
                  title="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="subtitle2" component="div">
                    {activity.title}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ color: 'text.secondary' }}
                  >
                    {activity.description}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  );
}
