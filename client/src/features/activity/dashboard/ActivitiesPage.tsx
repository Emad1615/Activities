import Grid from '@mui/material/Grid';
import ActivityList from './ActivityList';
import ActiviiesFilters from './ActiviiesFilters';
import { Button } from '@mui/material';
import { useActivities } from '../../../lib/hooks/activities/useActivities';

export default function ActivitiesPage() {
  const { fetchNextPage, hasNextPage, isFetchingNextPage } = useActivities();
  return (
    <Grid container spacing={3}>
      <Grid size={8}>
        <ActivityList />
        <Button
          sx={{ my: 2, float: 'right' }}
          variant="contained"
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage || !hasNextPage}
        >
          Load more
        </Button>
      </Grid>
      <Grid size={4} mt={1}>
        <ActiviiesFilters />
      </Grid>
    </Grid>
  );
}
