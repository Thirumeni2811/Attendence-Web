import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { GET_EMPLOYEE_BY_ID, getConfig } from '../services';
import axios from 'axios';
import LeaveUserTable from '../components/Table/LeaveUserTable'
import AttendanceUserTable from '../components/Table/AttendanceUserTable'

const UserDetails = () => {
  const { id } = useParams();

  const [user, setUser] = useState({});
  // console.log(user)
  const [loading, setLoading] = useState(false)

  //table
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [roleFilter, setRoleFilter] = useState('');

  //get schedule by id
  const getUser = async () => {
    setLoading(true);
    try {
      const response = await axios.get(GET_EMPLOYEE_BY_ID(id), getConfig());
      setUser(response?.data?.data || {})
      setPage(0);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (id) getUser();
  }, [id]);

  return (
    <>
      <section>
        <div>
          <div className="font-extrabold text-3xl dark:text-textDark">
            {user?.name || "-"} {" "}
            {
              user?.role === "subAdmin" && (

                <span className="text-xl font-extrabold">| { }
                  <span className="text-primary">Sub Admin</span>
                </span>

              )
            }
          </div>
          <div className="flex gap-6 flex-wrap justify-around my-4">
            <div className="user">
              {user?.empId || "-"}
            </div>
            <div className="user">
              {user?.email || "-"}
            </div>
            <div className="user">
              {user?.phoneNo || "-"}
            </div>
            <div className="user">
              {user?.department?.name || "-"}
            </div>
            <div className="user">
              {user?.designation?.name || "-"}
            </div>
          </div>
        </div>
        <div className="grid gap-6 my-6">
          <div className="tableContainer">
            <h1 className="font-extrabold text-2xl dark:text-textDark">Leave</h1>
            <LeaveUserTable />
          </div>
          <div className="tableContainer">
            <h1 className="font-extrabold text-2xl dark:text-textDark">Attendance</h1>
            <AttendanceUserTable />
          </div>
        </div>
      </section>
    </>
  )
}

export default UserDetails