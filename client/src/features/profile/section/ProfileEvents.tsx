import { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { eventTabs } from '../mock/tabs';
import { Divider, Paper, Typography } from '@mui/material';
import GenericTabs from './GenericTabs';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../lib/hooks/shared/useStore';

const ProfileEvents = observer(function ProfileEvents() {
  const {
    ProfileEventsStore: { setFilter },
  } = useStore();
  const [value, setValue] = useState(0);
  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    setFilter(eventTabs[newValue].type!);
  };
  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
      >
        {eventTabs.map((tab, idx) => (
          <Tab value={idx} label={tab.label} />
        ))}
      </Tabs>
      <Divider orientation="horizontal" flexItem>
        <Typography variant="subtitle2" color="text.disabled">
          Events
        </Typography>
      </Divider>
      <Paper elevation={1} sx={{ p: 2, borderRadius: 2, my: 1 }}>
        <GenericTabs activeTab={value} tabs={eventTabs} />
      </Paper>
    </Box>
  );
});
export default ProfileEvents;
