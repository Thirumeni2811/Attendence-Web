const BASE_URL = "https://attendence-api-e4oc.onrender.com/v1"
// const BASE_URL = "http://localhost:3006/v1"

//Default config
export const getConfig = () => {
    const token = sessionStorage.getItem("token");
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
};

//Login config
export const LOGIN_CONFIG = {
    headers: {
        "Content-Type": "application/json",
    },
};

//Login and register
export const LOGIN = `${BASE_URL}/auth/login`
export const REGISTER = `${BASE_URL}/auth/register`
export const REFRESH_TOKEN = `${BASE_URL}/auth/refresh-tokens`

//Organisation
export const GET_ORGANISATION = `${BASE_URL}/organisation`
export const GET_ORGANISATION_BY_TOKEN = `${BASE_URL}/organisation`
export const CREATE_ORGANISATION = `${BASE_URL}/organisation`
export const UPDATE_ORGANISATION = (id) => `${BASE_URL}/organisation/${id}`

//Batch
export const GET_BATCH = `${BASE_URL}/organisation/batch`
export const CREATE_BATCH = `${BASE_URL}/organisation/batch`

//Department
export const GET_DEPARTMENT = `${BASE_URL}/department`
export const CREATE_DEPARTMENT = `${BASE_URL}/department`
export const UPDATE_DEPARTMENT = (deptId) => `${BASE_URL}/department/${deptId}`
export const DELETE_DEPARTMENT = (deptId) => `${BASE_URL}/department/${deptId}`

//Designation
export const GET_DESIGNATION = `${BASE_URL}/designation`
export const CREATE_DESIGNATION = `${BASE_URL}/designation`
export const UPDATE_DESIGNATION = (destId) => `${BASE_URL}/designation/${destId}`
export const DELETE_DESIGNATION = (destId) => `${BASE_URL}/designation/${destId}`

//Schedule
export const GET_SCHEDULE = `${BASE_URL}/schedule`
export const CREATE_SCHEDULE = `${BASE_URL}/schedule`
export const GET_SCHEDULE_BY_ID = (scheduleId) => `${BASE_URL}/schedule/${scheduleId}`
export const UPDATE_SCHEDULE = (scheduleId) => `${BASE_URL}/schedule/${scheduleId}`
export const DELETE_SCHEDULE = (scheduleId) => `${BASE_URL}/schedule/${scheduleId}`

//Break
export const CREATE_BREAK = (scheduleId) => `${BASE_URL}/schedule/${scheduleId}/breaks`
export const UPDATE_BREAK = (scheduleId, breakId) => `${BASE_URL}/schedule/${scheduleId}/breaks/${breakId}`
export const DELETE_BREAK = (scheduleId, breakId) => `${BASE_URL}/schedule/${scheduleId}/breaks/${breakId}`

//Holiday
export const GET_HOLIDAY = `${BASE_URL}/holiday`
export const CREATE_HOLIDAY = `${BASE_URL}/holiday`
export const UPDATE_HOLIDAY = (holidayId) => `${BASE_URL}/holiday/${holidayId}`
export const DELETE_HOLIDAY = (holidayId) => `${BASE_URL}/holiday/${holidayId}`

//Leave
export const GET_LEAVE = `${BASE_URL}/leave/getAll`
export const GET_LEAVE_BY_EMPID = (empId) => `${BASE_URL}/leave/${empId}`

//User
export const GET_EMPLOYEE = `${BASE_URL}/employee`
export const CREATE_EMPLOYEE = `${BASE_URL}/employee`
export const GET_EMPLOYEE_BY_ID = (empId) => `${BASE_URL}/employee/${empId}`
export const UPDATE_EMPLOYEE = (empId) => `${BASE_URL}/employee/${empId}`
export const DELETE_EMPLOYEE = (empId) => `${BASE_URL}/employee/${empId}`

//Attendance
export const GET_ATTENDANCE_BY_ID = (empId) => `${BASE_URL}/attendence/${empId}`
