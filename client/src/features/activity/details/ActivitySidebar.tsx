import {
  Avatar,
  Box,
  Chip,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material';
import Map from '../../../App/shared/components/Map';
type Props = {
  activity: Activity;
};
export default function ActivitySidebar({ activity }: Props) {
  const following = true;
  return (
    <Box display={'flex'} flexDirection={'column'} gap={3}>
      <Paper>
        <Typography
          sx={{
            p: 1,
            bgcolor: 'primary.main',
            textAlign: 'center',
            color: 'white',
            fontWeight: '400',
          }}
          variant="body1"
          color="inherit"
          children={`${activity.attendees?.length} people is going`}
        />
        <Box sx={{ maxHeight: 280, overflowY: 'auto' }}>
          {activity.attendees
            ?.sort((a, b) => Number(b.isHost) - Number(a.isHost))
            ?.map((att, index) => (
              <Grid
                key={index}
                container
                spacing={1}
                alignItems={'center'}
                sx={{
                  borderBottomColor: (theme) => theme.palette.divider,
                  borderBottomStyle: 'solid',
                  borderBottomWidth: '1px',
                }}
              >
                <Grid size={9}>
                  <List>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar
                          variant="rounded"
                          alt={att.displayName + ' Image'}
                          src={att.imageUrl}
                          sx={{
                            width: 50,
                            height: 50,
                            mr: 2,
                          }}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        sx={{
                          fontWeight: '500',
                        }}
                        color="inherit"
                        primary={att.displayName}
                        secondary={
                          activity.hostUserId == att.id ? (
                            <Typography
                              variant="caption"
                              fontSize={'.7rem'}
                              color="secondary"
                              fontWeight={500}
                              children={' Hosting'}
                            />
                          ) : (
                            <Typography
                              variant="caption"
                              fontSize={'.7rem'}
                              color="info"
                              fontWeight={500}
                              children={' Hosting'}
                            />
                          )
                        }
                        slotProps={{
                          primary: {
                            fontSize: '1rem',
                            fontWeight: '500',
                          },
                          secondary: {
                            color: 'text.secondary',
                            fontSize: '.7rem',
                          },
                        }}
                      />
                    </ListItem>
                  </List>
                </Grid>
                <Grid size={3}>
                  {following && (
                    <Chip
                      label="Following"
                      variant="outlined"
                      size="small"
                      sx={{ fontSize: '.8rem' }}
                      color="warning"
                    />
                  )}
                </Grid>
              </Grid>
            ))}
        </Box>
      </Paper>
      <Paper elevation={3} sx={{ position: 'relative' }}>
        <Map
          position={[activity.latitude!, activity.longitude!]}
          venue={activity.venue}
        />
      </Paper>
    </Box>
  );
}
