import React, { Component, useState } from "react";
import Head from "next/head";
import Layout from "@/component/layouts/Layout";
import { Box, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import PlayerResultsAgents from "@/component/PlayerResults/PlayerResultsAgents";
import DateAndSelect from "@/component/dashboard/DateAndSelect";

export default function PlayerResults() {
  const [age, setAge] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };
  return (
    <Layout>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <Box>
          <Box className="Choose_Player">
            <Typography className="def_had_txt">
              Player Results (for agents)
            </Typography>
            <FormControl className="def_selct">
              {/* <span>APP</span> */}
              <Select
                value={age}
                onChange={handleChange}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                className="selct"
              >
                <MenuItem value="">
                  <span>Choose Player</span>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <DateAndSelect />

          <Grid container spacing={[2, 3, 3]} className="selct_grid">
            <Grid item xs={12} sm={6} md={6} xl={4}>
              <Box className="player_results_graf_bx">
                <Typography>Results</Typography>
                <img src="img/player_results_graf_1.png" alt="" />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={6} xl={4}>
              <Box className="player_results_graf_bx">
                <Typography>Results</Typography>
                <img src="img/player_results_graf_2.png" alt="" />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={6} xl={4}>
              <Box className="player_results_graf_bx">
                <Typography>Results</Typography>
                <img src="img/player_results_graf_2.png" alt="" />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={6} xl={4}>
              <Box className="player_results_graf_bx">
                <Typography>Results</Typography>
                <img src="img/player_results_graf_1.png" alt="" />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={6} xl={4}>
              <Box className="player_results_graf_bx">
                <Typography>Results</Typography>
                <img src="img/player_results_graf_2.png" alt="" />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={6} xl={4}>
              <Box className="player_results_graf_bx">
                <Typography>Results</Typography>
                <img src="img/player_results_graf_2.png" alt="" />
              </Box>
            </Grid>
          </Grid>

          <PlayerResultsAgents />
        </Box>
      </div>
    </Layout>
  );
}
