import backEndClient from "./axiosClient";
import TokenManager from "../assets/TokenManager.js";

const songUri = "/songs";
const removeSongUri = '/songs/remove';
const songCountUri = 'songs/song-appearances';

const createSong = async (artist, title, file) => {
    const formData = new FormData();
    formData.append('artist', artist);
    formData.append('title', title);
    formData.append('file', file);

    for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
    }

    try {
        const response = await backEndClient.post(songUri, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${TokenManager.getAccessToken()}`,
            }
        });
        return response.data;
    } catch (error) {
        console.error("Failed to create song:", error);
        throw error;
    }
};

const getSong = async (songId) => {
    try {
        const response = await backEndClient.get(`${songUri}/${songId}`, {
            headers: {
                'Authorization': `Bearer ${TokenManager.getAccessToken()}`,
                'Accept':'audio/mpeg',
            },
            responseType: 'blob',
        });

        const blobUrl = URL.createObjectURL(response.data);
        
        return blobUrl;
    } catch (error) {
        console.error("Something went wrong fetching file:", error);
    }
};

const removeSongFromPlaylist = async (songId, playlistId) => {
    try {
        const response = await backEndClient.delete(`${removeSongUri}/${songId}`, {
            headers: {
                'Authorization': `Bearer ${TokenManager.getAccessToken()}`,
            },
            params: {
                playlistId: playlistId
            }
        });
        return response.data;
    } catch (error) {
        console.error("Failed to delete song:", error);
    }
};

const getSongCount = async () => {
    try {
        const response = await backEndClient.get(songCountUri, {
            headers: {
                'Authorization': `Bearer ${TokenManager.getAccessToken()}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Failed to get song count:", error);
    }
}

export { createSong, getSong, removeSongFromPlaylist, getSongCount };