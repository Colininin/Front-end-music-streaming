import React, { useEffect, useState } from 'react';
import SongHandler from '../assets/SongHandler';
function Playbar() {
    const [currentSongMetadata, setCurrentSongMetadata] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    useEffect(() => {
        SongHandler.on('onSongChange', (metadata) => {
            setCurrentSongMetadata(metadata);
            setIsPlaying(!!metadata);
        });

        SongHandler.on('onPlay', () => setIsPlaying(true));
        SongHandler.on('onPause', () => setIsPlaying(false));
        
        const updateTime = () => {
            setCurrentTime(SongHandler.audio.currentTime);
            setDuration(SongHandler.audio.duration);
        };

        SongHandler.audio.addEventListener('timeupdate', updateTime);
        SongHandler.audio.addEventListener('loadedmetadata', updateTime);

        return () => {
            SongHandler.off('onSongChange');
            SongHandler.off('onPlay');
            SongHandler.off('onPause');
            SongHandler.audio.removeEventListener('timeupdate', updateTime);
            SongHandler.audio.removeEventListener('loadedmetadata', updateTime);
        };
    }, []);

    const togglePlayPause = () => {
        SongHandler.togglePlayPause();
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };

    return (
        <div className="playbar">
            <div className="current-song">
                {currentSongMetadata ? (
                    <span>{currentSongMetadata.title} by {currentSongMetadata.artist.name}</span>
                ) : (
                    'No song playing'
                )}
            </div>
            <div className="playing">
                <div className="buttons">
                    <button onClick={() => SongHandler.playPrevious()}>Previous</button>
                    <button onClick={togglePlayPause}>
                        {isPlaying ? 'Pause' : 'Play'}
                    </button>
                    <button onClick={() => SongHandler.playNext()}>Next</button>
                </div>
                
                <div className="time-bar">
                    <span>{formatTime(currentTime)}</span>
                    <input
                        type="range"
                        min="0"
                        max={duration || 0}
                        value={currentTime}
                        onChange={(e) => {
                            const newTime = e.target.value;
                            SongHandler.audio.currentTime = newTime;
                        }}
                    />
                    <span>{formatTime(duration)}</span>
                </div>
            </div>
        </div>
    );
}

export default Playbar;