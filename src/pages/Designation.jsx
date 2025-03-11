import React, { useEffect, useState } from 'react';
import TextInput from '../components/form/TextInput';
import SelectInput from '../components/form/SelectInput';
import { Box } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import "../components/Scrollbar/Srollbar.css"
import StyledFormControl from '../components/form/StyledFormControl';
import ModalView from '../components/Modal/ModalView';
import axios from 'axios';
import Button from '../components/form/Button/Button';
import { CONFIG, CREATE_DESIGNATION, DELETE_DESIGNATION, GET_DESIGNATION, UPDATE_DESIGNATION } from '../services';
import Loaders from '../components/Loader/Loaders';
import DesignationTable from '../components/Table/DesignationTable';

//table
const columns = [
    { id: 'sno', label: 'S.No', minWidth: 50 },
    { id: 'name', label: 'Designation Name', minWidth: 170 },
    { id: 'description', label: 'Designation Description', minWidth: 170 },
    { id: 'action', label: 'Action', minWidth: 170 },
];

const Designation = () => {
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

    const [designations, setDesignations] = useState([])
    // console.log(designations);

    const [isEditing, setIsEditing] = useState(false);
    const [designationId, setDesignationId] = useState(null);

    const [openModal, setOpenModal] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);

    const handleCloseModal = () => setOpenModal(false);

    //table
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [roleFilter, setRoleFilter] = useState('');
    // const [specializationFilter, setSpecializationFilter] = useState('');

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
            newErrors.name = 'Designation Name is required';
            isValid = false;
        }
        if (!formData.description) {
            newErrors.description = 'Designation description is required';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    //get the Designations
    const fetchDesignations = async () => {
        setLoading(true);
        try {
            const response = await axios.get(GET_DESIGNATION, CONFIG);
            // console.log('Fetch response:', response.data);
            setDesignations(response?.data?.data || []);
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
        await fetchDesignations(selectedRoleFilter);
    };

    useEffect(() => {
        fetchDesignations();
    }, []);

    //add or update
    const addDesignation = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            setLoading(true);
            try {
                if (isEditing) {
                    // console.log(designationId)
                    const response = await axios.patch(UPDATE_DESIGNATION(designationId), formData, CONFIG);
                    // console.log('Designations updated successfully:', response?.data);
                    setIsEditing(false);
                    setDesignationId(null);
                } else {
                    const response = await axios.post(CREATE_DESIGNATION, formData, CONFIG);
                    // console.log('Designations added successfully:', response?.data);
                }
                await fetchDesignations();
                setFormData({
                    name: '',
                    description: '',
                });
            } catch (error) {
                console.error('Error in saving designations data:', error.response ? error.response.data : error.message);
                alert('Failed to save designations data.');
            } finally {
                setLoading(false); 
            }
        }
    };


    const handleEdit = (designation) => {
        // console.log(`Edit clicked for ${designation.id}`);
        setFormData({
            name: designation.name,
            description: designation.description,
        });
        setIsEditing(true);
        setDesignationId(designation.id);
    };

    const handleModal = (designation) => {
        // console.log(`Delete clicked in ${designation.id}`);

        setSelectedRow(designation);
        setOpenModal(true);
    };

    const handleDelete = async (designationId) => {
        setLoading(true);
        try {
            const response = await axios.delete(DELETE_DESIGNATION(designationId), CONFIG);
            // console.log(`Deleted : ${designationId}: `, response);
            const updatedDesignations = designations.filter(designation => designation.id !== designationId);
            setDesignations(updatedDesignations);
            const totalPages = Math.ceil(updatedDesignations.length / rowsPerPage);

            if (page >= totalPages) {
                setPage(totalPages - 1);
            }
            handleCloseModal()

        } catch (error) {
            console.error('Error deleting designation:', error.response ? error.response.data : error.message);
        } finally {
            setLoading(false); 
        }
    };

    return (
        <>
            <section className='grid gap-4'>

                <form noValidate className=' border-1 border-border dark:border-borderDark bg-bgColorLight dark:bg-darkColorSec p-5 rounded-lg text-base font-gotham' onSubmit={addDesignation}>

                    <Box
                        className='grid md:grid-cols-2 gap-7'
                    >

                        <div>
                            {errors.name && (
                                <span className='text-red-500 text-sm mb-2 block'>{errors.name}</span>
                            )}
                            <TextInput
                                id="name"
                                name="name"
                                label="Designation Name"
                                value={formData.name || ''}
                                onChange={handleChange('name')}
                                required
                            />
                        </div>

                        <div>
                            {errors.description && (
                                <span className='text-red-500 text-sm mb-2 block'>{errors.description}</span>
                            )}
                            <TextInput
                                id="description"
                                name="description"
                                label="Designation Description"
                                value={formData.description || ''}
                                onChange={handleChange('description')}
                                required
                            />
                        </div>

                    </Box>

                    <div className='pt-4 flex justify-end'>
                        <Button name={isEditing ? 'Update Designation' : 'Add Designation'} />
                    </div>

                </form>

                <div className='grid gap-2 p-4 border-1 border-border rounded-lg bg-bgColorLight dark:bg-darkColorSec dark:border-borderDark'>
                    <div className="flex gap-4 m-2">

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
                            <DesignationTable
                                columns={columns}
                                designations={designations}
                                handleEdit={handleEdit}
                                handleModal={handleModal}
                            />
                        )
                    }

                </div>
            </section>

            <ModalView open={openModal} onClose={handleCloseModal} user={selectedRow}>
                {selectedRow && (
                    <div className='grid gap-2'>
                        <h1>Are you sure you want to delete the designation?</h1>
                        <h1>Designation Name : <span className='text-primary font-bold'>{selectedRow.name || ""}</span></h1>
                        <div className='flex justify-evenly mt-3'>
                            <h1 className='border px-4 p-1 rounded-lg cursor-pointer hover:border-2 hover:border-primary' onClick={() => handleDelete(selectedRow.id)}>Yes</h1>
                            <h1 className='border px-4 p-1 rounded-lg cursor-pointer hover:border-2 hover:border-primary' onClick={() => handleCloseModal()}>No</h1>
                        </div>
                    </div>
                )}
            </ModalView>

        </>
    );
};

export default Designation;
