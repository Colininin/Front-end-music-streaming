import React, {useState, useContext} from "react";
import '../styling/LoginContainer.css';
import {tryAddPlaylist} from "../repositories/playlistRepo.js";
import { ToastContainer, toast } from 'react-toastify';

const AddPlaylistContainer = ({isOpen, onClose, onPlaylistAdded}) => {
    const [formData, setFormData] = useState({
        name:''
    });
    
    if(!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const validateName = (name) => {
        const pattern = /^[a-zA-Z0-9\s]+$/;
        if (!name.trim()) {
            toast.warning("Name cannot be empty");
            return false;
        }
        if (!pattern.test(name)) {
            toast.warning("Name can only contain letters and spaces.");
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateName(formData.name)) {
            return;
        }

        try {
            let data;
            data = await tryAddPlaylist(formData.name);
            console.log(data);
            onPlaylistAdded();
            toast.success("Playlist added");
            onClose();
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };
    return (
        <div className="overlay">
            <div className="form-container">
                    <>
                        <a href={"#"} onClick={onClose}>CLOSE</a>
                        <div className="form">
                            <span className="heading">Create a playlist</span>
                            <form id="createPlaylistForm" onSubmit={handleSubmit}>
                                <input
                                    placeholder="Playlist name"
                                    id="playlist_name_input"
                                    type="text"
                                    name="name"
                                    className="input"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                                <div className="button-container">
                                    <button type="submit" className="send-button">Create Playlist</button>
                                    <div className="reset-button-container">
                                        <div id="reset-btn" className="reset-button" onClick={() => setFormData({ name: ''})}>Reset</div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </>
            </div>
        </div>
    );
};

export default AddPlaylistContainer;