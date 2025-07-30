import { Button, Paper, Typography } from "@mui/material";
import { SearchOff } from "@mui/icons-material";
import { Link } from "react-router";

export default function NotFound() {
  return (
    <Paper
      elevation={3}
      sx={{
        p: 6,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height:400
      }}
    >
      <SearchOff color="secondary" sx={{fontSize:'100px'}} />
      <Typography gutterBottom variant="h3" color="text.secondary">
        Oops! We could not find what you are looking for
      </Typography>
      <Button
        fullWidth
        variant="text"
        color="primary"
        component={Link}
        to={"/activities"}
      >
        Back to activities
      </Button>
    </Paper>
  );
}
