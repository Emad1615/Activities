import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { getTableColumns } from './columns';
import { useState } from 'react';
import { useUserActivities } from '../../../../lib/hooks/activities/useUserActivities';

export default function ActivitiesTable() {
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
  return (
    <Box sx={{ height: 400, width: '100%', overflowX: 'auto' }}>
      <Box sx={{ maxWidth: 900 }}>
        <DataGrid
          disableRowSelectionOnClick
          checkboxSelection={false}
          rows={userActivities}
          columns={columns}
          loading={loadingUserActivities}
          getRowHeight={() => 'auto'}
          paginationMode="client"
          pageSizeOptions={[10, 25, 50]}
          //paginationModel={paginationModel}
          //onPaginationModelChange={setPaginationModel}
          //columnVisibilityModel={columnVisibilityModel}
          //rowCount={pagination.total}
          // onColumnVisibilityModelChange={(newModel) =>
          //   setColumnVisibilityModel(newModel)
          // }
          initialState={{
            pagination: {
              paginationModel: { pageSize: 25 },
            },
          }}
        />
      </Box>
    </Box>
  );
}
