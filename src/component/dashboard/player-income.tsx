import { PlayerIncomeResponse } from "@/interfaces/player-income";
import { mockPlayerIncome } from "@/mock/player-income";
import { EndpointUrl, endpointUrls, getRecords } from "@/pages/helper";
import { Box, Grid, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";

export default function PlayerIncome() {
  const [playerIncomeData, setPlayerIncomeData] = useState<
    PlayerIncomeResponse[]
  >([]);
  const componentMounted = useRef<boolean>(false);

  useEffect(() => {
    if (!componentMounted.current) {
      getPlayerIncome();
      componentMounted.current = true;
    }
  }, []);

  const getPlayerIncome = () => {
    getRecords(endpointUrls[EndpointUrl.AGENT_RESULTS])
      .then((response) => setPlayerIncomeData(response))
      .catch((e) => {
        // [TODO] set the mock data for the response of the agency results data
        setPlayerIncomeData(mockPlayerIncome);
        console.log("error while fetching agent results records:", e);
      });
  };

  return (
    <Box className="play_min_bx_set">
      <Typography className="agent_p">Players income</Typography>
      <Grid container spacing={[3, 3, 3]} className="selct_grid">
        {playerIncomeData.map((income: PlayerIncomeResponse, index: number) => (
          <Grid key={index} item xs={6} md={3} xl={2}>
            <Box className="agent_income">
              <Typography>{income.title}</Typography>
              <Typography component="h3" className="">
                {income.currency} {income.price}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
