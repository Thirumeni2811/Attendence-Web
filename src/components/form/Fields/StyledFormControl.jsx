import { styled } from '@mui/system';
import { FormControl } from '@mui/material';

const StyledFormControl = styled(FormControl)(({ theme }) => ({
    "& .MuiOutlinedInput-root": {
        borderRadius: "0.75rem",
        backgroundColor: "#FAFAFA",
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
        fontWeight: '500',
        fontSize: '1rem',
        "&.Mui-focused": {
            color: "#008000",
            fontSize: '0.95rem',    
        },
    },

    "& .MuiSelect-select": {
        fontFamily: 'gotham',
        fontSize: '1rem',
        color: "#3D3D3D",
        fontWeight: 500,
    },
}));

export default StyledFormControl;
