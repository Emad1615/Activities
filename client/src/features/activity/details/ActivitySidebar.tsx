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
} from "@mui/material";
import Map from "../../../App/shared/components/Map";
import type { Activity } from "../../../lib/types";
type Props = {
  activity: Activity;
};
export default function ActivitySidebar({ activity }: Props) {
  const isHost = true;
  const following = true;
  return (
    <Box display={"flex"} flexDirection={"column"} gap={3}>
      <Paper>
        <Typography
          sx={{
            p: 1,
            bgcolor: "primary.main",
            textAlign: "center",
            color: "white",
            fontWeight: "400",
          }}
          variant="body1"
          color="inherit"
          children={"3 people is going"}
        />
        <Box sx={{ maxHeight: 280, overflowY: "auto" }}>
          {Array.from({ length: 3 }, (_, idx) => idx + 1).map((_,index) => (
            <Grid key={index} container spacing={1} alignItems={"center"}>
              <Grid size={9}>
                <List>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar
                        alt="bob"
                        sx={{
                          width: 40,
                          height: 40,
                        }}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      sx={{
                        fontWeight: "500",
                      }}
                      color="inherit"
                      primary={"Emad Ismail Mohammed"}
                      secondary={isHost ? "Hosting" : "Going"}
                      slotProps={{
                        primary: {
                          fontSize: ".8rem",
                          fontWeight: "bold",
                        },
                        secondary: {
                          color: "text.secondary",
                          fontSize: ".7rem",
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
                    sx={{ fontSize: ".8rem" }}
                    color="warning"
                  />
                )}
              </Grid>
            </Grid>
          ))}
        </Box>
      </Paper>
      <Paper elevation={3} sx={{ position: "relative" }}>
        <Map position={[activity.latitude!, activity.longitude!]}  venue={activity.venue}/>
      </Paper>
    </Box>
  );
}
