import {
  Box,
  Divider,
  MenuList,
  MenuItem,
  Paper,
  Typography,
  ListItemText,
} from "@mui/material";
import { FilterList, CalendarMonthRounded } from "@mui/icons-material";
import { Calendar } from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Import calendar styles

export default function ActiviiesFilters() {
  return (
    <Box display={"flex"} flexDirection={"column"} gap={3}>
      <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
        <Typography
          variant="h6"
          display={"flex"}
          alignItems={"center"}
          sx={{ color: "secondary.main" }}
        >
          <FilterList sx={{ mr: 1 }} fontSize="medium" />
          Filter
        </Typography>
        <Divider sx={{ borderColor: "default.main", my: 1 }} />
        <MenuList>
          <MenuItem>
            <ListItemText
              primary={"All events"}
              slotProps={{
                primary: {
                  color: "primary.main",
                  fontSize: ".9rem",
                  fontWeight: "500",
                },
              }}
            />
          </MenuItem>
          <MenuItem>
            <ListItemText
              primary={"I'm  Host"}
              slotProps={{
                primary: {
                  color: "primary.main",
                  fontSize: ".9rem",
                  fontWeight: "500",
                },
              }}
            />
          </MenuItem>
          <MenuItem>
            <ListItemText
              primary={"I'm  Going"}
              slotProps={{
                primary: {
                  color: "primary.main",
                  fontSize: ".9rem",
                  fontWeight: "500",
                },
              }}
            />
          </MenuItem>
        </MenuList>
      </Paper>
      <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
        <Typography
          variant="h6"
          display={"flex"}
          alignItems={"center"}
          sx={{ color: "secondary.main" }}
        >
          <CalendarMonthRounded sx={{ mr: 1 }} fontSize="medium" />
          Select Date
        </Typography>
        <Divider sx={{ borderColor: "default.main", my: 1 }} />
        <Calendar />
      </Paper>
    </Box>
  );
}
