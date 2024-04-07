import React, { createContext, useState, useContext } from "react";

// Create a context to hold the start and end date-time values
const DateTimeContext = createContext("");

// Custom hook to access the context values
export const useDateTime = () => useContext(DateTimeContext);

// Provider component to set and provide the date-time values
export const DateTimeProvider = ({ children }: any) => {
  const [startDateTime, setStartDateTime] = useState(null);
  const [endDateTime, setEndDateTime] = useState(null);

  const setDateTimeRange = (start: any, end: any) => {
    setStartDateTime(start);
    setEndDateTime(end);
  };

  return (
    <DateTimeContext.Provider
      value={{ startDateTime, endDateTime, setDateTimeRange }}
    >
      {children}
    </DateTimeContext.Provider>
  );
};
