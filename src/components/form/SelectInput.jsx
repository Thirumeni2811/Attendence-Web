import React from 'react';
import { styled } from '@mui/material/styles';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const StyledAutocomplete = styled(Autocomplete)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '0.75rem',
    backgroundColor: '#FAFAFA',
    cursor: 'pointer', 
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: '#008000',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#008000',
    },
  },
  '& .MuiInputLabel-root': {
    color: 'gray',
    fontFamily: 'gotham',
    fontSize: '1rem',
    '&.Mui-focused': {
      color: '#008000',
      fontSize: '0.95rem',    
    },
  },
  '& .MuiAutocomplete-input': {
    cursor: 'pointer',
  },
  '& input': {
    color: '#3D3D3D',
    fontWeight: 500,
    fontFamily: 'gotham',
  },
}));

const SelectInput = ({ id, label, options, value, onChange, required = false, multiple = false, disabled = false }) => (
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
    }} // Disable interaction in edit mode
    renderInput={(params) => (
      <TextField
        {...params}
        label={label}
        required={required}
        disabled={disabled} // Show it as visually disabled (blur effect)
      />
    )}
    sx={{ width: '100%' }}
  />
);


export default SelectInput;
