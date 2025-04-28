import React, { useEffect, useState } from 'react';
import { getSongCount } from '../repositories/songRepo.js';
import { toast } from 'react-toastify';
function SongCount({isOpen }) {
    const [songs, setSongs] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!isOpen) return;

        const fetchSongCount = async () => {
            setIsLoading(true);
            try {
                const data = await getSongCount();
                const songsArray = Object.values(data);
                setSongs(songsArray);
            } catch (error) {
                console.error("Something went wrong");
                toast.error("Something went wrong, please try again");
            } finally {
                setIsLoading(false);
            }
        };
        fetchSongCount();
    }, [isOpen]);

    if (!isOpen || isLoading) {
        return (
            <div className="songs-info">
                <span>Loading Songs...</span>
            </div>
        );
    }
    if (!isOpen) return null;

    return (
        <div className="song-info">
            {isLoading ? (
                <div className="songs-info">
                    <span>Loading Songs...</span>
                </div>
            ) : (
                <div className="songs">
                    <div className="divTable songsTable">
                        <div className="divTableHeading">
                            <div className="divTableRow">
                                <div className="divTableHead1">#</div>
                                <div className="divTableHead">Title</div>
                                <div className="divTableHead">Artist</div>
                                <div className="divTableHead">Times in playlist</div>
                            </div>
                        </div>
                        <div className="divTableBody">
                            {songs.length > 0 ? (
                                songs.map((song, index) => (
                                    <div className="divTableRow" key={song.id || index}>
                                        <div className="divTableCell1">{song.id}</div>
                                        <div className="divTableCell">{song.title}</div>
                                        <div className="divTableCell">{song.artist}</div>
                                        <div className="divTableCell">{song.count}</div>
                                    </div>
                                ))
                            ) : (
                                <div className="err">
                                    <span>No songs found</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default SongCount;