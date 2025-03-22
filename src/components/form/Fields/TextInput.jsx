import React from 'react';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { useTheme } from '../../Theme/ThemeContext';

const CSSTextField = styled(TextField)(({ theme, mode }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: "0.75rem",
    backgroundColor: mode === "dark" ? "black" : "#FAFAFA",
    ...(mode === "dark" && { border: "1px solid #323232" }),
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#008000",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#008000",
    },
  },
  "& .MuiInputLabel-root": {
    color: "gray",
    fontFamily: 'Albert Sans',
    fontSize: '1rem',
    "&.Mui-focused": {
      color: "#008000",
      fontSize: '0.95rem',
    },
  },
  "& textarea": {
    color: mode === "dark" ? "#808080" : "#3D3D3D",
    fontWeight: 500,
    fontFamily: 'Albert Sans',
    resize: "vertical", // Allows vertical resizing
  },
  "& input": {
    color: mode === "dark" ? "#808080" : "#3D3D3D",
    fontWeight: 500,
    fontFamily: 'Albert Sans',
  },
}));

const TextInput = ({ id, label, value, onChange, type = "text", multiline = false, required = false, disabled = false, readOnly = false, placeholder = '', InputLabelProps = {} }) => {
  const { mode } = useTheme();
  return (
    <CSSTextField
      id={id}
      label={label}
      variant="outlined"
      type={type}
      multiline={multiline}
      minRows={multiline ? 1 : undefined} // Auto expands
      maxRows={multiline ? 6 : undefined}
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
      mode={mode}
    />
  )
}

export default TextInput;
