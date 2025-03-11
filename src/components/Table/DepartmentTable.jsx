import React, { useState } from "react";
import { TableContainer, Table, TableHead, TableBody, TableRow, TablePagination } from "@mui/material";
import StyledTableCell from "../form/StyledTableCell";
import Edit from "../form/Button/Edit";
import Delete from "../form/Button/Delete";

const DepartmentTable = ({ columns, departments, handleEdit, handleModal }) => {

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
            <TableContainer sx={{ maxHeight: "auto", overflowY: "auto" }} className="scrollbar">

                <Table stickyHeader aria-label="sticky table" style={{ border: "1px solid #c0c0c0" }}>
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
                        {Array.isArray(departments) && departments.length > 0 ? (
                            paginatedDepartments.map((department, index) => (
                                <TableRow hover role="checkbox" tabIndex={-1} key={department.id}>
                                    <StyledTableCell>{startingIndex + index + 1}</StyledTableCell>
                                    <StyledTableCell>{department.name}</StyledTableCell>
                                    <StyledTableCell>{department.description || "-"}</StyledTableCell>
                                    <StyledTableCell>
                                        <Edit onClick={() => handleEdit(department)}/>
                                        <Delete  onClick={() => handleModal(department)}/>
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
            />
        </>
    );
};

export default DepartmentTable;
