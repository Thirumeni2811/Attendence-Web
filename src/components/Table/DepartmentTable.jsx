import React, { useState } from "react";
import { TableContainer, Table, TableHead, TableBody, TableRow, TablePagination } from "@mui/material";
import StyledTableCell from "../form/Fields/StyledTableCell";
import Edit from "../form/Button/Edit";
import Delete from "../form/Button/Delete";
import StyledTableHead from "../form/Fields/StyledTableHead";
import { useTheme } from "../Theme/ThemeContext";

//table
const columns = [
    { id: 'sno', label: 'S.No', minWidth: 50 },
    { id: 'name', label: 'Department Name', minWidth: 170 },
    { id: 'description', label: 'Department Description', minWidth: 170 },
    { id: 'action', label: 'Action', minWidth: 170 },
];

const DepartmentTable = ({ departments, handleEdit, handleModal }) => {

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

    const paginatedDepartments = departments?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
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
                        {Array.isArray(departments) && departments.length > 0 ? (
                            paginatedDepartments.map((department, index) => (
                                <TableRow hover role="checkbox" tabIndex={-1} key={department.id}>
                                    <StyledTableCell>{startingIndex + index + 1}</StyledTableCell>
                                    <StyledTableCell>{department?.name || ""}</StyledTableCell>
                                    <StyledTableCell>{department?.description || "-"}</StyledTableCell>
                                    <StyledTableCell>
                                        <Edit onClick={() => handleEdit(department)} />
                                        <Delete onClick={() => handleModal(department)} />
                                    </StyledTableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <StyledTableCell colSpan={4}>No Department available</StyledTableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={departments?.length || 0}
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

export default DepartmentTable;
