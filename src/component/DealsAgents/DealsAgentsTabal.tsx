import * as React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Box, Button, Typography } from '@mui/material';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'Player', width: 210 },
    { field: 'date', headerName: 'Date', width: 210 },
    { field: 'club', headerName: 'Club', width: 210 },
    { field: 'nickname', headerName: 'Nickname', width: 210 },
    { field: 'rakeback', headerName: 'Rakeback', width: 210 },
    { field: 'rebate', headerName: 'Rebate', width: 210 },
    { field: 'action', renderCell: (params) => {
        return (
          <div className="userBox">
            <Button className='edit_btn'>Edit</Button>
          </div>
        );
        }, headerName: 'Action', width: 210 },
];

const rows = [
    { id: 2100559, date: '12/2/2024', club: '137795', nickname: 'Korill', rakeback: '$ 0.000', rebate: '$ 0.000', action: <div>11</div>,  },
    { id: 2100559, date: '12/2/2024', club: '137795', nickname: 'Korill', rakeback: '$ 0.000', rebate: '$ 0.000', action: <div>11</div>,  },
    { id: 2100559, date: '12/2/2024', club: '137795', nickname: 'Korill', rakeback: '$ 0.000', rebate: '$ 0.000', action: <div>11</div>,  },
    { id: 2100559, date: '12/2/2024', club: '137795', nickname: 'Korill', rakeback: '$ 0.000', rebate: '$ 0.000', action: <div>11</div>,  },
    { id: 2100559, date: '12/2/2024', club: '137795', nickname: 'Korill', rakeback: '$ 0.000', rebate: '$ 0.000', action: <div>11</div>,  },
];

export default function DealsAgentsTabal() {
    return (
        <Box className='data_tabal_def_min mrgn_for'>
            <Box className='tabl_p_btn'>
                <Typography>Deals</Typography>
                {/* <Button>Upload Report</Button> */}
            </Box>
            <div style={{ height: 368, width: '100%' }} className='data_tabal_def'>
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