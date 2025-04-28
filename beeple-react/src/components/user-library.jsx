import React, {useContext, useState} from "react";
import UserContext from "../assets/UserContext.jsx";
import AddPlaylistContainer from "./AddPlaylistContainer.jsx"
import PlaylistInfo from "./PlaylistInfo.jsx";
function UserLibrary({ onLibraryAction }) {

    const {playlists, updatePlaylists} = useContext(UserContext);
    const [isAddPlaylistOpen, setAddPlaylistOpen] = useState(false);
    const openAddPlaylist = () => setAddPlaylistOpen(true);
    const closeAddPlaylist = () => setAddPlaylistOpen(false);
    
    const refreshPlaylists = async () => {
        try {
            updatePlaylists();
        } catch (error) {
            console.error("Failed to refresh playlists:", error);
        }
    };

    const handlePlaylistDetails = (playlistId) => {
        onLibraryAction("openPlaylistDetails", { playlistId });
    };

    return (
        <div className="library-container">
            <div className="playlist-toolkit">
                <div className="txt">
                    <span>Your Playlists</span>
                </div>
                <div className="create-playlist">
                    <button onClick={openAddPlaylist} className="add-playlist-btn" id="add-playlist">+</button>
                    <AddPlaylistContainer isOpen={isAddPlaylistOpen} onClose={closeAddPlaylist} onPlaylistAdded={refreshPlaylists} />
                </div>
            </div>
            {playlists.length > 0 ? (
                <div className="playlists">
                    {playlists.map((playlist) => (
                        <div key={playlist.id}>
                            <button
                                onClick={() => handlePlaylistDetails(playlist.id)}
                                className="playlist-card"
                            >
                                <div className="img"></div>
                                <div className="textcontainer">
                                    <span className="title">{playlist.name}</span>
                                </div>
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="no-playlist">
                    <span>You don't have any playlists</span>
                </div>
            )}
        </div>
    );
}
export default UserLibrary;