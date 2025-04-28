import React, { useState } from 'react';
import { createSong } from '../repositories/songRepo.js';
import { toast } from 'react-toastify';
function AddSongContainer() {

    const [formData, setFormData] = useState({
        artist: '',
        title: '',
        file: null,
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: files ? files[0] : value,
        }));
    };

    const validateInput = (input) => {
        const pattern = /^[a-zA-Z0-9\s]+$/;
        if (!input.trim()) {
            toast.warning("Input cannot be empty");
            return false;
        }
        if (!pattern.test(input)) {
            toast.warning("Input can only contain letters and spaces.");
            return false;
        }
        return true;
    };

    const validateFile = (file) => {
        if (!file) {
            toast.warning("Please select a file.");
            return false;
        }
        if (file.type !== "audio/mpeg") {
            toast.warning("File must be an MP3.");
            return false;
        }
        if (file.size > 10 * 1024 * 1024) {
            toast.warning("File must be smaller than 10MB.");
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateInput(formData.artist) || !validateInput(formData.title)) {
            return;
        }
        
        if (!validateFile(formData.file)) {
            return;
        }

        try {
            let data;
            data = await createSong(formData.artist, formData.title, formData.file);
            console.log(data);
            setFormData({ artist: '', title: '', file: null });
            toast.success("Song added");
        }
        catch (error) {
            console.log(error);
            toast.error("Something went wrong, please try again!");
        }
    }

    return (
        <>
            <div className="form">
                <form id="addSongForm" onSubmit={handleSubmit}>
                    <input
                        placeholder="Artist"
                        type="text"
                        name="artist"
                        className="input"
                        value={formData.artist}
                        onChange={handleChange}
                        required
                    />

                    <input
                        placeholder="Title"
                        type="text"
                        name="title"
                        className="input"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />

                    <input
                        placeholder="Select a file"
                        type="file"
                        name="file"
                        className="input"
                        onChange={handleChange}
                        accept=".mp3,audio/*"
                        required
                    />

                    <div className="button-container">
                        <button type="submit" className="send-button">Submit song</button>
                        <div className="reset-button-container">
                            <div id="reset-btn" className="reset-button"
                                onClick={() => setFormData({ artist: '', title: '', file: null })}>Reset
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

export default AddSongContainer;