import { Box, Grid, Paper, Typography } from '@mui/material';
import { PlaceOutlined, AccessTime, Note } from '@mui/icons-material';
import { fnFormat } from '../../../lib/utils/helper';

type Props = {
  activity: Activity;
};
export default function ActivityInfo({ activity }: Props) {
  return (
    <Box>
      <Paper sx={{ py: 2, px: 2, borderRadius: 0 }}>
        <Grid container spacing={1}>
          <Grid size={1}>
            <Note />
          </Grid>
          <Grid size={11}>
            <Typography variant="subtitle2" color="text.secondary">
              {activity.description}
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      <Paper sx={{ py: 2, px: 2, borderRadius: 0 }}>
        <Grid container spacing={1}>
          <Grid size={1}>
            <AccessTime />
          </Grid>
          <Grid size={11}>
            <Typography variant="subtitle2" color="text.secondary">
              {fnFormat(activity.date)}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
      <Paper sx={{ py: 2, px: 2, borderRadius: 0 }}>
        <Grid container spacing={1}>
          <Grid size={1}>
            <PlaceOutlined />
          </Grid>
          <Grid size={11}>
            <Typography variant="subtitle2" color="text.secondary">
              {activity.venue} / {activity.city}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
