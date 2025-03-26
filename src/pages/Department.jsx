import React, { useEffect, useState } from 'react';
import TextInput from '../components/form/Fields/TextInput';
import { Box } from '@mui/material';
import ModalView from '../components/Modal/ModalView';
import axios from 'axios';
import Button from '../components/form/Button/Button';
import { CONFIG, CREATE_DEPARTMENT, DELETE_DEPARTMENT, GET_DEPARTMENT, UPDATE_DEPARTMENT } from '../services';
import Loaders from '../components/Loader/Loaders';
import DepartmentTable from '../components/Table/DepartmentTable'
import Error from '../components/form/Button/Error'

const Department = () => {
    //field
    const [formData, setFormData] = useState({
        name: '',
        description: '',
    });
    const [errors, setErrors] = useState({
        name: '',
        description: '',
    });
    const [loading, setLoading] = useState(false)

    const [departments, setDepartments] = useState([])
    console.log(departments);

    const [isEditing, setIsEditing] = useState(false);
    const [departmentId, setDepartmentId] = useState(null);

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
    };

    const validateForm = () => {
        let isValid = true;
        let newErrors = { ...errors };

        // Reset all errors before validation
        Object.keys(newErrors).forEach(key => (newErrors[key] = ''));

        if (!formData.name) {
            newErrors.name = 'Department Name is required';
            isValid = false;
        }
        if (!formData.description) {
            newErrors.description = 'Department description is required';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    //get the departments
    const fetchDepartments = async () => {
        setLoading(true);
        try {
            const response = await axios.get(GET_DEPARTMENT, CONFIG);
            // console.log('Fetch response:', response.data);
            setDepartments(response?.data?.data || []);
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
        await fetchDepartments(selectedRoleFilter);
    };

    useEffect(() => {
        fetchDepartments();
    }, []);

    //add or update
    const addDepartment = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            setLoading(true);
            try {
                if (isEditing) {
                    // console.log(departmentId)
                    const response = await axios.patch(UPDATE_DEPARTMENT(departmentId), formData, CONFIG);
                    // console.log('Departments updated successfully:', response?.data);
                    setIsEditing(false);
                    setDepartmentId(null);
                } else {
                    const response = await axios.post(CREATE_DEPARTMENT, formData, CONFIG);
                    // console.log('Departments added successfully:', response?.data);
                }
                await fetchDepartments();
                setFormData({
                    name: '',
                    description: '',
                });
            } catch (error) {
                console.error('Error in saving departments data:', error.response ? error.response.data : error.message);
                alert('Failed to save departments data.');
            } finally {
                setLoading(false);
            }
        }
    };


    const handleEdit = (department) => {
        // console.log(`Edit clicked for ${department.id}`);
        setFormData({
            name: department.name,
            description: department.description,
        });
        setIsEditing(true);
        setDepartmentId(department.id);
    };

    const handleModal = (department) => {
        // console.log(`Delete clicked in ${department.id}`);

        setSelectedRow(department);
        setOpenModal(true);
    };

    const handleDelete = async (departmentId) => {
        setLoading(true);
        try {
            const response = await axios.delete(DELETE_DEPARTMENT(departmentId), CONFIG);
            // console.log(`Deleted : ${departmentId}: `, response);
            const updatedDepartments = departments.filter(department => department.id !== departmentId);
            setDepartments(updatedDepartments);
            const totalPages = Math.ceil(updatedDepartments.length / rowsPerPage);

            if (page >= totalPages) {
                setPage(totalPages - 1);
            }
            handleCloseModal()

        } catch (error) {
            console.error('Error deleting department:', error.response ? error.response.data : error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <section className='wholeContainer'>

                <form noValidate className='form-container' onSubmit={addDepartment}>

                    <Box
                        className='box-container2'
                    >

                        <div>
                            <Error error={errors.name} />
                            <TextInput
                                id="name"
                                name="name"
                                label="Department Name"
                                value={formData.name || ''}
                                onChange={handleChange('name')}
                                required
                            />
                        </div>

                        <div>
                            <Error error={errors.description} />
                            <TextInput
                                id="description"
                                name="description"
                                label="Department Description"
                                value={formData.description || ''}
                                onChange={handleChange('description')}
                                multiline
                                required
                            />
                        </div>

                    </Box>

                    <div className='buttonField'>
                        <Button name={isEditing ? 'Update Department' : 'Add Department'} />

                    </div>

                </form>

                <div className='tableContainer'>
                    <div className='tableContainerRow'>

                        {/* <StyledFormControl sx={{ minWidth: 120 }}>
                            <InputLabel>Role</InputLabel>
                            <Select value={roleFilter} onChange={handleRoleFilterChange} label="Role">
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
                            <DepartmentTable
                                departments={departments}
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
                        <h1>Are you sure you want to delete the department?</h1>
                        <h1>Department Name : <span className='modelName'>{selectedRow.name || ""}</span></h1>
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

export default Department;
