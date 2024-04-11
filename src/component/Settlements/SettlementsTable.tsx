import { EndpointUrl, endpointUrls, getRecords } from "@/helper";
import { deleteRecord, generateUrl } from "@/helper/_api_wrapper";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useRef, useState } from "react";
import SnackbarUI, { SnackbarRef } from "../ui/snackbar/snackbar";

export default function SettlementsTable(props: any) {
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
            {/* <Button className="edt_btn_ic">
              <CreateIcon />
            </Button> */}
            <Button
              onClick={(e) => openConfirmationDialog(params, event)}
              className="edt_btn_ic delet_btn_ic"
            >
              <DeleteIcon />
            </Button>
          </div>
        );
      },
      headerName: "Action",
      width: 300,
    },
  ];
  //pop//
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState([]);
  const [selectedRow, setSelectedRow] = useState<string>("");
  const snackBarRef = useRef<SnackbarRef>(null);

  useEffect(() => {
    getSettlementsRecord();
  }, [props.onSettlementSaved]);

  const openConfirmationDialog = (params: any, event: any) => {
    console.log("params", params);
    setSelectedRow(params.id);
    setOpen(true);
  };

  const deleteSettlements = () => {
    deleteRecord(
      endpointUrls[EndpointUrl.DELETE_AGENT_SETTLEMENT].replace(
        ":id",
        selectedRow
      )
    )
      .then((res) => {
        snackBarRef.current?.displaySnackbar(
          "Settlement is deleted successfully",
          "success"
        );
        setOpen(false);
        getSettlementsRecord();
      })
      .catch((error) => {
        setOpen(false);
      });
  };

  useEffect(() => {
    getSettlementsRecord();
  }, [props.filters]);

  const getSettlementsRecord = () => {
    getRecords(
      generateUrl(endpointUrls[EndpointUrl.AGENT_SETTLEMENTS], props.filters)
    ).then((response) => {
      setRows(response);
    });
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Box className="data_tabal_def_min">
        <Box className="tabl_p_btn">
          <Typography>Settlements</Typography>
        </Box>
        <div style={{ height: 368, width: "100%" }} className="data_tabal_def">
          <DataGrid
            rows={rows}
            onRowClick={openConfirmationDialog}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
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

                <Button className="def_btn Delete" onClick={deleteSettlements}>
                  Delete
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Dialog>

      <div>
        <SnackbarUI ref={snackBarRef} />
      </div>
    </>
  );
}
