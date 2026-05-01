import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart } from '@mui/x-charts/LineChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { Stack, Typography, Card, CardContent, Chip, Box } from '@mui/material';

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 14 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 31 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 31 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 11 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

const monthlySales = [
  { month: 'Jan', sessions: 4000, tickets: 2400 },
  { month: 'Feb', sessions: 3000, tickets: 1398 },
  { month: 'Mar', sessions: 5000, tickets: 3200 },
  { month: 'Apr', sessions: 4780, tickets: 2908 },
  { month: 'May', sessions: 5890, tickets: 4800 },
  { month: 'Jun', sessions: 4390, tickets: 3800 },
  { month: 'Jul', sessions: 6490, tickets: 4300 },
];

const months = monthlySales.map((d) => d.month);
const sessionsData = monthlySales.map((d) => d.sessions);
const ticketsData = monthlySales.map((d) => d.tickets);

const weeklyLogins = [3, 5, 4, 7, 6, 8, 5];
const weeklyDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function ReportsPage() {
  const totalUsers = rows.length;
  const avgAge = (
    rows.reduce((sum, row) => sum + (row.age || 0), 0) /
    rows.filter((row) => row.age !== null).length
  ).toFixed(1);

  const lastNameCounts = rows.reduce((acc, row) => {
    const key = row.lastName || 'Unknown';
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  const pieData = Object.entries(lastNameCounts).map(([label, value], id) => ({
    id, value, label,
  }));

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Reports
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Overview of user metrics, activity trends, and analytics.
      </Typography>

      <Stack direction="row" spacing={2} sx={{ mb: 3 }} flexWrap="wrap">
        <Chip label={`Total Users: ${totalUsers}`} color="primary" variant="outlined" />
        <Chip label={`Avg Age: ${avgAge}`} color="success" variant="outlined" />
        <Chip label={`With Age Data: ${rows.filter(r => r.age !== null).length}`} color="warning" variant="outlined" />
        <Chip label={`No Age Data: ${rows.filter(r => r.age === null).length}`} color="default" variant="outlined" />
      </Stack>

      <Box sx={{ width: '100%' }}>

        <Typography variant="h6" gutterBottom>Weekly User Logins</Typography>
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <BarChart
              series={[{ data: weeklyLogins, label: 'Logins' }]}
              xAxis={[{ data: weeklyDays, scaleType: 'band' }]}
              height={300}
            />
          </CardContent>
        </Card>

        <Typography variant="h6" gutterBottom>Monthly Activity Trend</Typography>
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <LineChart
              series={[
                { data: sessionsData, label: 'Active Sessions', curve: 'natural' },
                { data: ticketsData, label: 'Resolved Tickets', curve: 'natural' },
              ]}
              xAxis={[{ data: months, scaleType: 'band' }]}
              height={300}
            />
          </CardContent>
        </Card>

        <Typography variant="h6" gutterBottom>User Distribution by Last Name</Typography>
        <Card sx={{ mb: 4 }}>
          <CardContent sx={{ display: 'flex', justifyContent: 'center' }}>
            <PieChart
              series={[{ data: pieData, innerRadius: 60 }]}
              width={420}
              height={260}
            />
          </CardContent>
        </Card>

      </Box>
    </>
  );
}

export default ReportsPage;