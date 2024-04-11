import { TitleCase } from "@/utils/titlecase";
import { Box, Grid, Typography } from "@mui/material";

export default function PlayerIncome(props: any) {
  const { data } = props;
  return (
    <Box className="play_min_bx_set">
      <Typography className="agent_p">{data.title}</Typography>
      <Grid container spacing={[3, 3, 3]} className="selct_grid">
        {(data?.data || []).map((income: any, index: number) => (
          <Grid key={index} item xs={6} md={3} xl={2}>
            <Box className="agent_income">
              <Typography>
                {TitleCase(income?.title?.substring(1)?.replace(/_/g, " "))}
              </Typography>
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
