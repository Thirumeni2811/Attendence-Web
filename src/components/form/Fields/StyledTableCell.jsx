import { styled } from '@mui/system';
import { TableCell } from '@mui/material';
import { useTheme } from '../../Theme/ThemeContext';

const statusColors = {
    overdue: 'red',
    completed: 'green',
    pending: 'orange',
};

const ThemedTableCell = styled(TableCell)(({ theme, status, mode }) => ({
    fontFamily: 'gotham',
    fontWeight: 500,
    fontSize: '0.85rem',
    border: `1px solid ${mode === "dark" ? "#8888883B" : "#c0c0c0"}`,
    textAlign: 'center',
    color: status ? statusColors[status] : mode === "dark" ? "#808080" : "black",
}));

const StyledTableCell = (props) => {
    const { mode } = useTheme();
    return <ThemedTableCell {...props} mode={mode} />;
};

export default StyledTableCell;
