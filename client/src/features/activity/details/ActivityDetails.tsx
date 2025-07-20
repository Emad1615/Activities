import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

type Props = {
  selectedActivity: Activity | undefined;
  handleCancelSelectActivity: () => void;
  handleEditActivity: (id?: string) => void;
};
export default function ActivityDetails({
  selectedActivity,
  handleCancelSelectActivity,
  handleEditActivity,
}: Props) {
  const { id, title, description, date, city, category, venue } =
    selectedActivity || {};
  return (
    <Card>
      <CardMedia
        component={"img"}
        src={`/images/categoryImages/${category}.jpg`}
      ></CardMedia>
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
        <Typography variant="caption">
          {city}/{venue}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          sx={{ textTransform: "uppercase" }}
          color="success"
          size="medium"
          onClick={() => handleEditActivity(id)}
        >
          edit
        </Button>
        <Button
          sx={{ textTransform: "uppercase" }}
          variant="contained"
          color="inherit"
          size="medium"
          onClick={handleCancelSelectActivity}
        >
          Cancel
        </Button>
      </CardActions>
    </Card>
  );
}
