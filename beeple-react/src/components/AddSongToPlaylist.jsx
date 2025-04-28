import React, {useContext} from 'react';
import UserContext from "../assets/UserContext.jsx";
import { addSongToPlaylist } from "../repositories/playlistRepo.js";
import { toast } from 'react-toastify';

const AddSongToPlaylist = ({songId, isOpen, onClose}) => {
    const {playlists} = useContext(UserContext);
    
    const addToPlaylist = async (songId, playlistId) => {
        try{
            const data = await addSongToPlaylist(songId, playlistId);
            console.log(data);
            onClose();
            toast.success("Song added to playlist");
        }catch(error){
            console.error("Failed to add song:", error);
            toast.error("Something went wrong, please try again");
        }
    }
    
    if(!isOpen) return null;
    return (
        <>
            <div className="overlay">
                <div className="form-container">
                    <>
                        <a href={"#"} onClick={onClose}>CLOSE</a>
                        <div className="playlist-list">
                            {playlists.map((playlist) => (
                                <div key={playlist.id} className="playlist-item">
                                    <span>{playlist.name}</span>
                                    <button onClick={() => addToPlaylist(songId, playlist.id)}>Add</button>
                                </div>
                            ))}
                        </div>
                    </>
                </div>
            </div>
        </>
    );
};
export default AddSongToPlaylist;