import React from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
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

const StyledDateField = ({ label, value, onChange, name, restrictFutureDates = false }) => {
    const { mode } = useTheme();
    const theme = FieldTheme(mode);

    return (
        <ThemeProvider theme={theme}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    label={label}
                    name={name}
                    value={value ? dayjs(value) : null}
                    className="w-full"
                    onChange={onChange}
                    format="DD-MM-YYYY"
                    required
                    shouldDisableDate={(date) => restrictFutureDates && dayjs(date).isBefore(dayjs(), "day")}
                />
            </LocalizationProvider>
        </ThemeProvider>
    );
};

export default StyledDateField;
