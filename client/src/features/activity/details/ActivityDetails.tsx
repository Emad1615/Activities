import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router";
import { useActivity } from "../../../lib/hooks/activities/useActivity";

export default function ActivityDetails() {
  const { id } = useParams<string>();
  const navigate = useNavigate();
  const { activity, activityLoading } = useActivity(id ?? "");
  if (activityLoading)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  if (!activity)
    return <Typography variant="h5">Activity not found</Typography>;
  return (
    <Card>
      <CardMedia
        component={"img"}
        src={`/images/categoryImages/${activity.category}.jpg`}
      ></CardMedia>
      <CardContent>
        <Typography variant="h5" fontWeight={"bold"}>
          {activity.title}
        </Typography>
        <Typography sx={{ color: "text.secondary" }} variant="caption">
          {activity.date}
        </Typography>
        <Typography variant="body1" pt={1}>
          {activity.description}
        </Typography>
        <Typography variant="caption">
          {activity.city}/{activity.venue}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          sx={{ textTransform: "uppercase" }}
          color="success"
          size="medium"
          onClick={() => navigate(`/manage/${activity.id}`)}
        >
          edit
        </Button>
        <Button
          sx={{ textTransform: "uppercase" }}
          variant="contained"
          color="inherit"
          size="medium"
          onClick={() => navigate("/activities")}
        >
          Cancel
        </Button>
      </CardActions>
    </Card>
  );
}
