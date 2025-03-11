import React from 'react';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { useTheme } from '../Theme/ThemeContext';

const CSSTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: "0.75rem",
    backgroundColor: "FAFAFA" ,
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#008000",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#008000",
    },
  },
  "& .MuiInputLabel-root": {
    color: "gray",
    fontFamily: 'gotham',
    fontSize: '1rem',
    "&.Mui-focused": {
      color: "#008000",
      fontSize: '0.95rem',
    },
  },
  "& textarea": {
    color: "#3D3D3D",
    fontWeight: 500,
    fontFamily: 'gotham',
  },
  "& input": {
    color: "#3D3D3D",
    fontWeight: 500,
    fontFamily: 'gotham',
  },
}));

const TextInput1 = ({ id, label, value, onChange, type = "text", multiline = false, rows = 1, required = false, disabled = false, readOnly = false, placeholder = '', InputLabelProps = {} }) => (
    <CSSTextField
      id={id}
      label={label}
      variant="outlined"
      type={type}
      multiline={multiline}
      rows={rows}
      className="w-full"
      value={value}
      onChange={onChange}
      required={required}
      disabled={disabled}
      InputLabelProps={InputLabelProps}
      InputProps={{
        readOnly: readOnly,
        placeholder: placeholder,
      }}
    />
);

export default TextInput1;
