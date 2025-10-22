import { Box, CircularProgress, Typography } from '@mui/material';
import ActivityCard from './ActivityCard';
import { useActivities } from '../../../lib/hooks/activities/useActivities';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';

const ActivityList = observer(function ActivityList() {
  const { activitiesGroup, activitiesLoading, hasNextPage, fetchNextPage } =
    useActivities();
  const { inView, ref } = useInView({
    threshold: 0.5,
  });
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);
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
        <Box
          key={idx}
          ref={idx === activitiesGroup.pages.length - 1 ? ref : null}
          display={'flex'}
          flexDirection={'column'}
          gap={1}
        >
          {page.items.length === 0 && (
            <Typography
              color="text.secondary"
              variant="body2"
              textAlign={'center'}
            >
              There are no activities to display at the moment...
            </Typography>
          )}
          {page.items.map((activity, index) => (
            <ActivityCard key={index} activity={activity} />
          ))}
        </Box>
      ))}
    </Box>
  );
});
export default ActivityList;
