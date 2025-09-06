import { GridActionsCellItem, type GridColDef } from '@mui/x-data-grid';

import {
  RenderCellActivityName,
  RenderCellCategory,
  RenderCellDate,
  RenderCellDescription,
  RenderCellLocation,
} from './row';
import { Cancel, ListAlt } from '@mui/icons-material';
import type { Dispatch, SetStateAction } from 'react';

export const getTableColumns = (options: {
  handleCancelEvent: {
    setActivity: Dispatch<SetStateAction<string>>;
    confirm: Dispatch<SetStateAction<boolean>>;
  };
}) => {
  const { handleCancelEvent } = options;
  return [
    {
      width: 200,
      filterable: false,
      headerName: 'Activity name',
      field: 'title',
      align: 'center',
      renderCell: (params) => <RenderCellActivityName params={params} />,
    },
    {
      width: 200,

      filterable: false,
      headerName: 'Category',
      field: 'category',
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => <RenderCellCategory params={params} />,
    },
    {
      width: 200,

      filterable: false,
      headerName: 'Description',
      field: 'description',
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => <RenderCellDescription params={params} />,
    },
    {
      width: 200,
      filterable: false,
      headerName: 'Date',
      field: 'date',
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => <RenderCellDate params={params} />,
    },
    {
      width: 200,
      filterable: false,
      headerName: 'Location',
      field: 'id',
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => <RenderCellLocation params={params} />,
    },
    {
      type: 'actions',
      field: 'actions',
      width: 200,
      headerName: 'Actions',
      headerAlign: 'center',
      align: 'center',
      hideable: false,
      sortable: false,
      filterable: false,
      getActions: (params) => [
        <GridActionsCellItem
          showInMenu={true}
          icon={<ListAlt color="info" />}
          disabled={params.row.isCancelled}
          label={'Details'}
          onClick={() => {
            handleCancelEvent.setActivity(params.row.id);
          }}
        />,
        <GridActionsCellItem
          showInMenu={true}
          icon={<Cancel color="error" />}
          label={'Cancel Event'}
          onClick={() => {
            handleCancelEvent.setActivity(params.row.id);
            handleCancelEvent.confirm((prev) => !prev);
          }}
        />,
      ],
    },
  ] as GridColDef[];
};
