import React, { useEffect, useState } from 'react';
import TextInput from '../components/form/Fields/TextInput';
import { Box } from '@mui/material';
import ModalView from '../components/Modal/ModalView';
import axios from 'axios';
import Button from '../components/form/Button/Button';
import { CONFIG, CREATE_HOLIDAY, DELETE_HOLIDAY, GET_HOLIDAY, UPDATE_HOLIDAY } from '../services';
import Loaders from '../components/Loader/Loaders';
import HolidayTable from '../components/Table/HolidayTable'
import Error from '../components/form/Button/Error'
import StyledDateField from '../components/form/Fields/StyledDateField';
import dayjs from 'dayjs';
import { formatDate } from '../utils/DateTime';

const Holiday = () => {
    //field
    const [formData, setFormData] = useState({
        date: '',
        reason: '',
    });
    console.log(formData)
    const [errors, setErrors] = useState({
        date: '',
        reason: '',
    });
    const [loading, setLoading] = useState(false)

    const [holidays, setHolidays] = useState([])
    console.log(holidays);

    const [isEditing, setIsEditing] = useState(false);
    const [holidayId, setHolidayId] = useState(null);

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

    const handleDateChange = (fieldName) => (newValue) => {
        setFormData({
            ...formData,
            [fieldName]: newValue ? newValue.toISOString() : '', // Store date as ISO string
        });
    
        // Reset the error message if the field contains a value
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

        if (!formData.date) {
            newErrors.date = 'Holiday Date is required';
            isValid = false;
        }
        if (!formData.reason) {
            newErrors.reason = 'Holiday Reason is required';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    //get the holidays
    const fetchHolidays = async () => {
        setLoading(true);
        try {
            const response = await axios.get(GET_HOLIDAY, CONFIG);
            // console.log('Fetch response:', response.data);
            setHolidays(response?.data?.data || []);
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
        await fetchHolidays(selectedRoleFilter);
    };

    useEffect(() => {
        fetchHolidays();
    }, []);

    //add or update
    const addHoliday = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            setLoading(true);
            try {
                if (isEditing) {
                    // console.log(holidayId)
                    const response = await axios.patch(UPDATE_HOLIDAY(holidayId), formData, CONFIG);
                    // console.log('Holidays updated successfully:', response?.data);
                    setIsEditing(false);
                    setHolidayId(null);
                } else {
                    const response = await axios.post(CREATE_HOLIDAY, formData, CONFIG);
                    // console.log('Holidays added successfully:', response?.data);
                }
                await fetchHolidays();
                setFormData({
                    date: '',
                    reason: '',
                });
            } catch (error) {
                console.error('Error in saving holidays data:', error.response ? error.response.data : error.message);
                alert('Failed to save holidays data.');
            } finally {
                setLoading(false);
            }
        }
    };


    const handleEdit = (holiday) => {
        console.log(`Edit clicked for ${holiday.id}`);
        setFormData({
            date: holiday.date,
            reason: holiday.reason,
        });
        setIsEditing(true);
        setHolidayId(holiday.id);
    };

    const handleModal = (holiday) => {
        // console.log(`Delete clicked in ${holiday.id}`);

        setSelectedRow(holiday);
        setOpenModal(true);
    };

    const handleDelete = async (holidayId) => {
        setLoading(true);
        try {
            const response = await axios.delete(DELETE_HOLIDAY(holidayId), CONFIG);
            // console.log(`Deleted : ${holidayId}: `, response);
            const updatedHolidays = holidays.filter(holiday => holiday.id !== holidayId);
            setHolidays(updatedHolidays);
            const totalPages = Math.ceil(updatedHolidays.length / rowsPerPage);

            if (page >= totalPages) {
                setPage(totalPages - 1);
            }
            handleCloseModal()

        } catch (error) {
            console.error('Error deleting holiday:', error.response ? error.response.data : error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <section className='container'>

                <form noValidate className='form-container ' onSubmit={addHoliday}>

                    <Box
                        className='box-container2'
                    >

                        <div>
                            <Error error={errors.date} />
                            <StyledDateField
                                name="date"
                                label="Date"
                                value={formData.date || ''}
                                onChange={handleDateChange('date')}
                                restrictFutureDates
                            />
                        </div>

                        <div>
                            <Error error={errors.reason} />
                            <TextInput
                                id="reason"
                                name="reason"
                                label="Holiday Reason"
                                value={formData.reason || ''}
                                onChange={handleChange('reason')}
                                multiline
                                required
                            />
                        </div>

                    </Box>

                    <div className='buttonField'>
                        <Button name={isEditing ? 'Update Holiday' : 'Add Holiday'} />

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
                            <HolidayTable
                                holidays={holidays}
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
                        <h1>Are you sure you want to delete the holiday?</h1>
                        <h1>Holiday Date : <span className='modelName'>{formatDate(selectedRow.date) || ""}</span></h1>
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

export default Holiday;
