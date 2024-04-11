import { EndpointUrl, endpointUrls, getRecords } from "@/helper";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
const columns: GridColDef[] = [
  { field: "date", headerName: "Date", width: 300 },
  { field: "player", headerName: "Player", width: 300 },
  { field: "transactionUSD", headerName: "Amount $", width: 300 },
  { field: "description", headerName: "Description", width: 300 },
  {
    field: "action",
    renderCell: (params) => {
      return (
        <div className="userBox">
          <Button className="edt_btn_ic">
            <CreateIcon />
          </Button>
          <Button className="edt_btn_ic delet_btn_ic">
            <DeleteIcon />
          </Button>
        </div>
      );
    },
    headerName: "Action",
    width: 300,
  },
];

export default function SettlementsTable(props: any) {
  //pop//
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    console.log('get records settlement')
    getSettlementsRecord();
  }, [props.filters]);

  const getSettlementsRecord = () => {
    getRecords(endpointUrls[EndpointUrl.AGENT_SETTLEMENTS]).then((response) => {
      console.log("response::", response);
      setRows(response);
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Box className="data_tabal_def_min">
        <Box className="tabl_p_btn">
          <Typography>Settlements</Typography>
          {/* <Button onClick={handleClickOpen}> Delete</Button> */}
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

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="def_modal dilog"
      >
        <Box>
          <Box className="sign">
            <Box className="sign_min Delete_pop">
              <Typography component={"h2"} className="def_h2_hd mrg_colr">
                Delete Settlements
              </Typography>
              <Box className="flx_log_input">
                <Typography className="def_p_forget">
                  Are you sure you want to delete ?
                </Typography>

                <Button className="def_btn Delete">Delete</Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Dialog>
    </>
  );
}
