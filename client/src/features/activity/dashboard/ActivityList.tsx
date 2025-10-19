import { Box, CircularProgress, Typography } from '@mui/material';
import ActivityCard from './ActivityCard';
import { useActivities } from '../../../lib/hooks/activities/useActivities';
import { Fragment } from 'react/jsx-runtime';

export default function ActivityList() {
  const { activitiesGroup, activitiesLoading } = useActivities();
  if (activitiesLoading)
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CircularProgress />
      </Box>
    );
  if (activitiesGroup == null) {
    return (
      <Typography color="text.secondary" variant="body2" textAlign={'center'}>
        There are no activities to display at the moment...
      </Typography>
    );
  }
  return (
    <Box>
      {activitiesGroup.pages.map((page, idx) => (
        <Fragment key={idx}>
          {page.items.map((activity, index) => (
            <ActivityCard key={index} activity={activity} />
          ))}
        </Fragment>
      ))}
    </Box>
  );
}
