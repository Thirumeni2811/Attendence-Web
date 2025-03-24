import React from "react";
import { styled } from "@mui/material/styles";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useTheme } from "../../Theme/ThemeContext";

const StyledAutocomplete = styled(Autocomplete)(({}) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: "0.75rem",
    backgroundColor: "#FAFAFA",
    cursor: "pointer",
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#008000",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#008000",
    },
  },
  "& .MuiInputLabel-root": {
    color: "gray",
    fontFamily: "Albert Sans",
    fontSize: "1rem",
    "&.Mui-focused": {
      color: "#008000",
      fontSize: "0.95rem",
    },
  },
  "& .MuiAutocomplete-input": {
    cursor: "pointer",
  },
  "& input": {
    color: "#3D3D3D", 
    fontWeight: 500,
    fontFamily: "Albert Sans",
  },
  "& .MuiSvgIcon-root": {
    color: "#3D3D3D", 
  },
}));

const SelectInput1 = ({ id, label, options, value, onChange, required = false, multiple = false, disabled = false }) => {

  return (
    <StyledAutocomplete
      id={id}
      multiple={multiple}
      disablePortal
      options={options}
      value={value}
      onChange={(_, newValue) => {
        if (!disabled) {
          onChange(newValue);
        }
      }}
      renderInput={(params) => (
        <TextField {...params} label={label} required={required} disabled={disabled} />
      )}
      sx={{ width: "100%" }}
    //   componentsProps={{
    //     paper: {
    //       sx: {
    //         backgroundColor: mode === "dark" ? "#1E1E1E" : "#F5F5F5", 
    //         color: mode === "dark" ? "white" : "black", 
    //       },
    //     },
    //   }}
    />
  );
};

export default SelectInput1;
