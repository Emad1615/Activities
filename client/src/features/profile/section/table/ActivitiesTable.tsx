import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  type SelectChangeEvent,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { getTableColumns } from './columns';
import { useMemo, useState } from 'react';
import { useUserActivities } from '../../../../lib/hooks/activities/useUserActivities';

const displayMode = [
  { id: 'full', label: 'Full View' },
  { id: 'minimal', label: 'Minimal View' },
];
export default function ActivitiesTable() {
  const [mode, setMode] = useState('minimal');
  const [activityId, setActivityId] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { userActivities, loadingUserActivities } = useUserActivities();
  const columns = getTableColumns({
    handleCancelEvent: {
      setActivity: setActivityId,
      confirm: setIsOpen,
    },
  });
  console.log(activityId);
  console.log(isOpen);
  const columnVisibilityModel = useMemo(() => {
    if (mode === 'minimal') return { description: false, id: false };
    if (mode === 'full') return { description: true, id: true };
  }, [mode]);
  return (
    <>
      <FormControl
        sx={{
          my: 1,
        }}
        fullWidth
        variant="outlined"
        size="small"
      >
        <InputLabel id="label-for-displayMode">Table View</InputLabel>
        <Select
          labelId="label-for-displayMode"
          label="Table View"
          size="small"
          variant="outlined"
          id="displayMode"
          value={mode}
          onChange={(e: SelectChangeEvent<string>) => setMode(e.target.value)}
        >
          {displayMode.map((mode, idx) => (
            <MenuItem key={idx} value={mode.id}>
              {mode.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Box sx={{ height: 400, width: 1, overflowX: 'hidden' }}>
        <DataGrid
          sx={{
            width: 870,
          }}
          disableRowSelectionOnClick
          checkboxSelection={false}
          rows={userActivities}
          columns={columns}
          loading={loadingUserActivities}
          getRowHeight={() => 'auto'}
          paginationMode="client"
          pageSizeOptions={[5, 10, 25, 50]}
          showToolbar
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10 },
            },
            filter: {
              filterModel: {
                items: [],
                quickFilterValues: [''],
              },
            },
          }}
          columnVisibilityModel={columnVisibilityModel}
        />
      </Box>
    </>
  );
}
