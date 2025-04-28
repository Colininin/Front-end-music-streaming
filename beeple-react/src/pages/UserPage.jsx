import React, { useContext, useState, useEffect } from 'react';
import SearchResults from "../components/SearchResults.jsx";
import UserHomeContainer from "../components/UserHomeContainer.jsx";
import UserContext from "../assets/UserContext.jsx";
import LibraryContainer from "../components/user-library.jsx";
import PlaylistInfo from '../components/PlaylistInfo.jsx';
import { useLocation } from 'react-router-dom';
import WebSocketChat from '../assets/WebSocketHandler.jsx';

function UserPage({ activeContainer, setActiveContainer, searchData }) {
    const { user } = useContext(UserContext);
    const location = useLocation();
    const [activePlaylist, setActivePlaylist] = useState(null);

    const handleLibraryAction = (actionType, payload) => {
        if (actionType === "openPlaylistDetails") {
            setActiveContainer("playlistDetails");
            setActivePlaylist(payload.playlistId);
        }
    };

    const closePlaylistDetails = () => {
        setActiveContainer("home");
        setActivePlaylist(null);
    };

    useEffect(() => {
        if (location.pathname === "/") {
            setActiveContainer("home");
        }
    }, [location, setActiveContainer]);

    return(
        <>
            <div className="content-container">
                <div className="user-lib">
                    {user ? (
                        <>
                            <LibraryContainer onLibraryAction={handleLibraryAction} />
                        </>
                    ) : (
                        <span>Please login to see your playlists</span>
                    )}
                </div>

                <div className="main-content">
                    {activeContainer === 'home' && <UserHomeContainer/>}
                    {activeContainer === 'search' && <SearchResults data={searchData} />}
                    {activeContainer === "playlistDetails" && activePlaylist && (
                        <PlaylistInfo
                            playlistId={activePlaylist}
                            isOpen={activeContainer === "playlistDetails"} 
                            onClose={closePlaylistDetails}
                            //onDelete={closePlaylistDetails}
                        />
                    )}
                </div>

                <div className="global-chat">
                    {user ? (
                        <>
                            <WebSocketChat/>
                        </>
                    ) : (
                        <span>Please login to use chat</span>
                    )}

                </div>
            </div>
        </>
    )
}
export default UserPage;
