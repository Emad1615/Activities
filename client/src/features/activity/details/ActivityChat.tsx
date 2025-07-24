import {
  Avatar,
  Box,
  Divider,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "react-router";

export default function ActivityChat() {
  return (
    <Paper sx={{ borderRadius: "none" }}>
      <Typography
        p={2}
        textAlign={"center"}
        bgcolor={"primary.main"}
        color="white"
        fontWeight={"bold"}
        fontSize={"1rem"}
        textTransform={"capitalize"}
      >
        Chat about this event
      </Typography>
      <Box sx={{ borderRadius: "none", p: 1 }} gap={2}>
        <Box component={"form"}>
          <TextField
            label="Enter your comment (Enter to submit or SHIFT + Enter for new line)"
            variant="filled"
            multiline
            sx={{ width: "100%" }}
          />
        </Box>
        <Divider sx={{ py: 1 }} />
        <Box display="flex" m={2}>
          <Avatar src="/images/user.png" alt="image user" sx={{ mr: 2 }} />
          <Box display={"flex"} flexDirection={"column"} flexGrow={1}>
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Typography
                component={Link}
                to={"/profile.bob"}
                variant="subtitle2"
                sx={{ textDecoration: "none", color: "grey.800" }}
              >
                Emad Ismail Mohammed
              </Typography>
              <Typography variant="caption" color="text.secondary">
                2 hour ago
              </Typography>
            </Box>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ whiteSpace: "pre-wrap" }}
            >
              your comment here write your comment and read other comments from
              another usres
            </Typography>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
}
