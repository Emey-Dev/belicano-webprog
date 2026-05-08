import { useRef } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { BarChart } from "@mui/x-charts/BarChart";
import { Gauge } from "@mui/x-charts/Gauge";
import { PieChart } from "@mui/x-charts/PieChart";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  { field: "firstName", headerName: "First name", width: 150, editable: true },
  { field: "lastName", headerName: "Last name", width: 150, editable: true },
  { field: "age", headerName: "Age", type: "number", width: 110, editable: true },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (value, row) => `${row.firstName || ""} ${row.lastName || ""}`,
  },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 14 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 31 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 31 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 11 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

const barData = {
  generated: [10, 24, 20, 27],
  completed: [12, 19, 17, 23],
  months: ["January", "February", "March", "April"],
};

const pieData = [
  { label: "Sales", value: 14 },
  { label: "Users", value: 18 },
  { label: "Inventory", value: 8 },
  { label: "Finance", value: 6 },
];

const completionRate = 78;

const ReportsPage = () => {
  const printRef = useRef(null);

  const handlePrint = () => {
    const printContent = printRef.current;
    if (!printContent) return;

    const printWindow = window.open("", "_blank", "width=1200,height=900");
    if (!printWindow) return;

    const exportedAt = new Intl.DateTimeFormat("en-US", {
      dateStyle: "long",
      timeStyle: "short",
    }).format(new Date());

    const totalGenerated = barData.generated.reduce((a, b) => a + b, 0);
    const totalCompleted = barData.completed.reduce((a, b) => a + b, 0);
    const totalPie = pieData.reduce((a, b) => a + b.value, 0);

    const PIE_COLORS = ["#1976d2", "#388e3c", "#f57c00", "#7b1fa2"];

    const barMaxVal = Math.max(...barData.generated, ...barData.completed);
    const barW = 680,
      barH = 220,
      barPadX = 60,
      barPadY = 30,
      barPadBottom = 40;
    const chartW = barW - barPadX * 2;
    const chartH = barH - barPadY - barPadBottom;
    const groupW = chartW / barData.months.length;
    const bw = groupW * 0.3;
    const yTicks = [0, 25, 50, 75, 100].filter(
      (v) => v <= Math.ceil(barMaxVal / 5) * 5 + 5
    );

    const barSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="${barW}" height="${barH}" style="font-family:Arial,sans-serif">
      ${yTicks
        .map((t) => {
          const y =
            barPadY +
            chartH -
            (t / (Math.ceil(barMaxVal / 5) * 5)) * chartH;
          return `<line x1="${barPadX}" y1="${y}" x2="${
            barW - barPadX
          }" y2="${y}" stroke="#e5e7eb" stroke-width="1"/>
                <text x="${barPadX - 8}" y="${
            y + 4
          }" text-anchor="end" font-size="11" fill="#6b7280">${t}</text>`;
        })
        .join("")}
      ${barData.months
        .map((month, i) => {
          const gx = barPadX + i * groupW + groupW / 2;
          const genH =
            (barData.generated[i] / (Math.ceil(barMaxVal / 5) * 5)) *
            chartH;
          const comH =
            (barData.completed[i] / (Math.ceil(barMaxVal / 5) * 5)) *
            chartH;
          const genY = barPadY + chartH - genH;
          const comY = barPadY + chartH - comH;
          const labelY = barPadY + chartH + 18;
          return `
          <rect x="${gx - bw - 2}" y="${genY}" width="${bw}" height="${genH}" fill="#1976d2" rx="3"/>
          <text x="${
            gx - bw / 2 - 2
          }" y="${genY - 4}" text-anchor="middle" font-size="10" fill="#1976d2">${
            barData.generated[i]
          }</text>
          <rect x="${gx + 2}" y="${comY}" width="${bw}" height="${comH}" fill="#42a5f5" rx="3"/>
          <text x="${
            gx + bw / 2 + 2
          }" y="${comY - 4}" text-anchor="middle" font-size="10" fill="#1565c0">${
            barData.completed[i]
          }</text>
          <text x="${gx}" y="${labelY}" text-anchor="middle" font-size="11" fill="#374151">${month}</text>`;
        })
        .join("")}
      <line x1="${barPadX}" y1="${barPadY}" x2="${barPadX}" y2="${
      barPadY + chartH
    }" stroke="#d1d5db" stroke-width="1"/>
      <line x1="${barPadX}" y1="${
      barPadY + chartH
    }" x2="${barW - barPadX}" y2="${
      barPadY + chartH
    }" stroke="#d1d5db" stroke-width="1"/>
      <rect x="${barPadX + 4}" y="${
      barH - 16
    }" width="12" height="12" fill="#1976d2" rx="2"/>
      <text x="${barPadX + 20}" y="${
      barH - 6
    }" font-size="11" fill="#374151">Generated</text>
      <rect x="${barPadX + 100}" y="${
      barH - 16
    }" width="12" height="12" fill="#42a5f5" rx="2"/>
      <text x="${barPadX + 116}" y="${
      barH - 6
    }" font-size="11" fill="#374151">Completed</text>
    </svg>`;

    const pieSize = 240,
      cx = pieSize / 2,
      cy = pieSize / 2,
      r = 90;
    let angle = -Math.PI / 2;

    const pieSlices = pieData
      .map((d, i) => {
        const slice = (d.value / totalPie) * 2 * Math.PI;
        const x1 = cx + r * Math.cos(angle);
        const y1 = cy + r * Math.sin(angle);

        angle += slice;

        const x2 = cx + r * Math.cos(angle);
        const y2 = cy + r * Math.sin(angle);
        const large = slice > Math.PI ? 1 : 0;

        return `<path d="M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${large},1 ${x2},${y2} Z" fill="${PIE_COLORS[i]}" stroke="#fff" stroke-width="2"/>`;
      })
      .join("");

    const pieLegend = pieData
      .map(
        (d, i) =>
          `<div style="display:flex;align-items:center;gap:6px;margin-bottom:6px">
        <div style="width:12px;height:12px;border-radius:3px;background:${PIE_COLORS[i]};flex-shrink:0"></div>
        <span style="font-size:13px;color:#374151">${d.label} — <strong>${d.value}</strong> (${Math.round(
            (d.value / totalPie) * 100
          )}%)</span>
      </div>`
      )
      .join("");

    const gaugeR = 70,
      gCx = 100,
      gCy = 90;
    const gaugeAngle = (completionRate / 100) * Math.PI;
    const gStartX = gCx - gaugeR,
      gStartY = gCy;
    const gEndX = gCx + gaugeR * Math.cos(Math.PI - gaugeAngle);
    const gEndY = gCy - gaugeR * Math.sin(Math.PI - gaugeAngle);

    const gaugeSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="120">
      <path d="M${gCx - gaugeR},${gCy} A${gaugeR},${gaugeR} 0 0,1 ${
      gCx + gaugeR
    },${gCy}" fill="none" stroke="#e5e7eb" stroke-width="14" stroke-linecap="round"/>
      <path d="M${gStartX},${gStartY} A${gaugeR},${gaugeR} 0 0,1 ${gEndX},${gEndY}" fill="none" stroke="#1976d2" stroke-width="14" stroke-linecap="round"/>
      <text x="${gCx}" y="${
      gCy - 8
    }" text-anchor="middle" font-size="26" font-weight="bold" fill="#111827">${completionRate}%</text>
      <text x="${gCx}" y="${
      gCy + 14
    }" text-anchor="middle" font-size="12" fill="#6b7280">Completion Rate</text>
    </svg>`;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <title>HealthCast — Reports</title>

          <style>
            @page {
              size: A4;
              margin: 16mm;
            }

            * {
              box-sizing: border-box;
              margin: 0;
              padding: 0;
            }

            body {
              font-family: Arial, Helvetica, sans-serif;
              background: #fff;
              color: #111827;
              font-size: 14px;
            }

            .cover {
              display: flex;
              align-items: center;
              justify-content: space-between;
              padding: 20px 24px;
              background: #1976d2;
              color: #fff;
              border-radius: 8px;
              margin-bottom: 24px;
            }

            .cover-left h1 {
              font-size: 26px;
              font-weight: 700;
              letter-spacing: .3px;
            }

            .cover-left p {
              font-size: 13px;
              opacity: .85;
              margin-top: 4px;
            }

            .cover-badge {
              background: rgba(255,255,255,.15);
              border: 1px solid rgba(255,255,255,.35);
              border-radius: 6px;
              padding: 8px 14px;
              text-align: right;
              font-size: 12px;
              line-height: 1.6;
            }

            .cover-badge strong {
              font-size: 13px;
              display: block;
            }

            .kpi-row {
              display: flex;
              gap: 14px;
              margin-bottom: 24px;
            }

            .kpi {
              flex: 1;
              border: 1px solid #e5e7eb;
              border-radius: 8px;
              padding: 14px 18px;
              background: #f9fafb;
            }

            .kpi-label {
              font-size: 12px;
              color: #6b7280;
              text-transform: uppercase;
              letter-spacing: .5px;
              margin-bottom: 4px;
            }

            .kpi-value {
              font-size: 24px;
              font-weight: 700;
              color: #1976d2;
            }

            .kpi-sub {
              font-size: 12px;
              color: #6b7280;
              margin-top: 2px;
            }

            .section {
              border: 1px solid #e5e7eb;
              border-radius: 8px;
              padding: 20px 22px;
              margin-bottom: 20px;
              break-inside: avoid;
              page-break-inside: avoid;
            }

            .section-title {
              font-size: 16px;
              font-weight: 600;
              color: #111827;
              margin-bottom: 4px;
            }

            .section-sub {
              font-size: 13px;
              color: #6b7280;
              margin-bottom: 16px;
            }

            .two-col {
              display: flex;
              gap: 16px;
              margin-bottom: 20px;
            }

            .two-col .section {
              flex: 1;
              margin-bottom: 0;
            }

            .chart-wrap {
              display: flex;
              justify-content: center;
            }

            .pie-wrap {
              display: flex;
              align-items: center;
              gap: 24px;
              flex-wrap: wrap;
            }

            .pie-wrap svg {
              overflow: visible;
              max-width: 100%;
            }

            .pie-wrap > div {
              min-width: 160px;
            }

            .footer {
              margin-top: 28px;
              padding-top: 14px;
              border-top: 1px solid #e5e7eb;
              display: flex;
              justify-content: space-between;
              font-size: 11px;
              color: #9ca3af;
            }
          </style>
        </head>

        <body>

          <!-- Cover header -->
          <div class="cover">
            <div class="cover-left">
              <h1>HealthCast Reports</h1>
              <p>
                Analytics overview · Generated reports · Category breakdown · Completion performance
              </p>
            </div>

            <div class="cover-badge">
              <strong>Prepared on</strong>
              ${exportedAt}
            </div>
          </div>

          <!-- KPI strip -->
          <div class="kpi-row">
            <div class="kpi">
              <div class="kpi-label">Total Generated</div>
              <div class="kpi-value">${totalGenerated}</div>
              <div class="kpi-sub">Across 4 months</div>
            </div>

            <div class="kpi">
              <div class="kpi-label">Total Completed</div>
              <div class="kpi-value">${totalCompleted}</div>
              <div class="kpi-sub">Across 4 months</div>
            </div>

            <div class="kpi">
              <div class="kpi-label">Completion Rate</div>
              <div class="kpi-value">${completionRate}%</div>
              <div class="kpi-sub">Current cycle</div>
            </div>

            <div class="kpi">
              <div class="kpi-label">Total Categories</div>
              <div class="kpi-value">${pieData.length}</div>
              <div class="kpi-sub">${pieData
                .map((d) => d.label)
                .join(", ")}</div>
            </div>
          </div>

          <!-- Bar chart -->
          <div class="section">
            <div class="section-title">Monthly Report Output</div>

            <div class="section-sub">
              Comparison of generated vs. completed reports over the last four months.
            </div>

            <div class="chart-wrap">
              ${barSVG}
            </div>
          </div>

          <!-- Pie + Gauge -->
          <div class="two-col">

            <div class="section">
              <div class="section-title">Report Category Share</div>

              <div class="section-sub">
                Distribution by category for the current reporting period.
              </div>

              <div class="pie-wrap">
                <svg xmlns="http://www.w3.org/2000/svg" width="${pieSize}" height="${pieSize}">
                  ${pieSlices}
                </svg>

                <div>
                  ${pieLegend}
                </div>
              </div>
            </div>

            <div class="section">
              <div class="section-title">Completion Rate</div>

              <div class="section-sub">
                Percentage of reports completed on time in the latest cycle.
              </div>

              <div class="chart-wrap">
                ${gaugeSVG}
              </div>
            </div>

          </div>

          <!-- Footer -->
          <div class="footer">
            <span>HealthCast Admin Portal</span>
            <span>Confidential — Internal Use Only</span>
            <span>${exportedAt}</span>
          </div>

        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  return (
    <Box>
      <Stack
        direction={{ xs: "column", md: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", md: "center" }}
        spacing={2}
        sx={{ mb: 4 }}
      >
        <Box>
          <Typography variant="h4" gutterBottom>
            Reports
          </Typography>

          <Typography variant="body1" color="text.secondary">
            Report analytics overview showing generated reports, category
            breakdown, and current completion performance.
          </Typography>
        </Box>

        <Stack direction="row" spacing={1.5} flexWrap="wrap" useFlexGap>
          <Button variant="contained">Generate</Button>

          <Button variant="outlined" onClick={handlePrint}>
            Export
          </Button>

          <Button variant="outlined">Filter</Button>
        </Stack>
      </Stack>

      <Card ref={printRef} spacing={3}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Monthly Report Output
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 3 }}
          >
            This chart compares how many reports were generated and how many
            were completed across the last four months.
          </Typography>

          <BarChart
            series={[
              { data: barData.generated, label: "Generated" },
              { data: barData.completed, label: "Completed" },
            ]}
            height={300}
            xAxis={[
              {
                data: barData.months,
                scaleType: "band",
                label: "Months",
              },
            ]}
          />
        </CardContent>
      </Card>

      <Stack direction={{ xs: "column", lg: "row" }} spacing={3}>
        <Card sx={{ flex: 1 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Report Category Share
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: 3 }}
            >
              This chart shows the distribution of report requests by category
              for the current reporting period.
            </Typography>

            <Box sx={{ display: "flex", justifyContent: "center", minHeight: 280 }}>
              <PieChart
                series={[
                  {
                    data: pieData.map((d, i) => ({
                      id: i,
                      ...d,
                    })),
                    innerRadius: 50,
                  },
                ]}
                width={320}
                height={260}
              />
            </Box>
          </CardContent>
        </Card>

        <Card sx={{ flex: 1 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Completion Rate
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: 3 }}
            >
              The gauge highlights the current percentage of reports completed
              on time based on the latest reporting cycle.
            </Typography>

            <Box
              sx={{
                minHeight: 220,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Gauge width={180} height={180} value={completionRate} />
            </Box>
          </CardContent>
        </Card>
      </Stack>

      <Card>
        <CardContent>
          <DataGrid
            rows={rows}
            columns={columns}
            experimentalFeatures={{ newEditingApi: true }}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
            checkboxSelection
            disableRowSelectionOnClick
          />
        </CardContent>
      </Card>
    </Box>
  );
};

export default ReportsPage;