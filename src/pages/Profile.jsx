import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Button from '../components/form/Button/Button'
import Image from '../components/Uploader/Image'
import axios from 'axios'
import { getConfig, GET_ORGANISATION_BY_TOKEN, UPDATE_ORGANISATION } from '../services'
import Error from '../components/form/Button/Error'
import TextInput from '../components/form/Fields/TextInput'
import organizationTypes from '../data/organizationTypes'
import SelectInput from '../components/form/Fields/SelectInput'
import Button3 from '../components/form/Button/Button3'
import OrgDetails from './OrgDetails'

const Profile = () => {

  const [data, setData] = useState({});
  // console.log(data)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    companyAddress: "",
    businessType: "",
    logo: "",
  });
  // console.log(formData)

  useEffect(() => {
    if (data) {
      setFormData({
        name: data?.name || "",
        email: data?.owner?.email || "",
        companyAddress: data?.companyAddress || "",
        businessType: data?.businessType || "",
        logo: data?.logo || "https://picsum.photos/200",
      });
    }
  }, [data]);

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    companyAddress: "",
    businessType: "",
    logo: "",
  })
  const [loading, setLoading] = useState(false);

  // Handle form field change
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

  const handleImageSelect = (file) => {
    setFormData((prev) => ({
      ...prev,
      // logo: file ? file.name : "No file chosen"
      logo: file
    }));
  };

  // Validate form data
  const validateForm = () => {
    let isValid = true;
    let newErrors = { ...errors };

    // Reset all errors before validation
    Object.keys(newErrors).forEach(key => (newErrors[key] = ''));

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email format';
      isValid = false;
    }

    if (!formData.name) {
      newErrors.name = 'Organization Name is required';
      isValid = false;
    }

    if (!formData.companyAddress) {
      newErrors.companyAddress = 'Organization Address is required';
      isValid = false;
    }

    if (!formData.businessType) {
      newErrors.businessType = 'Organization Type is required';
      isValid = false;
    }

    if (!formData.logo || formData.logo === "No file chosen") {
      newErrors.logo = "Organization Logo is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  //get oragnization
  const getOrganization = async () => {
    try {
      const response = await axios.get(GET_ORGANISATION_BY_TOKEN, getConfig());
      const res = response?.data?.data;
      setData(res || {})
    } catch (error) {
      console.error('Fetch Error:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getOrganization()
  }, [])

  const handleProfile = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      try {
        const response = await axios.patch(UPDATE_ORGANISATION((data.id)), formData, getConfig());
        console.log(response);
      } catch (error) {
        console.error('Error in saving profil data:', error.response ? error.response.data : error.message);
        alert('Failed to update data.');
      } finally {
        setLoading(false)
      }
    }
  }
  return (
    <>
      <section className='wholeContainer'>
        <form noValidate className='form-container' onSubmit={handleProfile}>

          <div className='mb-8'>
            <Image onImageSelect={handleImageSelect} fileName={formData.logo} />
          </div>

          <Box className="box-container2">

            <div>
              <Error error={errors.name} />
              <TextInput
                id="name"
                name="name"
                label="Name"
                value={formData.name}
                onChange={handleChange("name")}
                required
              />
            </div>

            <div>
              <Error error={errors.email} />
              <TextInput
                id="email"
                name="email"
                label="Email"
                value={formData.email}
                onChange={handleChange("email")}
                required
              />
            </div>

            <div>
              <Error error={errors.companyAddress} />
              <TextInput
                id="companyAddress"
                name="companyAddress"
                label="Organization Address"
                value={formData.companyAddress}
                onChange={handleChange("companyAddress")}
                required
                multiline={true}
              />
            </div>

            <div>
              <Error error={errors.businessType} />
              <SelectInput
                id="businessType"
                name="businessType"
                label="Organization Type"
                options={organizationTypes}
                value={formData.businessType}
                onChange={handleSelectChange("businessType")}
                required
              />
            </div>

          </Box>
          <div className='buttonField'>
            <Button3 name="Update" loading={loading} />
          </div>
        </form>
        <OrgDetails data={data} />
      </section>
    </>
  )
}

export default Profile