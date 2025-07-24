import {
  Box,
  Button,
  ButtonGroup,
  List,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { useStore } from "../../lib/hooks/shared/useStore";
import { observer } from "mobx-react-lite";
const Counter = observer(function Counter() {
  const { counterStore } = useStore();
  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Box>
        <>
          <Typography variant="h5">{counterStore.title}</Typography>
          <Typography variant="subtitle2">
            The Count is : {counterStore.count}
          </Typography>
        </>
        <ButtonGroup sx={{ mt: 3 }}>
          <Button
            variant="contained"
            color="error"
            onClick={() => counterStore.decrement()}
          >
            Decrement
          </Button>
          <Button
            variant="contained"
            color="info"
            onClick={() => counterStore.increment()}
          >
            Increment by 1
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => counterStore.increment(5)}
          >
            Increment by 5
          </Button>
        </ButtonGroup>
      </Box>
      <Box>
        <Typography>Counter events ({counterStore.eventCounts})</Typography>
        <List>
          {counterStore.events.map((item: string, idx: number) => (
            <ListItemText key={idx}>{item}</ListItemText>
          ))}
        </List>
      </Box>
    </Paper>
  );
});

export default Counter;
