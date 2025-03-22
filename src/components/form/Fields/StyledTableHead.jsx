import { styled } from '@mui/system';
import { TableCell } from '@mui/material';
import { useTheme } from '../../Theme/ThemeContext';

const ThemedTableCell = styled(TableCell)(({ theme, mode }) => ({
    fontFamily: "Albert Sans",
    fontWeight: 500,
    fontSize: "0.85rem",
    border: `1px solid ${mode === "dark" ? "#8888883B" : "#c0c0c0"}`,
    textAlign: "center",
    color: mode === "dark" ? "#808080" : "black",
    backgroundColor: mode === "dark" ? "black" : "#FAFAFA", 
}));

const StyledTableHead = (props) => {
    const { mode } = useTheme();
    return <ThemedTableCell {...props} mode={mode} />;
};

export default StyledTableHead;
