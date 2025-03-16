import { createTheme } from '@mui/material/styles';

const FieldTheme = (mode) => createTheme({
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: '0.75rem',
                        backgroundColor: mode === 'dark' ? '#151513' : '#FAFAFA',
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#008000',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#008000',
                        },
                    },
                    '& .MuiInputLabel-root': {
                        color: mode === "dark" ? "#808080" : "gray", 
                        fontFamily: 'gotham',
                        fontSize: '1rem',
                        '&.Mui-focused': {
                            color: '#008000',
                            fontSize: '0.95rem',
                        },
                    },
                    '& input': {
                        color: mode === 'dark' ? '#808080' : '#3D3D3D',
                        fontWeight: 500,
                        fontFamily: 'gotham',
                        cursor: 'pointer',
                    },
                },
            },
        },
    },
});

export default FieldTheme;
