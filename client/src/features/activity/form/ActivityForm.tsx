import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import type { Activity } from "../../../lib/types/index";
import type { FormEvent } from "react";
type Props = {
  handleCancelEditActivity: () => void;
  activity: Activity | undefined;
  handleAddActivity: (activity: Activity) => void;
};
export default function ActivityForm({
  handleCancelEditActivity,
  activity,
  handleAddActivity,
}: Props) {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formdata = new FormData(e.currentTarget);
    const data: { [key: string]: FormDataEntryValue } = {};
    formdata.forEach((value, key) => {
      data[key] = value;
    });
    if (activity) data.id = activity.id;
    handleAddActivity(data as unknown as Activity);
  };
  return (
    <Paper sx={{ borderRadius: 3 }}>
      <Box
        component="form"
        sx={{
          p: 2,
        }}
        onSubmit={handleSubmit}
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
            defaultValue={activity?.title ?? ""}
          />
          <TextField
            id="outlined-basic"
            label="Category"
            variant="outlined"
            name="category"
            defaultValue={activity?.category}
          />
          <TextField
            id="outlined-basic"
            label="City"
            variant="outlined"
            name="city"
            defaultValue={activity?.city}
          />
          <TextField
            id="outlined-basic"
            label="Venue"
            variant="outlined"
            name="venue"
            defaultValue={activity?.venue}
          />
          <TextField
            id="outlined-basic"
            variant="outlined"
            name="date"
            type="date"
            defaultValue={activity?.date}
          />
          <TextField
            id="outlined-basic"
            label="Description"
            name="description"
            multiline
            rows={4}
            variant="outlined"
            defaultValue={activity?.description}
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
            type="submit"
          >
            Save
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
