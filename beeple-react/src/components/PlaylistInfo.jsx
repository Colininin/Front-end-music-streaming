import React, {useEffect , useState} from "react";
import { getSongsInPlaylist, deletePlaylist } from "../repositories/playlistRepo.js"
import { removeSongFromPlaylist} from "../repositories/songRepo.js";
import SongHandler from '../assets/SongHandler.js';
import { toast } from 'react-toastify';
function PlaylistInfo({ isOpen, onClose, playlistId }) {
    const [playlist, setPlaylist] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!isOpen) return;

        const fetchPlaylist = async () => {
            setIsLoading(true);
            try {
                const data = await getSongsInPlaylist(playlistId);
                if (data && typeof data === "object" && data.songs) {
                    setPlaylist(data);
                } else {
                    console.error("Unexpected playlist structure:", data);
                    toast.error("Something went wrong");
                    setPlaylist(null);
                }
            } catch (error) {
                console.error("Error fetching playlist:", error);
                toast.error("Something went wrong");
                setPlaylist(null);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPlaylist();
    }, [isOpen, playlistId]);

    const playSong = (songId, title, artist) => {
        const metadata = { title, artist };
        SongHandler.setQueue(playlist.songs);
        const songIndex = playlist.songs.findIndex((song) => song.id === songId);
        if (songIndex !== -1) {
            SongHandler.currentQueueIndex = songIndex;
        }
        SongHandler.playSong(songId, metadata);
    };

    const playPlaylist = () => {
        if (playlist.songs && playlist.songs.length > 0) {
            SongHandler.setQueue(playlist.songs);
            const firstSong = playlist.songs[0];
            SongHandler.playSong(firstSong.id, { title: firstSong.title, artist: firstSong.artist.name });
        }
    };

    const removeFromPlaylist = async (songId) => {
        try{
            const data = await removeSongFromPlaylist(songId, playlist.id);
            console.log(data);
            setPlaylist((prevPlaylist) => ({
                ...prevPlaylist,
                songs: prevPlaylist.songs.filter((song) => song.id !== songId),
            }));
            toast.success("Song removed from playlist");
        }catch(error){
            console.error("Failed to remove song:", error);
            toast.error("Something went wrong, please try again");
        }
    }

    const deleteThisPlaylist = async () => {
        try {
            const playlistId = playlist.id;
            const data = await deletePlaylist(playlistId);
            console.log(data);
            toast.success("Playlist successfully removed");
            //Reload container in some way to show playlist is deleted
        } catch (error) {
            console.error("Something went wrong deleting playlist:", error);
            toast.error("Something went wrong");
        }
    }
    
    if (!isOpen || isLoading) {
        return (
            <div className="playlist-info">
                <span>Loading playlist...</span>
            </div>
        );
    }

    if (!isOpen) return null;
    return (
        <div className="playlist-info">
            <div className="top">
                <div className="left">
                    <div className="img"></div>
                </div>
                <div className="right">
                    <div>
                        <span>{playlist.name || "Unnamed Playlist"}</span>
                        <button onClick={playPlaylist}>Play Playlist</button>
                    </div>
                    <div>
                        <button id="deleteBtn" onClick={deleteThisPlaylist }>Delete playlist</button>
                    </div>
                </div>
            </div>
            <div className="bottom">
                <div className="songs">
                    <div className="divTable songsTable">
                        <div className="divTableHeading">
                            <div className="divTableRow">
                                <div className="divTableHead1">#</div>
                                <div className="divTableHead">Title</div>
                                <div className="divTableHead">Artist</div>
                                <div className="divTableHead">Playbutton</div>
                                <div className="divTableHead">Remove</div>
                            </div>
                        </div>
                        <div className="divTableBody">
                            {playlist.songs && playlist.songs.length > 0 ? (
                                playlist.songs.map((song, index) => (
                                    <div className="divTableRow" key={song.id || index}>
                                        <div className="divTableCell1">{index}</div>
                                        <div className="divTableCell">{song.title}</div>
                                        <div className="divTableCell">{song.artist.name}</div>
                                        <div className="divTableCell"><button onClick={() => playSong(song.id, song.title, song.artist) }>Play</button></div>
                                        <div className="divTableCell"><button onClick={() => removeFromPlaylist(song.id)}>Remove song</button></div>
                                    </div>
                                ))) : (
                                    <div className="err">
                                        <span>No songs found</span>
                                    </div>
                                )}
                        </div>
                    </div>
                </div>
            </div>
        <button onClick={onClose}>Close</button>
    </div>
    );
}
export default PlaylistInfo;