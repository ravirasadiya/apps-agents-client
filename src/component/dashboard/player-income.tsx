import { AgentResults, PlayerIncomeResponse } from "@/types/player-income";
import { mockPlayerIncome } from "@/mock/player-income";
import {
  EndpointUrl,
  endpointUrls,
  getLocalStorage,
  getRecords,
  LocalStorageKeys,
} from "@/helper";
import { Box, Grid, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import moment from "moment";
import { TitleCase } from "@/utils/titlecase";
import {
  currentDateInFormat,
  getDateOfBeforeOneMonthInFormat,
} from "@/utils/get-date";

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

  const generateUrlEndPoint = () => {
    const getLocalStorageFilters = JSON.parse(
      getLocalStorage(LocalStorageKeys.filterProperties)
    );
    const fromDate = getDateOfBeforeOneMonthInFormat(); // getLocalStorageFilters.startDate;
    const toDate = currentDateInFormat(); // getLocalStorageFilters.endDate;
    const club = "KOBERGS"; // getLocalStorageFilters.club;
    return endpointUrls[EndpointUrl.AGENT_RESULTS]
      ?.replace(":fromDate", fromDate)
      ?.replace(":toDate", toDate)
      ?.replace(":club", club);
  };

  const getPlayerIncome = () => {
    getRecords(generateUrlEndPoint())
      .then((response: AgentResults) => {
        const data: PlayerIncomeResponse[] = Object.keys(response).map(
          (key: any) => {
            const title = key.substring(1).replace(/_/g, " ");
            const price = response[key];
            return { currency: "$", title, price };
          }
        );
        setPlayerIncomeData(data);
      })
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
              <Typography>{TitleCase(income.title)}</Typography>
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
