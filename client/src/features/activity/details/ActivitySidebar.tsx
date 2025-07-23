import { Avatar, Box, Paper, Typography } from "@mui/material";

export default function ActivitySidebar() {
  const isHost = true;
  const following = true;
  return (
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
        children={"2 people is going"}
      />
      <Box display="flex" justifyContent={"space-between"} py={2} px={1}>
        <Box display="flex" gap={0.5} alignItems={"center"}>
          <Avatar
            alt="bob"
            sx={{
              width: 45,
              height: 45,
            }}
          />
          <Typography
            sx={{
              fontWeight: "500",
            }}
            variant="subtitle2"
            color="inherit"
            children={"Emad Ismail Mohammed"}
          />
        </Box>
        <Box
          display="flex"
          gap={0.5}
          alignItems={"center"}
          justifyContent={"center"}
        ></Box>
      </Box>
    </Paper>
  );
}
