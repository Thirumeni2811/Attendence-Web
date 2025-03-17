import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextInput1 from '../components/form/TextInput1';
import { useNavigate } from "react-router-dom";
// import Logo from "../assets/images/Logo.svg"
import axios from "axios";
import Button1 from "../components/form/Button/Button1"
import Error from "../components/form/Button/Error";
import { LOGIN, LOGIN_CONFIG, REFRESH_Token } from "../services";

const Login = () => {

    const [formData, setFormData] = useState({
        email: 'abc@gmail.com',
        password: 'abc@123456',
    });
    const [errors, setErrors] = useState({
        email: '',
        password: '',
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

        //regular expression for email validation
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
            const response = await axios.post(REFRESH_Token, { refreshToken }, LOGIN_CONFIG);

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

    // Login function
    const login = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            if (validateForm()) {
                // console.log(formData)
                const response = await axios.post(LOGIN, formData, LOGIN_CONFIG)
                // console.log(response)

                if (response.status === 200) {
                    const accessToken = response.data.tokens.access.token;
                    const refreshToken = response.data.tokens.refresh.token;
                    const accessTokenExpires = response.data.tokens.access.expires;
                    const refreshTokenExpires = response.data.tokens.refresh.expires;

                    // Store tokens in sessionStorage
                    sessionStorage.setItem('token', accessToken);
                    sessionStorage.setItem('refreshToken', refreshToken);
                    sessionStorage.setItem('accessTokenExpires', accessTokenExpires);
                    sessionStorage.setItem('refreshTokenExpires', refreshTokenExpires);

                    // console.log('Login successful:', { accessToken, refreshToken, accessTokenExpires, refreshTokenExpires });

                    const access = new Date(sessionStorage.getItem('accessTokenExpires'));
                    // console.log(access);

                    const currentTime = new Date();
                    // console.log(currentTime);


                    // Check if access token is expired
                    if (accessTokenExpires <= currentTime) {
                        // Refresh tokens if expired
                        await refreshTokens();
                    }

                    navigate('/department');
                } else {
                    setGeneralError('Login failed. Please check your credentials');
                }
            }
        } catch (error) {
            console.error("An error occurred during login:", error);
            setGeneralError('Something went wrong. Please try again');
        } finally {
            setLoading(false)
        }
    };



    return (
        <>
            <section className="font-gotham bg-secondary xs:px-2">
                <div className="h-svh flex items-center justify-center">
                    <div className="flex flex-col justify-center items-center">
                        <div className="p-10 xs:p-4 xs:py-8 py-20 rounded-xl shadow-lg w-[22rem] sm:w-[28.4rem] bg-white flex flex-col gap-4">
                            <div className="flex flex-col gap-12">
                                {/* <img src={Logo} alt="Logo" /> */}

                                <div className="flex flex-col gap-2">
                                    <h1 className="text-3xl text-primary font-extrabold">
                                        Welcome!
                                    </h1>
                                    <p className=" font-light text-text">Enter your Login details</p>
                                    <Error error={generalError} />
                                </div>
                            </div>

                            <form onSubmit={login} noValidate className="grid gap-4">
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
                                </Box>

                                <div className="flex items-center justify-center">
                                    <Button1 name="Login" loading={loading} />
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Login;
