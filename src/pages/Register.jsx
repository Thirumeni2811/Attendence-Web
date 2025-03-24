import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextInput1 from '../components/form/Fields/TextInput1';
import { Link, useNavigate } from "react-router-dom";
// import Logo from "../assets/images/Logo.svg"
import axios from "axios";
import Button1 from "../components/form/Button/Button1"
import Error from "../components/form/Button/Error";
import { REGISTER, LOGIN_CONFIG, REFRESH_TOKEN } from "../services";

const Register = () => {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [errors, setErrors] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [loading, setLoading] = useState(false)

    const [generalError, setGeneralError] = useState('')
    const navigate = useNavigate();

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

    // Validate form data
    const validateForm = () => {
        let isValid = true;
        let newErrors = { ...errors };

        // Reset all errors before validation
        Object.keys(newErrors).forEach(key => (newErrors[key] = ''));

        // Regular expression for email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!formData.email) {
            newErrors.email = 'Email is required';
            isValid = false;
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Invalid email format';
            isValid = false;
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
            isValid = false;
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Confirm Password is required';
            isValid = false;
        }

        if (formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword) {
            setGeneralError('Passwords do not match');
            isValid = false;
        } else {
            setGeneralError('');
        }

        setErrors(newErrors);
        return isValid;
    };

    // Function to refresh tokens
    const refreshTokens = async () => {
        const refreshToken = sessionStorage.getItem('refreshToken');

        if (!refreshToken) {
            setGeneralError('No refresh token available');
            throw new Error('No refresh token available');
        }

        try {
            const response = await axios.post(REFRESH_TOKEN, { refreshToken }, LOGIN_CONFIG);

            if (response.status === 200) {
                const accessToken = response.data.tokens.access.token;
                const refreshToken = response.data.tokens.refresh.token;
                const accessTokenExpires = response.data.tokens.access.expires;
                const refreshTokenExpires = response.data.tokens.refresh.expires;

                // Update sessionStorage
                sessionStorage.setItem('token', accessToken);
                sessionStorage.setItem('refreshToken', refreshToken);
                sessionStorage.setItem('accessTokenExpires', accessTokenExpires);
                sessionStorage.setItem('refreshTokenExpires', refreshTokenExpires);

                return accessToken;
            }
        } catch (error) {
            console.error("Error refreshing tokens:", error);
            setGeneralError('Unable to refresh tokens. Please log in again.');
            throw error;
        }
    };

    // Register function
    const register = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            if (validateForm()) {
                const Data = {
                    email: formData.email,
                    password: formData.password,
                    role: 'admin',
                }
                console.log(Data)
                const response = await axios.post(REGISTER, Data, LOGIN_CONFIG)
                console.log(response)

                if (response.status === 201) {
                    const accessToken = response.data.tokens.access.token;
                    const refreshToken = response.data.tokens.refresh.token;
                    const accessTokenExpires = response.data.tokens.access.expires;
                    const refreshTokenExpires = response.data.tokens.refresh.expires;

                    // Store tokens in sessionStorage
                    sessionStorage.setItem('token', accessToken);
                    sessionStorage.setItem('refreshToken', refreshToken);
                    sessionStorage.setItem('accessTokenExpires', accessTokenExpires);
                    sessionStorage.setItem('refreshTokenExpires', refreshTokenExpires);

                    // console.log('Register successful:', { accessToken, refreshToken, accessTokenExpires, refreshTokenExpires });

                    const access = new Date(sessionStorage.getItem('accessTokenExpires'));
                    // console.log(access);

                    const currentTime = new Date();
                    // console.log(currentTime);

                    // Check if access token is expired
                    if (accessTokenExpires <= currentTime) {
                        // Refresh tokens if expired
                        await refreshTokens();
                    }

                    navigate('/create-organisation');
                } else {
                    setGeneralError('Register failed. Please check your credentials');
                }
            }
        } catch (error) {
            console.error("An error occurred during register:", error.response);
            if (error.response?.data?.message?.toLowerCase().includes('email already taken')) {
                setGeneralError('This email is already registered. Try logging in.');
            } else {
                setGeneralError('Something went wrong. Please try again.');
            }
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
                                    <p className=" font-light text-darkColorSec">Register Your Organization</p>
                                    <Error error={generalError} />
                                </div>
                            </div>

                            <form onSubmit={register} noValidate className="grid gap-4">
                                <Box
                                    className="flex flex-col gap-7 w-full my-4"
                                >
                                    <div>
                                        <Error error={errors.email} />
                                        <TextInput1
                                            id="email"
                                            name="email"
                                            label="Email"
                                            value={formData.email}
                                            onChange={handleChange("email")}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <Error error={errors.password} />
                                        <TextInput1
                                            id="password"
                                            name="password"
                                            label="Password"
                                            type="password"
                                            value={formData.password}
                                            onChange={handleChange("password")}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <Error error={errors.confirmPassword} />
                                        <TextInput1
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            label="Confirm Password"
                                            type="password"
                                            value={formData.confirmPassword}
                                            onChange={handleChange("confirmPassword")}
                                            required
                                        />
                                    </div>
                                </Box>

                                <div className="flex flex-col gap-4 items-center justify-center">
                                    <Button1 name="Register" loading={loading} />
                                    <div>Already have an Account ? {" "}
                                        <Link to="/login" className="font-semibold text-primary">Login</Link>
                                    </div>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Register;
