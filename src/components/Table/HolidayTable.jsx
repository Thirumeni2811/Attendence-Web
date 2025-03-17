import React, { useState } from "react";
import { TableContainer, Table, TableHead, TableBody, TableRow, TablePagination } from "@mui/material";
import StyledTableCell from "../form/Fields/StyledTableCell";
import Edit from "../form/Button/Edit";
import Delete from "../form/Button/Delete";
import { formatDate } from "../../utils/DateTime";

//table
const columns = [
    { id: 'sno', label: 'S.No', minWidth: 50 },
    { id: 'date', label: 'Holiday Date', minWidth: 170 },
    { id: 'reason', label: 'Holiday Reason', minWidth: 170 },
    { id: 'action', label: 'Action', minWidth: 170 },
];

const HolidayTable = ({ holidays, handleEdit, handleModal }) => {

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const paginatedHolidays = holidays?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    const startingIndex = page * rowsPerPage

    return (
        <>
            <TableContainer className="scrollbar max-h-auto overflow-y-auto">

                <Table stickyHeader aria-label="sticky table" className="border-1 border-border">
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
                        {Array.isArray(holidays) && holidays.length > 0 ? (
                            paginatedHolidays.map((holiday, index) => (
                                <TableRow hover role="checkbox" tabIndex={-1} key={holiday.id}>
                                    <StyledTableCell>{startingIndex + index + 1}</StyledTableCell>
                                    <StyledTableCell>
                                        {formatDate(holiday?.date || "")}
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        {holiday?.reason || "-"}</StyledTableCell>
                                    <StyledTableCell>
                                        <Edit onClick={() => handleEdit(holiday)} />
                                        <Delete onClick={() => handleModal(holiday)} />
                                    </StyledTableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <StyledTableCell colSpan={4}>No Holiday available</StyledTableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={holidays?.length || 0}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </>
    );
};

export default HolidayTable;
