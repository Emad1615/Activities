import {
  Box,
  Button,
  CardActions,
  CardContent,
  Chip,
  Typography,
} from "@mui/material";
import Card from "@mui/material/Card";
import type { Activity } from "../../../lib/types/index";
import { useDeleteActivity } from "../../../lib/hooks/activities/useDeleteActivity";
import { useNavigate } from "react-router";

type Props = {
  activity: Activity;
};
export default function ActivityCard({ activity }: Props) {
  const { removeActivity, isLoadingRemoveActivity } = useDeleteActivity();
  const navigate = useNavigate();
  const { title, description, date, category } = activity;
  return (
    <Card sx={{ borderRadius: 3, my: 1 }}>
      <CardContent>
        <Typography variant="h5" fontWeight={"bold"}>
          {title}
        </Typography>
        <Typography sx={{ color: "text.secondary" }} variant="caption">
          {date}
        </Typography>
        <Typography variant="body1" pt={1}>
          {description}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Chip label={category} variant="outlined" color="info" size="medium" />
        <Box display="flex" gap={2} justifyContent={"space-between"}>
          <Button
            variant="text"
            color="info"
            size="medium"
            onClick={() => navigate(`/activities/${activity.id}`)}
          >
            View
          </Button>
          <Button
            variant="text"
            color="error"
            size="medium"
            onClick={async () => removeActivity(activity.id)}
            loading={isLoadingRemoveActivity}
          >
            Delete
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
}
