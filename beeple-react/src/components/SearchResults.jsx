import React, {useContext, useState} from "react";
import UserContext from "../assets/UserContext.jsx";
import AddSongToPlaylist from "./AddSongToPlaylist.jsx";
function SearchResults({data}) {
    const { songs: dataSongs = [], users: dataUsers = [], playlists: dataPlaylists = [] } = data;
    const { user } = useContext(UserContext);
    const [isAddSongOpen, setAddSongOpen] = useState(false);
    
    const songs = Array.isArray(dataSongs) ? [...dataSongs] : [];
    const users = Array.isArray(dataUsers) ? [...dataUsers] : [];
    const playlists = Array.isArray(dataPlaylists) ? [...dataPlaylists] : [];

    const openAddSong = (songId) => setActiveSongId(songId);
    const closeAddSong = () => setActiveSongId(null);
    
    const [activeSongId, setActiveSongId] = useState(null);
    
    
    return (
        <>
            <div className="search-results">
                {songs.length > 0 ? (
                    <>
                        <div className="result-type"><span>Song results:</span></div>
                        <div className="song-results">
                        {songs.slice(0,3).map((song, index) => (
                            <div className="song-card" key={song.id}>
                                <div className="img"></div>
                                <div className="textcontainer">
                                    <div className="content">
                                        <span className="title">{song.title}</span>
                                        <br></br>
                                        <span className="artist">{song.artist.name}</span>
                                    </div>
                                </div>
                                {user ? (
                                    <>
                                        <div className="add-button">
                                            <button onClick={() => openAddSong(song.id)}>Add song to playlist</button>
                                            <AddSongToPlaylist songId={song.id} isOpen={activeSongId === song.id} onClose={closeAddSong}/>
                                        </div>

                                    </>
                                ) : (
                                    <span></span>
                                )}
                            </div>
                        ))}
                    </div></>
                ) :<span>No songs found</span>}

                {users.length > 0 ? (
                    <><div className="result-type"><span>User results:</span></div>
                        <div className="user-results">
                            {users.slice(0, 4).map((user, index) => (
                                <div className="user-card" key={user.id}>
                                    <div className="img"></div>
                                    <div className="textcontainer">
                                        <span className="name">{user.name}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                ) : <span>No users found</span>}

                {playlists.length > 0 ?(
                        <>
                            <div className="result-type"><span>Playlist results:</span></div>
                            <div className="playlists">
                                {playlists.map((playlist, index) => (
                                    <div className="playlist-card" key={playlist.id}>
                                        <div className="img"></div>
                                        <div className="textcontainer">
                                            <span className="title">{playlist.name}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) :
                    <span>No playlists found</span>
                }
            </div>
        </>
    );
}

export default SearchResults;