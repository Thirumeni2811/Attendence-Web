import React, { useEffect, useState } from "react";
import { TableContainer, Table, TableHead, TableBody, TableRow, TablePagination } from "@mui/material";
import StyledTableCell from "../form/Fields/StyledTableCell";
import { useTheme } from "../Theme/ThemeContext";
import { formatDateTimeToIST } from "../../utils/DateTime";
import StyledTableHead from "../form/Fields/StyledTableHead";
import axios from "axios";
import Loaders from "../Loader/Loaders";
import { getConfig, GET_ATTENDANCE_BY_ID } from "../../services";
import { useParams } from "react-router-dom";
import Badge from "../form/Badge/Badge";

//table
const columns = [
    { id: 'sno', label: 'S.No', minWidth: 50 },
    { id: 'latitude', label: 'Latitude', minWidth: 170 },
    { id: 'longitude', label: 'Longitude', minWidth: 170 },
    { id: 'address', label: 'Address', minWidth: 170 },
    { id: 'time', label: 'Time', minWidth: 170 },
    { id: 'status', label: 'Status', minWidth: 170 },
];

const AttendanceUserTable = () => {
    const { id } = useParams();

    const { mode } = useTheme();

    const [attendances, setAttendance] = useState([])
    // console.log(attendances);
    const [loading, setLoading] = useState(false)

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    //get the attendances
    const fetchAttendance = async () => {
        setLoading(true);
        try {
            const response = await axios.get(GET_ATTENDANCE_BY_ID(id), getConfig());
            console.log('Fetch response:', response.data);
            setAttendance(response?.data?.data || []);
            setPage(0);
        } catch (error) {
            console.error('Fetch Error:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAttendance();
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const paginatedAttendance = attendances?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
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
                                        {Array.isArray(attendances) && attendances.length > 0 ? (
                                            paginatedAttendance.map((item, index) => (
                                                <TableRow hover role="checkbox" tabIndex={-1} key={item.id}>
                                                    <StyledTableCell>{startingIndex + index + 1}</StyledTableCell>
                                                    <StyledTableCell>{item?.location?.address || "-"}</StyledTableCell>
                                                    <StyledTableCell>{item?.location?.latitude || "-"}</StyledTableCell>
                                                    <StyledTableCell>{item?.location?.longitude || "-"}</StyledTableCell>
                                                    <StyledTableCell>{formatDateTimeToIST(item?.date || "")}</StyledTableCell>
                                                    <StyledTableCell>
                                                        <Badge item={item}/>
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
                                count={attendances?.length || 0}
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

export default AttendanceUserTable;
