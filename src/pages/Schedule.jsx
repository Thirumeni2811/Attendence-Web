import React, { useEffect, useState } from 'react'
import Error from '../components/form/Button/Error'
import TextInput from '../components/form/Fields/TextInput'
import { Box } from '@mui/material'
import StyledTimeField from '../components/form/Fields/StyledTimeField';
import Button from '../components/form/Button/Button';
import axios from 'axios';
import { CONFIG, CREATE_SCHEDULE, DELETE_SCHEDULE, GET_SCHEDULE, UPDATE_SCHEDULE } from '../services';
import Loaders from '../components/Loader/Loaders';
import ScheduleTable from '../components/Table/ScheduleTable';
import ModalView from '../components/Modal/ModalView';
import { formatTimeToUTC } from '../utils/DateTime';

const Schedule = () => {

  const [formData, setFormData] = useState({
    name: '',
    workingHours: {
      startTime: '',
      endTime: '',
    },
    breaks: []
  })
  console.log(formData);
  
  const [errors, setErrors] = useState({
    name: '',
    description: '',
    workingHours: {
      startTime: '',
      endTime: '',
    },
    breaks: []
  })

  const [schedules, setSchedules] = useState([])
  // console.log(schedules)
  const [loading, setLoading] = useState(false)
  const [isEditing, setIsEditing] = useState(false);
  const [scheduleId, setScheduleId] = useState(null);

  const [openModal, setOpenModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

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
    const value = fieldName.includes("Time") ? e : e.target.value;

    setFormData((prevData) => ({
      ...prevData,
      workingHours: {
        ...prevData.workingHours, // Preserve other values in workingHours
        [fieldName]: value, // Update only the specific field
      },
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      workingHours: {
        ...prevErrors.workingHours,
        [fieldName]: "", // Clear the error for this field
      },
    }));
  };

  const validateForm = () => {
    let isValid = true;
    // Create a deep copy of errors to avoid reference issues
    let newErrors = {
      ...errors,
      workingHours: { ...errors.workingHours }, // it's an object
    };

    // Reset all errors before validation
    Object.keys(newErrors).forEach(key => {
      if (typeof newErrors[key] === "object") {
        Object.keys(newErrors[key]).forEach(subKey => (newErrors[key][subKey] = ""));
      } else {
        newErrors[key] = "";
      }
    });

    if (!formData.name) {
      newErrors.name = 'Schedule Name is required';
      isValid = false;
    }

    if (!formData.workingHours.startTime) {
      newErrors.workingHours.startTime = 'Schedule Start Time is required';
      isValid = false;
    }

    if (!formData.workingHours.endTime) {
      newErrors.workingHours.endTime = 'Schedule End Time is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  }

  const getSchedules = async () => {
    setLoading(true);
    try {
      const response = await axios.get(GET_SCHEDULE, CONFIG);
      setSchedules(response?.data?.data || [])
      setPage(0);
    } catch (error) {
      console.error('Fetch Error:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getSchedules();
  }, [])

  const handleRoleFilterChange = async (event) => {
    const selectedRoleFilter = event.target.value;
    setRoleFilter(selectedRoleFilter);
    await getSchedules(selectedRoleFilter);
  };

  const addSchedule = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setLoading(true);
      try {
        const payload = {
          ...formData,
          workingHours: {
            startTime: formatTimeToUTC(formData.workingHours.startTime),
            endTime: formatTimeToUTC(formData.workingHours.endTime),
          }
        };
        // console.log(payload)
        if (isEditing) {
          // console.log(scheduleId)
          const response = await axios.patch(UPDATE_SCHEDULE(scheduleId), payload, CONFIG);
          // console.log('Schedule updated successfully:', response?.data);
          setIsEditing(false);
          setScheduleId(null);
        } else {
          const response = await axios.post(CREATE_SCHEDULE, payload, CONFIG);
          // console.log('Schedule added successfully:', response?.data);
        }
        await getSchedules();
        setFormData({
          name: '',
          description: '',
          workingHours: {
            startTime: '',
            endTime: '',
          },
          breaks: []
        });
      } catch (error) {
        console.error('Error in saving schedules data:', error.response ? error.response.data : error.message);
        alert('Failed to save schedules data.');
      } finally {
        setLoading(false)
      }
    }
  }

  const handleEdit = (schedule) => {
    // console.log(`Edit clicked for ${schedule.id}`);
    setFormData({
      name: schedule.name,
      description: schedule.description,
      workingHours: {
        startTime: schedule?.workingHours?.startTime, 
        endTime: schedule?.workingHours?.endTime, 
      },
    });
    setIsEditing(true);
    setScheduleId(schedule.id);
  };

  const handleModal = (schedule) => {
    console.log(`Delete clicked in ${schedule.id}`);

    setSelectedRow(schedule);
    setOpenModal(true);
  };

  const handleDelete = async (scheduleId) => {
    setLoading(true);
    try {
      const response = await axios.delete(DELETE_SCHEDULE(scheduleId), CONFIG);
      // console.log(`Deleted : ${scheduleId}: `, response);
      const updatedSchedules = schedules.filter(schedule => schedule.id !== scheduleId);
      setSchedules(updatedSchedules);
      const totalPages = Math.ceil(updatedSchedules.length / rowsPerPage);

      if (page >= totalPages) {
        setPage(totalPages - 1);
      }
      handleCloseModal()

    } catch (error) {
      console.error('Error deleting schedule:', error.response ? error.response.data : error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className='container'>

        <form noValidate className='form-container' onSubmit={addSchedule}>

          <Box className='box-container2'>

            <div>
              <Error error={errors.name} />
              <TextInput
                id="name"
                name="name"
                label="Schedule Name"
                value={formData.name || ''}
                onChange={handleChange('name')}
                required
              />
            </div>

            <div>
              <Error error={errors.name} />
              <TextInput
                id="description"
                name="description"
                label="Schedule Description"
                value={formData.description || ''}
                onChange={handleChange('description')}
                multiline
              />
            </div>

            <div>
              <Error error={errors.workingHours.startTime} />
              <StyledTimeField
                name="workingStartTime"
                label="Schedule - Start Time"
                value={formData.workingHours.startTime || ""}
                onChange={handleFieldChange("startTime")}
              />
            </div>

            <div>
              <Error error={errors.workingHours.endTime} />
              <StyledTimeField
                name="workingEndTime"
                label="Schedule - End Time"
                value={formData.workingHours.endTime || ""}
                onChange={handleFieldChange("endTime")}
              />
            </div>

          </Box>

          <div className='buttonField'>
            <Button name={isEditing ? 'Update Schedule' : 'Add Schedule'} />
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
              <ScheduleTable
                schedules={schedules}
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
            <h1>Are you sure you want to delete the schedule?</h1>
            <h1>Schedule Name : <span className='modelName'>{selectedRow.name || ""}</span></h1>
            <div className='modelButton'>
              <h1 className='modelFields' onClick={() => handleDelete(selectedRow.id)}>Yes</h1>
              <h1 className='modelFields' onClick={() => handleCloseModal()}>No</h1>
            </div>
          </div>
        )}
      </ModalView>
    </>
  )
}

export default Schedule