import React from "react";
import { TimeField } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ThemeProvider } from "@mui/material/styles";
import dayjs from "dayjs";
import "dayjs/locale/en-gb";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import FieldTheme from "../Theme/FieldTheme";
import { useTheme } from "../Theme/ThemeContext";

dayjs.extend(utc);
dayjs.extend(timezone);

const StyledTimeField = ({ label, value, onChange, name }) => {
  const { mode } = useTheme(); 
  const theme = FieldTheme(mode);

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <TimeField
          label={label}
          name={name}
          value={value ? dayjs(value) : null}
          className="w-full"
          onChange={onChange}
          required
        />
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default StyledTimeField;
