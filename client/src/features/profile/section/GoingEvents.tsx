import { Box, Grid, Skeleton, Typography } from '@mui/material';
import { useProfile } from '../../../lib/hooks/profile/useProfile';
import { useParams } from 'react-router';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import MiniActivityCard from '../../../App/shared/components/MiniActivityCard';

export default function GoingEvents() {
  const { id } = useParams();
  const {
    userActivitiesGroup,
    fetchNextPage,
    hasNextPage,
    loadingUserProfileActivities,
  } = useProfile(id);
  const { ref, inView } = useInView({
    threshold: 0.5,
  });
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);
  if (loadingUserProfileActivities)
    return (
      <Grid spacing={2} container>
        {Array.from({ length: 3 }).map((_, idx) => (
          <Box key={idx} sx={{ width: 210, marginRight: 0.5, my: 5 }}>
            <Skeleton variant="rectangular" width={210} height={118} />
            <Skeleton />
            <Skeleton width="60%" />
          </Box>
        ))}
      </Grid>
    );

  return (
    <Box sx={{ overflowY: 'auto', height: 375, p: 1 }}>
      {userActivitiesGroup?.pages.map((page, index) => (
        <>
          {page.items.length === 0 && (
            <Typography
              variant="body2"
              color="text.disabled"
              textAlign={'center'}
            >
              No past activities not found...
            </Typography>
          )}
          <Box
            ref={index === userActivitiesGroup.pages?.length ? ref : null}
            key={index}
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))',
              gap: 2,
              justifyContent: 'center',
              alignItems: 'flex-start',
            }}
          >
            {page.items.map((activity, idx) => (
              <MiniActivityCard key={idx} activity={activity} />
            ))}
          </Box>
        </>
      ))}
    </Box>
  );
}
