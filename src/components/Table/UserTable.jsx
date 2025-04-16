import React, { useState } from "react";
import { TableContainer, Table, TableHead, TableBody, TableRow, TablePagination } from "@mui/material";
import StyledTableCell from "../form/Fields/StyledTableCell";
import Edit from "../form/Button/Edit";
import Delete from "../form/Button/Delete";
import { useTheme } from "../Theme/ThemeContext";
import StyledTableHead from "../form/Fields/StyledTableHead";
import ImageViewer from "../image/ImageViewer"
import UserSwitch from "../Switch/UserSwitch";
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import { Link } from "react-router-dom";

//table
const columns = [
    { id: 'sno', label: 'S.No', minWidth: 50 },
    { id: 'photo', label: 'Profile Picture', minWidth: 170 },
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'empId', label: 'ID', minWidth: 170 },
    { id: 'email', label: 'Email', minWidth: 170 },
    { id: 'phoneNo', label: 'Phone Number', minWidth: 170 },
    { id: 'department', label: 'Department', minWidth: 170 },
    { id: 'designation', label: 'Designation', minWidth: 170 },
    { id: 'active', label: 'Status', minWidth: 170 },
    { id: 'view', label: 'View', minWidth: 170 },
    { id: 'action', label: 'Action', minWidth: 170 },
];

const UserTable = ({ users, handleEdit, handleModal }) => {

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

    const filteredUsers = users.filter(user => user.role !== "admin");
    const paginatedUsers = filteredUsers?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

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
                        {Array.isArray(users) && users.length > 0 ? (
                            paginatedUsers.map((user, index) => (
                                <TableRow hover role="checkbox" tabIndex={-1} key={user.id}>
                                    <StyledTableCell>{startingIndex + index + 1}</StyledTableCell>
                                    <StyledTableCell>
                                        <ImageViewer
                                            imgUrl={user?.photo || ""}
                                            name={user?.name || ""}
                                            role={user.role}
                                        />
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        {user?.name || ""}
                                        <div className="font-extrabold uppercase">
                                            {user.role === "subAdmin" && "(Sub Admin)"}
                                        </div>
                                    </StyledTableCell>
                                    <StyledTableCell>{user?.empId || "-"}</StyledTableCell>
                                    <StyledTableCell>{user?.email || "-"}</StyledTableCell>
                                    <StyledTableCell>{user?.phoneNo || "-"}</StyledTableCell>
                                    <StyledTableCell>{user?.department?.name || "-"}</StyledTableCell>
                                    <StyledTableCell>{user?.designation?.name || "-"}</StyledTableCell>
                                    <StyledTableCell>
                                        <UserSwitch data={user} />
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        <Link
                                            to={`/user/${user.id}`}
                                        >
                                            <PermContactCalendarIcon className="hover:text-primary" />
                                        </Link>
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        <Edit onClick={() => handleEdit(user)} />
                                        <Delete onClick={() => handleModal(user)} />
                                    </StyledTableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <StyledTableCell colSpan={8}>No User available</StyledTableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={filteredUsers?.length || 0}
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

export default UserTable;
