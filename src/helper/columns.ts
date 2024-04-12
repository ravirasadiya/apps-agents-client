import { GridColDef } from "@mui/x-data-grid";
import moment from "moment";

// Agents Report columns
export const agentReportsGrid: GridColDef[] = [
  { field: "report_date", headerName: "Date", width: 500 },
  { field: "description", headerName: "Description", width: 500 },
  {
    field: "created_at",
    headerName: "Created at",
    width: 500,
    valueFormatter: (params) => {
      const { value } = params;
      if (!value) return;
      return moment(value).format("HH:mm:ss DD-MM-YYYY");
    },
  },
];

// Agents Results columns

export const agentResultsColumns: GridColDef[] = [
  { field: "id", headerName: "Agent id", width: 140 },
  { field: "agents", headerName: "Agent", width: 120 },
  { field: "report", headerName: "Date", width: 120 },
  { field: "agent_deal", headerName: "Agent Deal", width: 160 },
  { field: "agent_rb", headerName: "Agent RB", width: 120 },
  { field: "agent_adjustment", headerName: "Agent Adjustment", width: 120 },
  { field: "agent_settlement", headerName: "Agent Settlement", width: 120 },
  { field: "agent_earnings", headerName: "Agent Earning", width: 120 },
  { field: "club", headerName: "Club", width: 120 },
  // { field: "clubcurrency", headerName: "Club currency", width: 180 },

  // { field: "superagentid", headerName: "Super agent id", width: 180 },
  // { field: "player", headerName: "Player", width: 140 },
  { field: "player_deal_rb", headerName: "Player Deal RB", width: 140 },
  {
    field: "player_deal_adjustment",
    headerName: "Player Deal Adjustment",
    width: 160,
  },
  { field: "player_rb", headerName: "Player RB", width: 140 },
  { field: "player_adjustment", headerName: "Player Adjustment", width: 140 },
  { field: "player_settlement", headerName: "Player Settlement", width: 140 },
  { field: "nickname", headerName: "Nickname", width: 150 },
  { field: "nickname_id", headerName: "Nickname id", width: 160 },
  { field: "profit_loss", headerName: "Profit/Loss", width: 160 },
];
