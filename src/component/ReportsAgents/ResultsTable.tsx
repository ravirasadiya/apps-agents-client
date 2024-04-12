import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { Box, Button, Typography } from "@mui/material";
import { agentResultsColumns } from "@/helper/columns";
import { useEffect, useState } from "react";
import { EndpointUrl, endpointUrls, getRecords } from "@/helper";
import { generateUrl } from "@/helper/_api_wrapper";
import { AgentReportResultTable } from "@/types/agent-report-result";
import { Filters } from "../dashboard/DateAndSelect";

export default function ResultsTable(props: Readonly<{ filters: Filters }>) {
  const columns = agentResultsColumns;
  const [rows, setRows] = useState<AgentReportResultTable[]>([]);

  useEffect(() => {
    if (props.filters?.club) {
      getSettlementsRecord();
    }
  }, [props.filters]);

  const getSettlementsRecord = () => {
    getRecords(
      generateUrl(endpointUrls[EndpointUrl.AGENT_REPORTS_RESULT], props.filters)
    ).then((response) => {
      const { results } = response || { results: [] };
      setRows(results);
    });
  };

  return (
    <Box className="data_tabal_def_min mrgn_for">
      <Box className="tabl_p_btn">
        <Typography>Results</Typography>
        <Button>Upload Report</Button>
      </Box>
      <div style={{ height: 368, width: "100%" }} className="data_tabal_def">
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
