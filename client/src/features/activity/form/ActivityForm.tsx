import {
  Box,
  Button,
  CircularProgress,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import type { Activity } from "../../../lib/types/index";
import type { FormEvent } from "react";
import { useNavigate, useParams } from "react-router";
import { useActivity } from "../../../lib/hooks/activities/useActivity";
import { useCreateActivity } from "../../../lib/hooks/activities/useCreateActivity";
import { useEditActivity } from "../../../lib/hooks/activities/useEditActivity";

export default function ActivityForm() {
  const { id } = useParams<string>();
  const { activity, activityLoading } = useActivity(id ?? "");
  const { addActivity, isLoadingAddActivity } = useCreateActivity();
  const { updateActivity, isLoadingEditActivity } = useEditActivity();
  const navigate = useNavigate();
  const isLoading = isLoadingAddActivity || isLoadingEditActivity;
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
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formdata = new FormData(e.currentTarget);
    const data: { [key: string]: FormDataEntryValue } = {};
    formdata.forEach((value, key) => {
      data[key] = value;
    });
    if (activity) {
      data.id = activity.id;
      updateActivity(data as unknown as Activity);
    } else {
      addActivity(data as unknown as Activity, {
        onSuccess: (id: string) => navigate(`/activities/${id}`),
      });
    }
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
          {activity ? "Edit Activity" : "Create Activity"}
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
            defaultValue={
              activity?.date
                ? new Date(activity.date).toISOString().split("T")[0]
                : new Date().toISOString().split("T")[0]
            }
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
            onClick={() => navigate("/activities")}
          >
            Cancel
          </Button>
          <Button
            sx={{ textTransform: "uppercase" }}
            variant="contained"
            color="success"
            size="medium"
            type="submit"
            loading={isLoading}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
