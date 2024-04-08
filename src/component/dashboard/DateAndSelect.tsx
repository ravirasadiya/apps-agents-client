import { ClubResponse, ClubResult } from "@/types/club-list";
import {
  EndpointUrl,
  endpointUrls,
  getRecords,
  LocalStorageKeys,
  setLocalStorage,
} from "@/helper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {
  Box,
  FormControl,
  Grid,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import "bootstrap-daterangepicker/daterangepicker.css";
import "bootstrap/dist/css/bootstrap.css";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import DateRangePicker from "react-bootstrap-daterangepicker";
import {
  currentDate,
  currentDateInFormat,
  getDateFromISOString,
  getDateOfBeforeOneMonth,
  getDateOfBeforeOneMonthInFormat,
} from "@/utils/get-date";

// import FormControl from "@mui/material/FormControl";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import FormHelperText from "@mui/material/FormHelperText";
// import Select, { SelectChangeEvent } from "@mui/material/Select";

export interface Filters {
  startDate: string;
  endDate: string;
  club: string;
}

export default function DateAndSelect() {
  //datepicker
  const [fromDate, setFromDate] = useState(getDateOfBeforeOneMonth());
  const [toDate, setToDate] = useState(currentDate());
  const [filters, setFilters] = useState({
    startDate: getDateOfBeforeOneMonthInFormat(),
    endDate: currentDateInFormat(),
    club: "",
  });
  const componentMounted = useRef(false);

  const [clubs, setClubs] = useState<ClubResult[]>([]);
  const [selectedClub, setSelectedClub] = useState("");

  const handleEvent = (event: any, picker: any) => {
    setFromDate(picker.startDate._d);
    setToDate(picker.endDate._d);
    const updatedFilters: Filters = {
      ...filters,
      startDate: getDateFromISOString(new Date(picker.startDate._d)),
      endDate: getDateFromISOString(new Date(picker.endDate._d)),
    };
    updateFilters(updatedFilters);
  };

  const updateFilters = (filters: Filters) => {
    setFilters(filters);
    setLocalStorage(LocalStorageKeys.filterProperties, filters);
  };

  useEffect(() => {
    if (!componentMounted.current) {
      getRecords(endpointUrls[EndpointUrl.CLUB_LIST])
        .then((response: ClubResponse) => {
          const { results } = response ?? { count: 0, results: [] };
          setClubs(results);
          setSelectedClub(results?.[0]?.club);
        })
        .catch((e: any) => {
          console.log("ERROR...", e);
        });
      componentMounted.current = true;
    }
  });

  const handleOnClubChange = (event: any) => {
    const updatedFilters: Filters = {
      ...filters,
      club: event?.target?.value || clubs?.[0],
    };
    updateFilters(updatedFilters);
    setSelectedClub(event?.target?.value || clubs?.[0]);
  };

  return (
    <Grid container spacing={[2]} className="selct_grid selct_minbx">
      <Grid item xs={12} md={8} xl={3}>
        <span className="date_title">Date</span>
        <Box className="date_min_prnt">
          <DateRangePicker
            initialSettings={{ startDate: fromDate, endDate: toDate }}
            onEvent={handleEvent}
          >
            <button className="def_date_pickr">
              {moment(fromDate).format("LL")}
              &nbsp; - &nbsp;
              {moment(toDate).format("LL")}
              <KeyboardArrowDownIcon />
            </button>
          </DateRangePicker>

          {/* 
        [TODO] Hide as per the client's comment
         <Box className='selct_minbx'>
                    <Grid container spacing={[3, 3, 3]} className='selct_grid'>
                        <Grid item xs={6} md={4} xl={2} >
                            <FormControl className='def_selct'>
                                <span>APP</span>
                                <Select
                                    value={age}
                                    onChange={handleChange}
                                    displayEmpty
                                    inputProps={{ 'aria-label': 'Without label' }}
                                    className='selct'
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6} md={4} xl={2} >
                            <FormControl className='def_selct'>
                                <span>Union</span>
                                <Select
                                    value={age}
                                    onChange={handleChange}
                                    displayEmpty
                                    inputProps={{ 'aria-label': 'Without label' }}
                                    className='selct'
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6} md={4} xl={2} >
                            <FormControl className='def_selct'>
                                <span>Club</span>
                                <Select
                                    value={age}
                                    onChange={handleChange}
                                    displayEmpty
                                    inputProps={{ 'aria-label': 'Without label' }}
                                    className='selct'
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6} md={4} xl={2} >
                            <FormControl className='def_selct'>
                                <span>Agent</span>
                                <Select
                                    value={age}
                                    onChange={handleChange}
                                    displayEmpty
                                    inputProps={{ 'aria-label': 'Without label' }}
                                    className='selct'
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6} md={4} xl={2} >
                            <FormControl className='def_selct'>
                                <span>Nickname</span>
                                <Select
                                    value={age}
                                    onChange={handleChange}
                                    displayEmpty
                                    inputProps={{ 'aria-label': 'Without label' }}
                                    className='selct'
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6} md={4} xl={2} >
                            <FormControl className='def_selct'>
                                <span>ID</span>
                                <Select
                                    value={age}
                                    onChange={handleChange}
                                    displayEmpty
                                    inputProps={{ 'aria-label': 'Without label' }}
                                    className='selct'
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Box> */}
        </Box>
      </Grid>
      <Grid item xs={12} md={8} xl={3}>
        <FormControl className="def_selct">
          <span>Clubs</span>
          <Select
            value={selectedClub}
            onChange={handleOnClubChange}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            className="selct"
          >
            {clubs.map((item, index) => (
              <MenuItem key={item.club} value={item.club}>
                {item.club}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
}
