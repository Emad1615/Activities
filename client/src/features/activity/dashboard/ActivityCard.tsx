import { Box, Button, CardActions, CardContent, Chip, Typography } from "@mui/material";
import Card from "@mui/material/Card";

type Props = {
  activity: Activity;
};
export default function ActivityCard({ activity }: Props) {
  const {
    title,
    description,
    date,
    city,
    category,
    venue,
  } = activity;
  return (
    <Card sx={{ borderRadius: 3, my: 1 }}>
      <CardContent>
        <Typography variant="h5" fontWeight={'bold'}>{title}</Typography>
        <Typography sx={{color:'text.secondary'}} variant="caption">{date}</Typography>
        <Typography variant="body1" pt={1}>{description}</Typography>
        <Typography variant="caption" >{city}/{venue}</Typography>

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
          <Button variant="text" color="info" size="medium">
            View
          </Button>
          <Button variant="text" color="error" size="medium">
            Delete
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
}
