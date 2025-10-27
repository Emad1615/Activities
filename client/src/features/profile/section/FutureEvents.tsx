import { Box, Grid, Skeleton } from '@mui/material';
import { useProfile } from '../../../lib/hooks/profile/useProfile';
import { useParams } from 'react-router';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import MiniActivityCard from '../../../App/shared/components/MiniActivityCard';

export default function FutureEvents() {
  const { ref, inView } = useInView({
    threshold: 0,
  });

  const { id } = useParams();
  const {
    userActivitiesGroup,
    loadingUserProfileActivities,
    hasNextPage,
    fetchNextPage,
  } = useProfile(id);
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);
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
          ref={idx === userActivitiesGroup.pages.length - 1 ? ref : null}
        >
          {page.items.map((activity, index) => (
            <MiniActivityCard key={index} activity={activity} />
          ))}
        </Box>
      ))}
    </Box>
  );
}
