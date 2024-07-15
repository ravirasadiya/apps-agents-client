/**
 * [Agent Section] - In agents, Reports tab - Results table
 */
export interface AgentReportResultTable {
  id: number;
  report: Date;
  club: string;
  nickname: string;
  nickname_id: null;
  agents: string;
  profit_loss: string;
  rake: string;
  agent_deal: string;
  agent_rb: string;
  agent_adjustment: string;
  agent_settlement: string;
  player_deal_rb: string;
  player_deal_adjustment: string;
  player_rb: string;
  player_adjustment: string;
  player_settlement: string;
  agent_earnings: string;
  created_at: Date;
  updated_at: Date;
}
