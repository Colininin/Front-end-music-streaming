import backEndClient from "./axiosClient";
import TokenManager from "../assets/TokenManager.js";

const getPlaylistUri = "playlist/user-playlists";
const baseUri = "playlist";
const addSongToPlaylistUri = "playlist/add-song";
const deletePlaylistUri = 'playlist/delete';

const getUserPlaylists = async () => {
    try {
        const response = await backEndClient.get(getPlaylistUri,{
            headers: {
                Authorization: `Bearer ${TokenManager.getAccessToken()}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Something went wrong fetching user playlists:", error);
        throw error;
    }
}

const tryAddPlaylist = async (name) =>{
    try{
        const response = await backEndClient.post(baseUri,
            { name },
            { headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` } }
        );
        return response.data;
    }catch (error){
        console.error("Something went wrong fetching user playlists:", error);
        throw error;
    }
}

const getSongsInPlaylist = async (id) =>{
    try{
        const response = await backEndClient.get(`${baseUri}/${id}/songs`,
            { headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` } }
        );
        return response.data;
    }catch (error){
        console.error("Something went wrong fetching songs for playlist:", error);
    }
}

const addSongToPlaylist = async (songId, playlistId) =>{
    try{
        const response = await backEndClient.post(`${addSongToPlaylistUri}/${playlistId}/${songId}`,{},{
            headers: {
                Authorization: `Bearer ${TokenManager.getAccessToken()}`
            }
        });
        return response.data;
    }catch (error){
        console.error("Something went wrong adding song to playlist:", error);
    }
}

const deletePlaylist = async (playlistId) => {
    try {
        const response = await backEndClient.delete(`${deletePlaylistUri}/${playlistId}`, {
            headers: {
                Authorization: `Bearer ${TokenManager.getAccessToken()}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Something went wrong deleting playlist:", error);
    }
}

export { getUserPlaylists, tryAddPlaylist, getSongsInPlaylist, addSongToPlaylist, deletePlaylist };