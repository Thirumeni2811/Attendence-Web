import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextInput1 from '../components/form/Fields/TextInput1';
import { Link, useNavigate } from "react-router-dom";
// import Logo from "../assets/images/Logo.svg"
import axios from "axios";
import Button1 from "../components/form/Button/Button1"
import Error from "../components/form/Button/Error";
import { CREATE_ORGANISATION, getConfig } from "../services";
import SelectInput1 from "../components/form/Fields/SelectInput1";
import organizationTypes from "../data/organizationTypes"
import ImageSelector from "../components/Uploader/ImageSelector";
import Batch from "./Batch";

const Create = () => {

    const [formData, setFormData] = useState({
        name: '',
        companyAddress: '',
        businessType: '',
        logo: 'No file chosen',
    });
    const [errors, setErrors] = useState({
        name: '',
        companyAddress: '',
        businessType: '',
        logo: '',
    });

    const [loading, setLoading] = useState(false)

    const navigate = useNavigate();

    const [openModal, setOpenModal] = useState(false);

    const handleCloseModal = () => setOpenModal(false);


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

    // Create function
    const createOrg = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            if (validateForm()) {
                // const token = sessionStorage.getItem('token');
                // const config = {
                //     headers: {
                //         Authorization: `Bearer ${token}`,
                //     },
                // };
                const response = await axios.post(CREATE_ORGANISATION, formData, getConfig())
                console.log(response)
                setOpenModal(true)
            }
        } catch (error) {
            console.error("An error occurred during create the organization:", error.response);
        } finally {
            setLoading(false)
        }
    };

    return (
        <>
            <section className="font-Albert Sans bg-secondary xs:px-2">
                <div className="h-svh flex items-center justify-center">
                    <div className="flex flex-col justify-center items-center">
                        <div className="p-10 xs:p-4 xs:py-8 py-20 rounded-xl shadow-lg w-[22rem] sm:w-[28.4rem] bg-white flex flex-col gap-4">
                            <div className="flex flex-col gap-12">
                                {/* <img src={Logo} alt="Logo" /> */}

                                <div className="flex flex-col gap-2">
                                    <h1 className="text-3xl text-primary font-extrabold">
                                        Welcome!
                                    </h1>
                                    <p className=" font-light text-darkColorSec">Create Your Organization Profile</p>
                                </div>
                            </div>

                            <form onSubmit={createOrg} noValidate className="grid gap-4">
                                <Box
                                    className="flex flex-col gap-7 w-full my-4"
                                >
                                    <div>
                                        <Error error={errors.name} />
                                        <TextInput1
                                            id="name"
                                            name="name"
                                            label="Name"
                                            value={formData.name}
                                            onChange={handleChange("name")}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <Error error={errors.companyAddress} />
                                        <TextInput1
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
                                        <SelectInput1
                                            id="businessType"
                                            name="businessType"
                                            label="Organization Type"
                                            options={organizationTypes}
                                            value={formData.businessType}
                                            onChange={handleSelectChange("businessType")}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <Error error={errors.logo} />
                                        <ImageSelector onImageSelect={handleImageSelect} fileName={formData.logo} />
                                    </div>
                                </Box>

                                <div className="flex flex-col gap-4 items-center justify-center">
                                    <Button1 name="Create" loading={loading} />
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </section>

            {
                openModal && (
                    <Batch openModal={openModal} handleCloseModal={handleCloseModal} />
                )
            }
        </>
    );
};

export default Create;
