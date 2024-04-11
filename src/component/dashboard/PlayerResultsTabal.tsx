import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { Box, Button, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { EndpointUrl, endpointUrls, getRecords } from "@/helper";
import {
  currentDateInFormat,
  getDateOfBeforeOneMonthInFormat,
} from "@/utils/get-date";

const columns: GridColDef[] = [
  { field: "user", headerName: "Player", width: 250 },
  { field: "_profit_loss", headerName: "Profit/Loss", width: 250 },
  { field: "_rake", headerName: "Rake", width: 250 },
  { field: "_rakeback", headerName: "Rakeback", width: 250 },
  { field: "_rebate", headerName: "Rebate", width: 250 },
  { field: "_player_earn", headerName: "Player earnings", width: 270 },
  { field: "_agent_earn", headerName: "Agent earnings", width: 270 },
];

// const rows = [
//   {
//     id: 957072,
//     profitloss: "$ 0.00",
//     rake: "$ 0.00",
//     rakeback: "$ 0.00",
//     rebatefive: "$ 0.00",
//     agentearnings: "$ 0.00",
//   },
//   {
//     id: 957072,
//     profitloss: "$ 0.00",
//     rake: "$ 0.00",
//     rakeback: "$ 0.00",
//     rebatefive: "$ 0.00",
//     agentearnings: "$ 0.00",
//   },
//   {
//     id: 957072,
//     profitloss: "$ 0.00",
//     rake: "$ 0.00",
//     rakeback: "$ 0.00",
//     rebatefive: "$ 0.00",
//     agentearnings: "$ 0.00",
//   },
//   {
//     id: 957072,
//     profitloss: "$ 0.00",
//     rake: "$ 0.00",
//     rakeback: "$ 0.00",
//     rebatefive: "$ 0.00",
//     agentearnings: "$ 0.00",
//   },
//   {
//     id: 957072,
//     profitloss: "$ 0.00",
//     rake: "$ 0.00",
//     rakeback: "$ 0.00",
//     rebatefive: "$ 0.00",
//     agentearnings: "$ 0.00",
//   },
// ];

export default function PlayerResultsTabal() {
  const [rows, setRows] = useState([]);
  const componentMounted = useRef(false);

  useEffect(() => {
    if (!componentMounted.current) {
      getPlayerIncomeResults();
      componentMounted.current = true;
    }
  });

  function getPlayerIncomeResults() {
    getRecords(
      endpointUrls[EndpointUrl.AGENT_PLAYER_RESULTS]
        .replace(":fromDate", getDateOfBeforeOneMonthInFormat())
        .replace(":toDate", currentDateInFormat())
    ).then((response) => {
      let { results } = response ?? { results: [] };
      results = results.map((p: any, index: number) => ({
        ...p,
        id: index,
      }));
      setRows(results);
    });
  }

  return (
    <Box className="data_tabal_def_min mrgn_for">
      <Box className="tabl_p_btn">
        <Typography>Player Results</Typography>
        {/* <Button>Upload Report</Button> */}
      </Box>
      <div style={{ height: 370, width: "100%" }} className="data_tabal_def">
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          // checkboxSelection
        />
      </div>
    </Box>
  );
}
