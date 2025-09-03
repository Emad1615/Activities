import { Box, Paper, Tab, Tabs } from '@mui/material';
import React, { useState } from 'react';
import { tabs } from '../mock/tabs';

export default function ProfileContent() {
  const [value, setValue] = useState<number>(0);
  const handleChange = (_: React.SyntheticEvent, idx: number) => {
    setValue(idx);
  };
  return (
    <Box
      component={Paper}
      elevation={3}
      sx={{
        p: 4,
        borderRadius: 2,
        minHeight: 500,
      }}
      display={'flex'}
      alignItems="flex-start"
      gap={2}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        sx={{
          height: 450,
          minWidth: 200,
          borderRight: 1,
          borderColor: 'divider',
        }}
      >
        {tabs.map((tab, idx) => (
          <Tab key={idx} label={tab.label} sx={{ alignItems: 'flex-start' }} />
        ))}
      </Tabs>
      <Box flexGrow={1}>{tabs[value].tab}</Box>
    </Box>
  );
}
