import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CONFIG, CREATE_BREAK, DELETE_BREAK, GET_SCHEDULE_BY_ID, UPDATE_BREAK } from '../services';
import Loaders from '../components/Loader/Loaders';
import BreakTable from '../components/Table/BreakTable';
import Button from '../components/form/Button/Button';
import StyledTimeField from '../components/form/StyledTimeField';
import Error from '../components/form/Button/Error';
import { Box } from '@mui/material'
import TextInput from '../components/form/TextInput';
import ModalView from '../components/Modal/ModalView';
import SelectInput from '../components/form/SelectInput';
import { formatTimeToIST } from '../utils/DateTime';

const Breaks = () => {
    const { id } = useParams();

    const [formData, setFormData] = useState({
        breakType: '',
        period: '',
        startTime: '',
        endTime: '',
    });
    const [errors, setErrors] = useState({
        breakType: '',
        period: '',
        startTime: '',
        endTime: '',
    });

    const [loading, setLoading] = useState(false)
    const [data, setData] = useState({})
    const [scheduleId, setScheduleId] = useState(null);
    const [breaks, setBreaks] = useState([])
    // console.log(scheduleId)

    const [isEditing, setIsEditing] = useState(false);
    const [breakId, setBreakId] = useState(null);

    const [openModal, setOpenModal] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    // console.log(selectedRow)

    const handleCloseModal = () => setOpenModal(false);

    //table
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [roleFilter, setRoleFilter] = useState('');

    const handleChange = (fieldName) => (e) => {
        setFormData({
            ...formData,
            [fieldName]: e.target.value,
        });

        if (e.target.value.trim() !== '') {
            setErrors(prevErrors => ({
                ...prevErrors,
                [fieldName]: '',
            }));
        }
    };

    const handleFieldChange = (fieldName) => (e) => {
        const value =
            fieldName.includes("Time") || fieldName.includes("Date")
                ? e
                : e.target.value;

        setFormData((prevData) => ({
            ...prevData,
            [fieldName]: value,
        }));
        setErrors((prevErrors) => ({
            ...prevErrors,
            [fieldName]: "",
        }));
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

        if (!formData.breakType) {
            newErrors.breakType = 'Break Type is required';
            isValid = false;
        }
        if (!formData.period) {
            newErrors.period = 'Period of time is required';
            isValid = false;
        }

        if (!formData.startTime) {
            newErrors.startTime = 'Start Time is required';
            isValid = false;
        }
        if (!formData.endTime) {
            newErrors.endTime = 'End Time is required';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    //get schedule by id
    const getSchedule = async () => {
        setLoading(true);
        try {
            const response = await axios.get(GET_SCHEDULE_BY_ID(id), CONFIG);
            setData(response?.data?.data || [])
            setScheduleId(response?.data?.data.id || null)
            setBreaks(response?.data?.data?.breaks || {})
            setPage(0);
        } catch (error) {
            console.error(error.message);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (id) getSchedule();
    }, [id]);

    //add or update
    const addBreak = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            setLoading(true);
            try {
                if (isEditing) {
                    // console.log(breakId)
                    const response = await axios.patch(UPDATE_BREAK(scheduleId, breakId), formData, CONFIG);
                    // console.log('Breaks updated successfully:', response?.data);
                    setIsEditing(false);
                    setBreakId(null);
                } else {
                    const response = await axios.post(CREATE_BREAK(scheduleId), formData, CONFIG);
                    console.log('Breaks added successfully:', response?.data);
                }
                await getSchedule();
                setFormData({
                    breakType: '',
                    period: '',
                    startTime: '',
                    endTime: '',
                });
            } catch (error) {
                console.error('Error in saving breaks data:', error.response ? error.response.data : error.message);
                alert('Failed to save breaks data.');
            } finally {
                setLoading(false);
            }
        }
    };

    const handleEdit = (item) => {
        // console.log(`Edit clicked for ${item._id}`);
        setFormData({
            breakType: item.breakType,
            period: item.period,
            startTime: item.startTime,
            endTime: item.endTime,
        });
        setIsEditing(true);
        setBreakId(item._id);
    };

    const handleModal = (item) => {
        // console.log(`Delete clicked in ${item._id}`);

        setSelectedRow(item);
        setOpenModal(true);
    };

    const handleDelete = async (breakId) => {
        setLoading(true);
        try {
            const response = await axios.delete(DELETE_BREAK(scheduleId, breakId), CONFIG);
            // console.log(`Deleted : ${scheduleId}: `, response);
            const updatedData = breaks.filter(data => data._id !== breakId);
            setBreaks(updatedData);
            const totalPages = Math.ceil(updatedData.length / rowsPerPage);

            if (page >= totalPages) {
                setPage(totalPages - 1);
            }
            handleCloseModal()

        } catch (error) {
            console.error('Error deleting break:', error.response ? error.response.data : error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <section className='container'>
                {Object.keys(data).length > 0 && (
                    <div className='form-container'>
                        <p className='text-3xl font-extrabold'>
                            {data?.name || ""} | {"  "}
                            <span className='text-sm'>{formatTimeToIST(data?.workingHours?.startTime) || "-"}</span> {" "}
                            <span className='text-sm'>-</span>{" "}
                            <span className='text-sm'>{formatTimeToIST(data?.workingHours?.endTime) || "-"}</span>
                        </p>
                        <p className='text-justify'>
                            {data?.description || "No description available"}
                        </p>
                    </div>
                )}

                <form noValidate className='form-container' onSubmit={addBreak}>

                    <Box className='box-container2'>

                        <div>
                            <Error error={errors.breakType} />
                            <SelectInput
                                id="breakType"
                                name="breakType"
                                label="Break Type"
                                options={["Short Break", "Lunch", "Other"]}
                                value={formData.breakType || ''}
                                onChange={handleSelectChange('breakType')}
                                required
                            />
                        </div>

                        <div>
                            <Error error={errors.period} />
                            <TextInput
                                id="period"
                                name="period"
                                label="Period (in Mins)"
                                value={formData.period || ''}
                                onChange={handleChange('period')}
                            />
                        </div>

                        <div>
                            <Error error={errors.startTime} />
                            <StyledTimeField
                                name="startTime"
                                label="Break - Start Time"
                                value={formData.startTime || ""}
                                onChange={handleFieldChange("startTime")}
                            />
                        </div>

                        <div>
                            <Error error={errors.endTime} />
                            <StyledTimeField
                                name="endTime"
                                label="Break - End Time"
                                value={formData.endTime || ""}
                                onChange={handleFieldChange("endTime")}
                            />
                        </div>

                    </Box>

                    <div className='buttonField'>
                        <Button name={isEditing ? 'Update Break' : 'Add Break'} />
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
                            <BreakTable
                                breaks={breaks}
                                handleEdit={handleEdit}
                                handleModal={handleModal}
                            />
                        )
                    }
                </div >
            </section>

            <ModalView open={openModal} onClose={handleCloseModal} user={selectedRow}>
                {selectedRow && (
                    <div className='modelContainer'>
                        <h1>Are you sure you want to delete the break?</h1>
                        <h1>Break Name : <span className='modelName'>{selectedRow.breakType || ""}</span></h1>
                        <div className='modelButton'>
                            <h1 className='modelFields' onClick={() => handleDelete(selectedRow._id)}>Yes</h1>
                            <h1 className='modelFields' onClick={() => handleCloseModal()}>No</h1>
                        </div>
                    </div>
                )}
            </ModalView>
        </>
    )
}

export default Breaks