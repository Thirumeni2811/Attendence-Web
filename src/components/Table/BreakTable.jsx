import React, { useState } from "react";
import { TableContainer, Table, TableHead, TableBody, TableRow, TablePagination } from "@mui/material";
import StyledTableCell from "../form/StyledTableCell";
import Edit from "../form/Button/Edit";
import Delete from "../form/Button/Delete";
import { useTheme } from "../Theme/ThemeContext";
import { formatTimeToIST } from "../../utils/DateTime";

//table
const columns = [
    { id: 'sno', label: 'S.No', minWidth: 50 },
    { id: 'breakType', label: 'Break Type', minWidth: 170 },
    { id: 'period', label: 'Period (in Mins)', minWidth: 170 },
    { id: 'startTime', label: 'Schedule - Start Time', minWidth: 170 },
    { id: 'endTime', label: 'Schedule - End Time', minWidth: 170 },
    { id: 'action', label: 'Action', minWidth: 170 },
];

const BreakTable = ({ breaks, handleEdit, handleModal }) => {

    const { mode } = useTheme();

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const paginatedBreaks = breaks?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    const startingIndex = page * rowsPerPage

    return (
        <>
            <TableContainer className="scrollbar max-h-auto overflow-y-auto">

                <Table
                    stickyHeader
                    aria-label="sticky table"
                    style={{
                        border: `1px solid ${mode === "dark" ? "#8888883B" : "#c0c0c0"}`,
                    }}
                >
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <StyledTableCell
                                    key={column.id}
                                    style={{
                                        minWidth: column.minWidth,
                                        fontWeight: "700",
                                        fontSize: "1rem",

                                    }}
                                >
                                    {column.label}
                                </StyledTableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Array.isArray(breaks) && breaks.length > 0 ? (
                            paginatedBreaks.map((item, index) => (
                                <TableRow hover role="checkbox" tabIndex={-1} key={item._id}>
                                    <StyledTableCell>{startingIndex + index + 1}</StyledTableCell>
                                    <StyledTableCell>{item?.breakType || "-"}</StyledTableCell>
                                    <StyledTableCell>{item?.period || "-"}</StyledTableCell>
                                    <StyledTableCell>
                                        {formatTimeToIST(item?.startTime) || ""}
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        {formatTimeToIST(item?.endTime) || ""}
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        <Edit onClick={() => handleEdit(item)} />
                                        <Delete onClick={() => handleModal(item)} />
                                    </StyledTableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <StyledTableCell colSpan={6}>No Break available</StyledTableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={breaks?.length || 0}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </>
    );
};

export default BreakTable;
