import { EndpointUrl, endpointUrls, getRecords } from "@/helper";
import { generateUrl } from "@/helper/_api_wrapper";
import { agentReportsGrid } from "@/helper/columns";
import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";

export default function ReportsAgentsOne(props: any) {
  const [rows, setRows] = useState([]);

  const columns = agentReportsGrid;

  console.log("props", props);

  useEffect(() => {
    if (props.filters?.club) {
      getSettlementsRecord();
    }
  }, [props.filters]);

  const getSettlementsRecord = () => {
    getRecords(
      generateUrl(endpointUrls[EndpointUrl.AGENT_REPORTS], props.filters)
    ).then((response) => {
      const { results } = response || { results: [] };
      setRows(results);
    });
  };

  return (
    <Box className="data_tabal_def_min">
      <Box className="tabl_p_btn">
        <Typography>Reports</Typography>
        {/* <Button>Upload Report</Button> */}
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
