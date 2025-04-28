import React, { useState, useContext } from 'react';
import '../styling/LoginContainer.css';
import { tryLogin, tryRegister } from '../repositories/usersRepo';
import UserContext from '../assets/UserContext';
import { toast } from 'react-toastify';

const LoginContainer = ({ isOpen, onClose }) => {
    const { setInfo } = useContext(UserContext);
    const [isRegister, setIsRegister] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    if (!isOpen) return null;

    const handleSwitchForm = () => {
        setIsRegister(prev => !prev);
        setFormData({ name: '', email: '', password: '' });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };
    const handleUserInfo = () => {
        setInfo();
        onClose();
    };

    const validateName = (input) => {
        const namePattern = /^[a-zA-Z\s]+$/;
        if (!input.trim()) {
            toast.warning("Name cannot be empty");
            return false;
        }
        if (!namePattern.test(input)) {
            toast.warning("Name can only contain letters and spaces.");
            return false;
        }
        return true;
    };

    const validateEmail = (input) => {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!input.trim()) {
            toast.warning("Email cannot be empty");
            return false;
        }
        if (!emailPattern.test(input)) {
            toast.warning("Please enter a valid email address.");
            return false;
        }
        return true;
    };

    const validatePassword = (input) => {
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        if (!input.trim()) {
            toast.warning("Password cannot be empty");
            return false;
        }
        if (!passwordPattern.test(input)) {
            toast.warning("Password must be at least 8 characters long and include an uppercase letter, a number, and a special character.");
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let data;
            if (isRegister) {

                if (!validateName(formData.name) || !validateEmail(formData.email) || !validatePassword(formData.password)) {
                    return;
                }

                data = await tryRegister(formData.name, formData.email, formData.password);
                console.log(data);
                toast.success("Account registered");
                setFormData({ name: '', email: '', password: '' });
            } else {

                if (!validateEmail(formData.email) || !validatePassword(formData.password)) {
                    return;
                }

                data = await tryLogin(formData.email, formData.password);
                console.log(data);
                handleUserInfo();
                setFormData({ email: '', password: '' });
                onClose();
            }
            
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong, please try again");
        }
    };

    return (
        <div className="overlay">
            <div className="form-container">
                <a href={"#"} onClick={onClose}>CLOSE</a>
                {isRegister ? (
                    <>
                        <div className="form">
                            <span className="heading">Create an account</span>
                            <form id="registrationForm" onSubmit={handleSubmit}>
                                <input
                                    placeholder="Name"
                                    type="text"
                                    name="name"
                                    id="name_register"
                                    className="input"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                                <input
                                    placeholder="Email"
                                    id="email_register"
                                    type="email"
                                    name="email"
                                    className="input"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                                <input
                                    placeholder="Password"
                                    type="password"
                                    name="password"
                                    id="pass_register"
                                    className="input"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                                <div className="button-container">
                                    <button type="submit" className="send-button">Register</button>
                                    <div className="reset-button-container">
                                        <div id="reset-btn" className="reset-button"
                                             onClick={() => setFormData({name: '', email: '', password: ''})}>Reset
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="switch">
                            <a href="#" className="switch_button" onClick={handleSwitchForm}>Already have an account? Log in here!</a>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="form">
                            <span className="heading">Welcome back</span>
                            <form id="loginForm" onSubmit={handleSubmit}>
                                <input
                                    placeholder="Email"
                                    id="mail_login"
                                    type="email"
                                    name="email"
                                    className="input"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                                <input
                                    placeholder="Password"
                                    type="password"
                                    name="password"
                                    className="input"
                                    id="pass_login"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                                <div className="button-container">
                                    <button type="submit" id="loginButton" className="send-button">Login</button>
                                    <div className="reset-button-container">
                                        <div id="reset-btn" className="reset-button"
                                             onClick={() => setFormData({email: '', password: ''})}>Reset
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="switch">
                            <a href="#" className="switch_button" onClick={handleSwitchForm}>Don&apos;t have an account? Register here!</a>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default LoginContainer;