import React, { useState, useContext } from 'react';
import { toast } from 'react-toastify';
import UserContext from '../assets/UserContext';
import { editUserInfo } from '../repositories/usersRepo';

function EditUserInfo() {
    const { user, setInfo } = useContext(UserContext);
    const [formData, setFormData] = useState({
        name: user.name,
        email: user.email
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let data;
          
            if (!validateName(formData.name) || !validateEmail(formData.email)) {
                return;
            }

            data = await editUserInfo(formData.name, formData.email);
            toast.success("Account information changed");
            setInfo();
          
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong, please try again");
        }
    };

    return (
        <>
            <div className="form">
                <form id="edit-info-form" onSubmit={handleSubmit}>
                    <input
                        placeholder="Name"
                        type="text"
                        name="name"
                        className="input"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    <input
                        placeholder="email"
                        type="email"
                        name="email"
                        className="input"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <div className="button-container">
                        <button type="submit" id="submitbttn" className="send-button">Edit information</button>
                        <div className="reset-button-container">
                            <div id="reset-btn" className="reset-button"
                                onClick={() => setFormData({ email: '', name: '' })}>Reset
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

export default EditUserInfo;