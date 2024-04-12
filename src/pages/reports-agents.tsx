import React, { Component, useState } from "react";
import Head from "next/head";
import Layout from "@/component/layouts/Layout";
import { Box, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import ReportsAgentsOne from "@/component/ReportsAgents/ReportsAgentsOneTabal";
import ReportsAgentsTwoTabl from "@/component/ReportsAgents/ReportsAgentsTwoTabl";
import DateAndSelect, { Filters } from "@/component/dashboard/DateAndSelect";

export default function ReportsAgents() {
  const [filters, setFilters] = useState<Filters>();
  const onFilterChanged = (filter: Filters) => {
    setFilters(filter);
  };

  return (
    <>
      <Layout>
        <Head>
          <title>Create Next App</title>
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div>
          <Box>
            <Typography className="def_had_txt">
              Reports (for agents)
            </Typography>
            <DateAndSelect onFilterChange={onFilterChanged} />
            <ReportsAgentsOne filters={filters} />
            <ReportsAgentsTwoTabl />
          </Box>
        </div>
      </Layout>
    </>
  );
}
