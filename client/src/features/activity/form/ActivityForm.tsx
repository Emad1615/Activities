import { Box, Button, Paper, TextField, Typography } from "@mui/material";

type Props = {
  handleCancelEditActivity: () => void;
  activity: Activity | undefined;
};
export default function ActivityForm({
  handleCancelEditActivity,
  activity,
}: Props) {
  const { id, title, description, date, city, category, venue } =
    activity || {};
  return (
    <Paper>
      <Box
        component="form"
        sx={{
          p: 2,
        }}
      >
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            textTransform: "uppercase",
            borderBottom: 1,
            mb: 2,
            borderColor: "divider",
          }}
          fontWeight={"bold"}
          color="textSecondary"
        >
          Activity Form
        </Typography>
        <Box display="flex" flexDirection="column" gap={1}>
          <TextField
            id="outlined-basic"
            label="Title"
            variant="outlined"
            name="title"
            defaultValue={title}
          />
          <TextField
            id="outlined-basic"
            label="Category"
            variant="outlined"
            name="category"
            defaultValue={category}
          />
          <TextField
            id="outlined-basic"
            label="City"
            variant="outlined"
            name="city"
            defaultValue={city}
          />
          <TextField
            id="outlined-basic"
            label="Venue"
            variant="outlined"
            name="venue"
            defaultValue={venue}
          />
          <TextField
            id="outlined-basic"
            variant="outlined"
            name="date"
            type="date"
            defaultValue={date}
          />
          <TextField
            id="outlined-basic"
            label="Description"
            name="description"
            multiline
            rows={4}
            variant="outlined"
            defaultValue={description}
          />
        </Box>
        <Box
          sx={{ mt: 2, display: "flex", gap: 1, justifyContent: "flex-end" }}
        >
          <Button
            variant="contained"
            sx={{ textTransform: "uppercase" }}
            color="inherit"
            size="medium"
            onClick={handleCancelEditActivity}
          >
            Cancel
          </Button>
          <Button
            sx={{ textTransform: "uppercase" }}
            variant="contained"
            color="success"
            size="medium"
          >
            Save
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
