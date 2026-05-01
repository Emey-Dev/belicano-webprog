import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { DataGrid } from '@mui/x-data-grid';
import { Stack, Typography, Card, CardContent, Chip, Box } from '@mui/material';
import { Gauge } from '@mui/x-charts/Gauge';
import { PieChart } from '@mui/x-charts/PieChart';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

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

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'firstName', headerName: 'First name', width: 150, editable: true },
  { field: 'lastName', headerName: 'Last name', width: 150, editable: true },
  { field: 'age', headerName: 'Age', type: 'number', width: 110, editable: true },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
  },
];

const lastNameCounts = rows.reduce((acc, row) => {
  const key = row.lastName || 'Unknown';
  acc[key] = (acc[key] || 0) + 1;
  return acc;
}, {});

const pieData = Object.entries(lastNameCounts).map(([label, value], id) => ({
  id, value, label,
}));

function DashboardPage() {
  return (
    <>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        System overview and summary of current activity.
      </Typography>

      <Stack direction="row" spacing={2} sx={{ mb: 3 }} flexWrap="wrap">
        <Chip label={`Total Users: ${rows.length}`} color="primary" variant="outlined" />
        <Chip
          label={`Avg Age: ${(
            rows.reduce((sum, row) => sum + (row.age || 0), 0) /
            rows.filter((row) => row.age !== null).length
          ).toFixed(1)}`}
          color="success"
          variant="outlined"
        />
        <Chip label="Departments: 2" color="warning" variant="outlined" />
        <Chip label="Reports: 4" color="error" variant="outlined" />
      </Stack>

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 4 }} flexWrap="wrap">
        <Card sx={{ flex: 1, minWidth: 160 }}>
          <CardContent>
            <Typography variant="body2" color="text.secondary">Total Users</Typography>
            <Typography variant="h4" fontWeight="bold">{rows.length}</Typography>
          </CardContent>
        </Card>
        <Card sx={{ flex: 1, minWidth: 160 }}>
          <CardContent>
            <Typography variant="body2" color="text.secondary">Average Age</Typography>
            <Typography variant="h4" fontWeight="bold">
              {(
                rows.reduce((sum, row) => sum + (row.age || 0), 0) /
                rows.filter((row) => row.age !== null).length
              ).toFixed(1)}
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ flex: 1, minWidth: 160 }}>
          <CardContent>
            <Typography variant="body2" color="text.secondary">Departments</Typography>
            <Typography variant="h4" fontWeight="bold">2</Typography>
          </CardContent>
        </Card>
        <Card sx={{ flex: 1, minWidth: 160 }}>
          <CardContent>
            <Typography variant="body2" color="text.secondary">Total Reports</Typography>
            <Typography variant="h4" fontWeight="bold">4</Typography>
          </CardContent>
        </Card>
      </Stack>

      <Typography variant="h6" gutterBottom>Activity Overview</Typography>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} sx={{ mb: 4 }}>
        <Card sx={{ flex: 2 }}>
          <CardContent>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              User Distribution by Last Name
            </Typography>
            <BarChart
              series={[{ data: Object.values(lastNameCounts), label: 'Users' }]}
              height={290}
              xAxis={[{ data: Object.keys(lastNameCounts), scaleType: 'band', label: 'Last Name' }]}
            />
          </CardContent>
        </Card>
        <Card sx={{ flex: 1 }}>
          <CardContent>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              User Distribution by Last Name
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <PieChart
                series={[{ data: pieData, innerRadius: 50 }]}
                width={220}
                height={220}
              />
            </Box>
          </CardContent>
        </Card>
      </Stack>

      <Typography variant="h6" gutterBottom>Users Overview</Typography>
      <Box sx={{ height: 400, width: '100%', mb: 4 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: { paginationModel: { pageSize: 5 } },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>

      <Typography variant="h6" gutterBottom>Location Map</Typography>
      <Box sx={{ height: 500, width: '100%', mb: 4 }}>
        <MapContainer
          center={[14.604253, 120.994314]}
          zoom={13}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={[14.604253, 120.994314]}>
            <Popup>
              National University-Manila <br />
              <i>551 F Jhocson St, Sampaloc, Manila, 1008 Metro Manila</i>
            </Popup>
          </Marker>
        </MapContainer>
      </Box>
    </>
  );
}

export default DashboardPage;