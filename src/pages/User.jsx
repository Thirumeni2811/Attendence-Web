import React, { useEffect, useState } from 'react';
import TextInput from '../components/form/Fields/TextInput';
import { Box } from '@mui/material';
import ModalView from '../components/Modal/ModalView';
import axios from 'axios';
import Button from '../components/form/Button/Button';
import { getConfig, CREATE_DESIGNATION, DELETE_DESIGNATION, GET_DESIGNATION, UPDATE_DESIGNATION, GET_DEPARTMENT, GET_EMPLOYEE, CREATE_EMPLOYEE, UPDATE_EMPLOYEE, DELETE_EMPLOYEE } from '../services';
import Loaders from '../components/Loader/Loaders';
import UserTable from '../components/Table/UserTable';
import Error from '../components/form/Button/Error'
import SelectInput from '../components/form/Fields/SelectInput';
import CheckBox from '../components/form/Checkbox/Checkbox';

const User = () => {
    //field
    const [formData, setFormData] = useState({
        name: '',
        empId: '',
        email: '',
        phoneNo: '',
        password: '',
        department: '',
        designation: '',
        role: 'user',
    });
    console.log(formData)
    const [errors, setErrors] = useState({
        name: '',
        empId: '',
        email: '',
        phoneNo: '',
        password: '',
        department: '',
        designation: '',
    });

    const [generalError, setGeneralError] = useState({
        empId: '',
        email: '',
        phoneNo: '',
    });
    // console.log(generalError)
    const [loading, setLoading] = useState(false)

    const [users, setUsers] = useState([])
    // console.log(users);

    const [departments, setDepartments] = useState([])
    // console.log(departments);

    const [designations, setDesignations] = useState([])
    // console.log(designations);

    const [isEditing, setIsEditing] = useState(false);
    const [userId, setUserId] = useState(null);

    const [openModal, setOpenModal] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);

    const handleCloseModal = () => setOpenModal(false);

    //table
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [roleFilter, setRoleFilter] = useState('');

    //field
    const handleChange = (fieldName) => (e) => {
        setFormData({
            ...formData,
            [fieldName]: e.target.value,
        });

        // Reset the error message if the field contains a value
        if (e.target.value.trim() !== '') {
            setErrors(prevErrors => ({
                ...prevErrors,
                [fieldName]: '',
            }));
        }
        if (e.target.value.trim() !== '') {
            setGeneralError(prevErrors => ({
                ...prevErrors,
                [fieldName]: '',
            }));
        }
    };

    const handleSelectChange = (fieldName) => (newValue) => {
        setFormData({
            ...formData,
            [fieldName]: newValue,
        });

        // Reset the error message for the select input
        if (newValue) {
            setErrors(prevErrors => ({
                ...prevErrors,
                [fieldName]: '',
            }));
        }
    };

    const validateForm = () => {
        let isValid = true;
        let newErrors = { ...errors };

        // Reset all errors before validation
        Object.keys(newErrors).forEach(key => (newErrors[key] = ''));
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!formData.name) {
            newErrors.name = 'User Name is required';
            isValid = false;
        }

        if (!formData.empId) {
            newErrors.empId = 'ID is required';
            isValid = false;
        }

        if (!formData.email) {
            newErrors.email = "Email is required";
            isValid = false;
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = "Invalid email format";
            isValid = false;
        }

        if (!formData.phoneNo) {
            newErrors.phoneNo = "Phone Number is required";
            isValid = false;
        }

        if (!formData.password) {
            newErrors.password = "Password is required";
            isValid = false;
        }

        if (!formData.department) {
            newErrors.department = "Department is required";
            isValid = false;
        }

        if (!formData.designation) {
            newErrors.designation = "Designation is required";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    //get the departments
    const fetchDepartments = async () => {
        setLoading(true);
        try {
            const response = await axios.get(GET_DEPARTMENT, getConfig());
            // console.log('Fetch response:', response.data);
            setDepartments(response?.data?.data || []);
            setPage(0);
        } catch (error) {
            console.error('Fetch Error:', error);
        } finally {
            setLoading(false);
        }
    };

    //get the Designations
    const fetchDesignations = async () => {
        setLoading(true);
        try {
            const response = await axios.get(GET_DESIGNATION, getConfig());
            // console.log('Fetch response:', response.data);
            setDesignations(response?.data?.data || []);
            setPage(0);
        } catch (error) {
            console.error('Fetch Error:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDepartments();
        fetchDesignations();
    }, []);

    //get the Users
    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await axios.get(GET_EMPLOYEE, getConfig());
            // console.log('Fetch response:', response.data);
            setUsers(response?.data?.data || []);
            setPage(0);
        } catch (error) {
            console.error('Fetch Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleRoleFilterChange = async (event) => {
        const selectedRoleFilter = event.target.value;
        setRoleFilter(selectedRoleFilter);
        await fetchUsers(selectedRoleFilter);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    //add or update
    const addUser = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            setLoading(true);
            const data = {
                ...formData,
                department: formData?.department?.value,
                designation: formData?.designation?.value,
            }
            try {
                if (isEditing) {
                    // console.log(userId)
                    const response = await axios.patch(UPDATE_EMPLOYEE(userId), data, getConfig());
                    // console.log('Users updated successfully:', response?.data);
                    setIsEditing(false);
                    setUserId(null);
                } else {
                    console.log(data)
                    const response = await axios.post(CREATE_EMPLOYEE, data, getConfig());
                    console.log('User added successfully:', response?.data);
                }
                await fetchUsers();
                setFormData({
                    name: '',
                    empId: '',
                    email: '',
                    phoneNo: '',
                    password: '',
                    department: '',
                    designation: '',
                    role: 'user',
                });
            } catch (error) {
                console.error('Error in saving users data:', error.response ? error.response.data : error.message);
                alert('Failed to save users data.');
                if (error.response && error.response.data && error.response.data.message) {
                    const errorMessage = error.response.data.message;

                    if (errorMessage.includes('Email')) {
                        setGeneralError(prev => ({ ...prev, email: errorMessage }));
                    } else if (errorMessage.includes('Employee ID')) {
                        setGeneralError(prev => ({ ...prev, empId: errorMessage }));
                    } else if (errorMessage.includes('Phone number')) {
                        setGeneralError(prev => ({ ...prev, phoneNo: errorMessage }));
                    }
                }
            } finally {
                setLoading(false);
            }
        }
    };

    const handleEdit = (user) => {
        const department = user.department
            ? { label: user.department.name || "", value: user.department.id || "" }
            : { label: "", value: "" };

        const designation = user.designation
            ? { label: user.designation.name || "", value: user.designation.id || "" }
            : { label: "", value: "" };

        setFormData({
            name: user.name,
            empId: user.empId,
            email: user.email,
            phoneNo: user.phoneNo,
            password: user.password,
            department,
            designation,
            role: user.role,
        });

        setIsEditing(true);
        setUserId(user.id);
    };

    const handleModal = (user) => {
        // console.log(`Delete clicked in ${user.id}`);

        setSelectedRow(user);
        setOpenModal(true);
    };

    const handleDelete = async (userId) => {
        setLoading(true);
        try {
            const response = await axios.delete(DELETE_EMPLOYEE(userId), getConfig());
            // console.log(`Deleted : ${userId}: `, response);
            const updatedUsers = users.filter(user => user.id !== userId);
            setUsers(updatedUsers);
            const totalPages = Math.ceil(updatedUsers.length / rowsPerPage);

            if (page >= totalPages) {
                setPage(totalPages - 1);
            }
            handleCloseModal()

        } catch (error) {
            console.error('Error deleting user:', error.response ? error.response.data : error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <section className='wholeContainer'>

                <form noValidate className='form-container' onSubmit={addUser}>

                    <Box
                        className='box-container3'
                    >

                        <div>
                            <Error error={errors.name} />
                            <TextInput
                                id="name"
                                name="name"
                                label="Name"
                                value={formData.name || ''}
                                onChange={handleChange('name')}
                                required
                            />
                        </div>

                        <div>
                            <Error error={errors.empId} />
                            <TextInput
                                id="empId"
                                name="empId"
                                label="ID"
                                value={formData.empId || ''}
                                onChange={handleChange('empId')}
                                required
                            />
                            <Error error={generalError.empId} />
                        </div>

                        <div>
                            <Error error={errors.email} />
                            <TextInput
                                id="email"
                                name="email"
                                label="Email"
                                value={formData.email || ''}
                                onChange={handleChange('email')}
                                required
                            />
                            <Error error={generalError.email} />
                        </div>

                        {
                            !isEditing && (
                                <div>
                                    <Error error={errors.password} />
                                    <TextInput
                                        id="password"
                                        name="password"
                                        label="Password"
                                        value={formData.password || ''}
                                        onChange={handleChange('password')}
                                        required
                                    />
                                </div>
                            )
                        }

                        <div>
                            <Error error={errors.phoneNo} />
                            <TextInput
                                id="phoneNo"
                                name="phoneNo"
                                label="Phone Number"
                                value={formData.phoneNo || ''}
                                onChange={handleChange('phoneNo')}
                                required
                            />
                            <Error error={generalError.phoneNo} />
                        </div>

                        <div>
                            <Error error={errors.department} />
                            <SelectInput
                                id="department"
                                name="department"
                                label="Department"
                                options={departments.map(dept => ({
                                    label: dept.name,
                                    value: dept.id
                                }))}
                                value={formData.department || ''}
                                onChange={handleSelectChange('department')}
                                required
                            />
                        </div>

                        <div>
                            <Error error={errors.designation} />
                            <SelectInput
                                id="designation"
                                name="designation"
                                label="Designation"
                                options={designations.map(dept => ({
                                    label: dept.name,
                                    value: dept.id
                                }))}
                                value={formData.designation || ''}
                                onChange={handleSelectChange('designation')}
                                required
                            />
                        </div>

                        <div>
                            <CheckBox
                                formData={formData}
                                setFormData={setFormData}
                            />
                        </div>

                    </Box>

                    <div className='buttonField'>
                        <Button name={isEditing ? 'Update User' : 'Add User'} />
                    </div>

                </form>

                <div className='tableContainer'>
                    <div className="tableContainerRow">

                        {/* <StyledFormControl sx={{ minWidth: 120 }}>
                            <InputLabel>Role</InputLabel>
                            <Selectvalue={roleFilter} onChange={handleRoleFilterChange} label="Role">
                                <MenuItem value="">All</MenuItem>
                                <MenuItem value="Resident">Resident</MenuItem>
                                <MenuItem value="Consultant">Consultant</MenuItem>
                            </Select>
                        </StyledFormControl> */}

                    </div>

                    {
                        loading ? (
                            <Loaders />
                        ) : (
                            <UserTable
                                users={users}
                                handleEdit={handleEdit}
                                handleModal={handleModal}
                            />
                        )
                    }

                </div>
            </section>

            <ModalView open={openModal} onClose={handleCloseModal} user={selectedRow}>
                {selectedRow && (
                    <div className='modelContainer'>
                        <h1>Are you sure you want to delete the user?</h1>
                        <h1>User Name : <span className='modelName'>{selectedRow.name || ""}</span></h1>
                        <div className='modelButton'>
                            <h1 className='modelFields' onClick={() => handleDelete(selectedRow.id)}>Yes</h1>
                            <h1 className='modelFields' onClick={() => handleCloseModal()}>No</h1>
                        </div>
                    </div>
                )}
            </ModalView>

        </>
    );
};

export default User;
