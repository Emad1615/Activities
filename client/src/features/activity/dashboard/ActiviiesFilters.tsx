import {
  Box,
  Divider,
  MenuList,
  MenuItem,
  Paper,
  Typography,
  ListItemText,
} from '@mui/material';
import { FilterList, CalendarMonthRounded } from '@mui/icons-material';
import { Calendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import calendar styles
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../lib/hooks/shared/useStore';

const ActiviiesFilters = observer(function ActiviiesFilters() {
  const {
    activityStore: { setFilter, setStartDate, Filter, StartDate },
  } = useStore();
  return (
    <Box display={'flex'} flexDirection={'column'} gap={3}>
      <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
        <Typography
          variant="h6"
          display={'flex'}
          alignItems={'center'}
          sx={{ color: 'secondary.main' }}
        >
          <FilterList sx={{ mr: 1 }} fontSize="medium" />
          Filter
        </Typography>
        <Divider sx={{ borderColor: 'default.main', my: 1 }} />
        <MenuList>
          <MenuItem
            selected={Filter === 'all'}
            onClick={() => setFilter('all')}
          >
            <ListItemText
              primary={'All events'}
              slotProps={{
                primary: {
                  color: 'primary.main',
                  fontSize: '.9rem',
                  fontWeight: '500',
                },
              }}
            />
          </MenuItem>
          <MenuItem
            selected={Filter === 'isHost'}
            onClick={() => setFilter('isHost')}
          >
            <ListItemText
              primary={"I'm  Host"}
              slotProps={{
                primary: {
                  color: 'primary.main',
                  fontSize: '.9rem',
                  fontWeight: '500',
                },
              }}
            />
          </MenuItem>
          <MenuItem
            selected={Filter === 'isGoing'}
            onClick={() => setFilter('isGoing')}
          >
            <ListItemText
              primary={"I'm  Going"}
              slotProps={{
                primary: {
                  color: 'primary.main',
                  fontSize: '.9rem',
                  fontWeight: '500',
                },
              }}
            />
          </MenuItem>
        </MenuList>
      </Paper>
      <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
        <Typography
          variant="h6"
          display={'flex'}
          alignItems={'center'}
          sx={{ color: 'secondary.main' }}
        >
          <CalendarMonthRounded sx={{ mr: 1 }} fontSize="medium" />
          Select Date
        </Typography>
        <Divider sx={{ borderColor: 'default.main', my: 1 }} />
        <Calendar onChange={(date) => setStartDate(date as Date)} />
      </Paper>
    </Box>
  );
});
export default ActiviiesFilters;
