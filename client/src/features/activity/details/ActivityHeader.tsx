import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Typography,
} from '@mui/material';
import { fnFormat } from '../../../lib/utils/helper';
import { Link } from 'react-router';
import useUpdateAttendance from '../../../lib/hooks/activities/useUpdateAttendance';
type Props = {
  activity: Activity;
};
export default function ActivityHeader({ activity }: Props) {
  const { attendanceAction, isPending } = useUpdateAttendance(activity.id);
  return (
    <Card
      elevation={2}
      sx={{
        width: '100%',
        height: '320px',
        backgroundImage: ` url(/images/categoryImages/${activity.category}.jpg) `,
        backgroundSize: 'cover',
        position: 'relative',
      }}
    >
      <CardContent
        sx={{
          width: '100%',
          height: '100% ',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          zIndex: 1,
          bgcolor: '#00000087',
          p: 0,
        }}
      >
        {activity.isCancelled && (
          <Chip
            color="error"
            label="Cancelled"
            variant="filled"
            size="small"
            sx={{
              fontSize: '10px',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              m: 1,
            }}
          />
        )}
        <Box
          sx={{
            display: 'flex',
            position: 'absolute',
            bottom: 0,
            width: '100%',
            py: 2,
            px: 2,
            color: 'white',
            justifyContent: 'space-between',
            alignItems: 'end',
            zIndex: 2,
          }}
        >
          <Box sx={{ color: 'white' }}>
            <Typography
              variant="h5"
              fontWeight={'bold'}
              children={activity.title}
            />
            <Typography
              variant="subtitle1"
              children={fnFormat(activity.date)}
            />
            <Typography
              variant="caption"
              children={
                <>
                  Hosted by {activity.hostDisplayName}
                  <Box
                    component={Link}
                    to={`/profiles/${activity.hostUserId}`}
                    sx={{ color: 'white' }}
                  >
                    Bob
                  </Box>
                </>
              }
            />
          </Box>
          <Box
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            gap={1}
          >
            {activity.IsHost ? (
              <>
                <Button
                  onClick={() => attendanceAction()}
                  variant="contained"
                  color={`${activity.isCancelled ? 'secondary' : 'error'}`}
                  size="small"
                  sx={{ textTransform: 'uppercase', fontSize: '12px' }}
                  disabled={isPending}
                >
                  {activity.isCancelled ? 'reactivate event' : 'Cancel event'}
                </Button>
                <Button
                  component={Link}
                  to={`/manage/${activity.id}`}
                  variant="contained"
                  color="primary"
                  size="small"
                  sx={{ textTransform: 'uppercase', fontSize: '12px' }}
                >
                  Manage event
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="contained"
                  color={`${activity.IsGoing ? 'warning' : 'info'}`}
                  size="small"
                  sx={{ textTransform: 'uppercase', fontSize: '12px' }}
                  onClick={() => attendanceAction()}
                  disabled={isPending || activity.isCancelled}
                >
                  {activity.IsGoing ? 'Cancel Attendance' : 'Join Activity'}
                </Button>
              </>
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
