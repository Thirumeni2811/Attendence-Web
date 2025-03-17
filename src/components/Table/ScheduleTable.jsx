import React, { useState } from "react";
import { TableContainer, Table, TableHead, TableBody, TableRow, TablePagination } from "@mui/material";
import StyledTableCell from "../form/Fields/StyledTableCell";
import Edit from "../form/Button/Edit";
import Delete from "../form/Button/Delete";
import { useTheme } from "../Theme/ThemeContext";
import TableViewOutlinedIcon from '@mui/icons-material/TableViewOutlined';
import { Link } from "react-router-dom";
import { formatTimeToIST } from "../../utils/DateTime";

//table
const columns = [
    { id: 'sno', label: 'S.No', minWidth: 50 },
    { id: 'name', label: 'Schedule Name', minWidth: 170 },
    { id: 'description', label: 'Schedule Description', minWidth: 370 },
    { id: 'workingStartTime', label: 'Schedule - Start Time', minWidth: 170 },
    { id: 'workingEndTime', label: 'Schedule - End Time', minWidth: 170 },
    { id: 'break', label: 'Break', minWidth: 170 },
    { id: 'action', label: 'Action', minWidth: 170 },
];

const ScheduleTable = ({ schedules, handleEdit, handleModal }) => {

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

    const paginatedSchedules = schedules?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
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
                        {Array.isArray(schedules) && schedules.length > 0 ? (
                            paginatedSchedules.map((schedule, index) => (
                                <TableRow hover role="checkbox" tabIndex={-1} key={schedule.id}>
                                    <StyledTableCell>{startingIndex + index + 1}</StyledTableCell>
                                    <StyledTableCell>{schedule?.name || "-"}</StyledTableCell>
                                    <StyledTableCell className="text-justify">{schedule?.description || "-"}</StyledTableCell>
                                    {/* <StyledTableCell>{schedule.workingHours.startTime || "-"}</StyledTableCell> */}
                                    <StyledTableCell>
                                        {formatTimeToIST(schedule?.workingHours?.startTime) || ""}
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        {formatTimeToIST(schedule?.workingHours?.endTime) || ""}
                                    </StyledTableCell>
                                    {/* <StyledTableCell>{schedule.workingHours.endTime || "-"}</StyledTableCell> */}
                                    <StyledTableCell>
                                        <Link
                                            to={`/schedule-breaks/${schedule.id}`}
                                            className="cursor-pointer"
                                        >
                                            <TableViewOutlinedIcon />
                                        </Link>
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        <Edit onClick={() => handleEdit(schedule)} />
                                        <Delete onClick={() => handleModal(schedule)} />
                                    </StyledTableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <StyledTableCell colSpan={4}>No Schedule available</StyledTableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={schedules?.length || 0}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </>
    );
};

export default ScheduleTable;
