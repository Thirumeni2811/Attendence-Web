import React, { useEffect, useState } from "react";
import { TableContainer, Table, TableHead, TableBody, TableRow, TablePagination } from "@mui/material";
import StyledTableCell from "../form/Fields/StyledTableCell";
import { useTheme } from "../Theme/ThemeContext";
import { formatDate } from "../../utils/DateTime";
import StyledTableHead from "../form/Fields/StyledTableHead";
import axios from "axios";
import Loaders from "../Loader/Loaders";
import {getConfig, GET_LEAVE_BY_EMPID } from "../../services";
import { useParams } from "react-router-dom";

//table
const columns = [
    { id: 'sno', label: 'S.No', minWidth: 50 },
    { id: 'employee', label: 'Employee', minWidth: 170 },
    { id: 'leaveType', label: 'Leave Type', minWidth: 170 },
    { id: 'startDate', label: 'Leave - Start Date', minWidth: 170 },
    { id: 'endDate', label: 'Leave - End Date', minWidth: 170 },
    { id: 'reason', label: 'Reason', minWidth: 170 },
    { id: 'status', label: 'Status', minWidth: 170 },
    { id: 'feedback', label: 'Feedback', minWidth: 170 },
    { id: 'approvedBy', label: 'Reviewed By', minWidth: 170 },
];

const LeaveUserTable = () => {
    const { id } = useParams();

    const { mode } = useTheme();

    const [leaves, setLeaves] = useState([])
    // console.log(leaves);
    const [loading, setLoading] = useState(false)

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    //get the leaves
    const fetchLeaves = async () => {
        setLoading(true);
        try {
            const response = await axios.get(GET_LEAVE_BY_EMPID(id), getConfig());
            // console.log('Fetch response:', response.data);
            setLeaves(response?.data?.data || []);
            setPage(0);
        } catch (error) {
            console.error('Fetch Error:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLeaves();
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const paginatedLeaves = leaves?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    const startingIndex = page * rowsPerPage

    return (
        <>
            <section className='wholeContainer'>
                <div className='tableContainer1'>
                    {
                        loading ? (
                            <Loaders />
                        ) : (
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
                                        {Array.isArray(leaves) && leaves.length > 0 ? (
                                            paginatedLeaves.map((item, index) => (
                                                <TableRow hover role="checkbox" tabIndex={-1} key={item.id}>
                                                    <StyledTableCell>{startingIndex + index + 1}</StyledTableCell>
                                                    <StyledTableCell>{item?.employee?.name || "-"}</StyledTableCell>
                                                    <StyledTableCell>{item?.leaveType || "-"}</StyledTableCell>
                                                    <StyledTableCell>{formatDate(item?.startDate || "")}</StyledTableCell>
                                                    <StyledTableCell>{formatDate(item?.endDate || "")}</StyledTableCell>
                                                    <StyledTableCell>{item?.reason || "-"}</StyledTableCell>
                                                    <StyledTableCell>{item?.status || "-"}</StyledTableCell>
                                                    <StyledTableCell>{item?.feedback || "-"}</StyledTableCell>
                                                    <StyledTableCell>
                                                        {item?.approvedBy?.name || "-"}
                                                        {item?.approvedBy?.designation?.name || item?.approvedBy?.department?.name ? (
                                                            <>
                                                                <br />
                                                                ({item?.approvedBy?.designation?.name || "-"} - {item?.approvedBy?.department?.name || "-"})
                                                            </>
                                                        ) : null}
                                                    </StyledTableCell>

                                                </TableRow>
                                            ))
                                        ) : (
                                            <TableRow>
                                                <StyledTableCell colSpan={10}>No Leave available</StyledTableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        )
                    }

                    {
                        !loading && (
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
                                component="div"
                                count={leaves?.length || 0}
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
                        )
                    }
                </div>
            </section>
        </>
    );
};

export default LeaveUserTable;
