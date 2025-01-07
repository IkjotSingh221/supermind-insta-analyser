import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import rows from "../../../data/finalOutput.json";

export default function CustomizedDataGrid() {

  const columns = [
    { field: 'Post_Type', headerName: 'Post Type', flex: 1 },
    { field: 'Likes', headerName: 'Likes', type: 'number', flex: 1 },
    { field: 'Shares', headerName: 'Shares', type: 'number', flex: 1 },
    { field: 'Comments', headerName: 'Comments', type: 'number', flex: 1 },
    { field: 'Date_Posted', headerName: 'Date Posted', flex: 1 },
    { field: 'Caption', headerName: 'Caption', flex: 2 },
    { field: 'Hashtags', headerName: 'Hashtags', flex: 1 },
  ];

  return (
    <DataGrid
      autoHeight
      checkboxSelection
      rows={rows}
      columns={columns}
      getRowId={(row) => row.Post_ID}
      getRowClassName={(params) =>
        params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
      }
      initialState={{
        pagination: { paginationModel: { pageSize: 24 } },
      }}
      pageSizeOptions={[10, 24, 50]}
      disableColumnResize
      density="compact"
      slotProps={{
        filterPanel: {
          filterFormProps: {
            logicOperatorInputProps: {
              variant: 'outlined',
              size: 'small',
            },
            columnInputProps: {
              variant: 'outlined',
              size: 'small',
              sx: { mt: 'auto' },
            },
            operatorInputProps: {
              variant: 'outlined',
              size: 'small',
              sx: { mt: 'auto' },
            },
            valueInputProps: {
              InputComponentProps: {
                variant: 'outlined',
                size: 'small',
              },
            },
          },
        },
      }}
    />
  );
}
