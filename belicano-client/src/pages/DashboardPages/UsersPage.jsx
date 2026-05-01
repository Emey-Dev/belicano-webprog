import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Typography, Box, Chip, Avatar, Stack } from '@mui/material';

const columns = [
  {
    field: 'avatar',
    headerName: '',
    width: 60,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
    renderCell: (params) => (
      <Avatar sx={{ width: 32, height: 32, fontSize: 14 }}>
        {params.row.firstName?.[0]}{params.row.lastName?.[0]}
      </Avatar>
    ),
  },
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First Name', width: 150 },
  { field: 'lastName', headerName: 'Last Name', width: 150 },
  { field: 'age', headerName: 'Age', type: 'number', width: 100 },
  {
    field: 'fullName',
    headerName: 'Full Name',
    sortable: false,
    width: 180,
    valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 14 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 31 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 31 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 11 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: 11 },
  { id: 6, lastName: 'Melisandre', firstName: 'Asshai', age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

function UsersPage() {
  return (
    <>
      <Typography variant="h4" gutterBottom>
        Users
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Manage and view all registered system users.
      </Typography>

      <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
        <Chip label={`Total: ${rows.length}`} color="primary" variant="outlined" />
        <Chip label={`With Age: ${rows.filter(r => r.age !== null).length}`} color="success" variant="outlined" />
        <Chip label={`No Age Data: ${rows.filter(r => r.age === null).length}`} color="default" variant="outlined" />
      </Stack>

      <Box sx={{ height: 520, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: { paginationModel: { pageSize: 5 } },
          }}
          pageSizeOptions={[5, 10, 25]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
    </>
  );
}

export default UsersPage;