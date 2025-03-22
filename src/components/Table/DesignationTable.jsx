import React, { useState } from "react";
import { TableContainer, Table, TableHead, TableBody, TableRow, TablePagination } from "@mui/material";
import StyledTableCell from "../form/Fields/StyledTableCell";
import Edit from "../form/Button/Edit";
import Delete from "../form/Button/Delete";
import { useTheme } from "../Theme/ThemeContext";
import StyledTableHead from "../form/Fields/StyledTableHead";

//table
const columns = [
    { id: 'sno', label: 'S.No', minWidth: 50 },
    { id: 'name', label: 'Designation Name', minWidth: 170 },
    { id: 'description', label: 'Designation Description', minWidth: 170 },
    { id: 'action', label: 'Action', minWidth: 170 },
];

const DesignationTable = ({ designations, handleEdit, handleModal }) => {

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

    const paginatedDesignations = designations?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
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
                                <StyledTableHead
                                    key={column.id}
                                    style={{
                                        minWidth: column.minWidth,
                                        fontWeight: "700",
                                        fontSize: "1rem",

                                    }}
                                >
                                    {column.label}
                                </StyledTableHead>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Array.isArray(designations) && designations.length > 0 ? (
                            paginatedDesignations.map((designation, index) => (
                                <TableRow hover role="checkbox" tabIndex={-1} key={designation.id}>
                                    <StyledTableCell>{startingIndex + index + 1}</StyledTableCell>
                                    <StyledTableCell>{designation?.name || ""}</StyledTableCell>
                                    <StyledTableCell>{designation?.description || "-"}</StyledTableCell>
                                    <StyledTableCell>
                                        <Edit onClick={() => handleEdit(designation)} />
                                        <Delete onClick={() => handleModal(designation)} />
                                    </StyledTableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <StyledTableCell colSpan={4}>No Designation available</StyledTableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={designations?.length || 0}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                sx={{
                    color: mode === "dark" ? "#808080" : "black", 
                    "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows": {
                        color: mode === "dark" ? "#808080" : "black", 
                    },
                    "& .MuiSelect-icon": {
                        color: mode === "dark" ? "#808080" : "black", 
                    },
                    "& .MuiSvgIcon-root": {
                        color: mode === "dark" ? "#808080" : "black", 
                    },
                }}
            />
        </>
    );
};

export default DesignationTable;
