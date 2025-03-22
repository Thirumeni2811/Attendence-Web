import { createTheme } from '@mui/material/styles';

const FieldTheme = (mode) => createTheme({
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: '0.75rem',
                        backgroundColor: mode === 'dark' ? 'black' : '#FAFAFA',
                        ...(mode === "dark" && { border: "1px solid #323232" }),
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#008000',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#008000',
                        },
                    },
                    '& .MuiInputLabel-root': {
                        color: mode === "dark" ? "#808080" : "gray", 
                        fontFamily: 'Albert Sans',
                        fontSize: '1rem',
                        '&.Mui-focused': {
                            color: '#008000',
                            fontSize: '0.95rem',
                        },
                    },
                    '& input': {
                        color: mode === 'dark' ? '#808080' : '#3D3D3D',
                        fontWeight: 500,
                        fontFamily: 'Albert Sans',
                        cursor: 'pointer',
                    },
                },
            },
        },
    },
});

export default FieldTheme;
