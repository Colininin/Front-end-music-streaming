import { getSong } from '../repositories/songRepo.js';

class SongHandler {
    constructor() {
        this.audio = new Audio();
        this.currentSongId = null;
        this.currentSongMetadata = null;
        this.isPlaying = false;
        this.queue = [];
        this.currentQueueIndex = 0;

        this.callbacks = {
            onPlay: null,
            onPause: null,
            onSongChange: null,
        };

        this.audio.addEventListener('ended', () => this.playNext());
    }

    reset() {
        this.audio.pause();
        this.audio.src = "";
        this.currentSongId = null;
        this.currentSongMetadata = null;
        this.isPlaying = false;
        this.queue = [];
        this.currentQueueIndex = 0;
        
        if (this.callbacks.onSongChange) {
            this.callbacks.onSongChange(null);
        }
    }

    async playSong(songId, metadata) {
        if (this.currentSongId !== songId) {
            const songUrl = await getSong(songId);
            this.audio.src = songUrl;
            this.currentSongId = songId;
            this.currentSongMetadata = metadata;

            if (this.callbacks.onSongChange) {
                this.callbacks.onSongChange(metadata);
            }
        }

        this.audio.play();
        this.isPlaying = true;

        if (this.callbacks.onPlay) {
            this.callbacks.onPlay();
        }
    }

    playNext() {
        if (this.currentQueueIndex + 1 < this.queue.length) {
            this.currentQueueIndex++;
            const nextSong = this.queue[this.currentQueueIndex];
            this.playSong(nextSong.id, { title: nextSong.title, artist: nextSong.artist });
        } else {
            this.stop();
        }
    }

    playPrevious() {
        if (this.currentQueueIndex - 1 >= 0) {
            this.currentQueueIndex--;
            const prevSong = this.queue[this.currentQueueIndex];
            this.playSong(prevSong.id, { title: prevSong.title, artist: prevSong.artist });
        }
    }

    setQueue(songs) {
        this.queue = songs;
        this.currentQueueIndex = 0;
    }

    clearQueue() {
        this.queue = [];
        this.currentQueueIndex = 0;
    }

    stop() {
        this.audio.pause();
        this.audio.src = "";
        this.isPlaying = false;
    }

    pauseSong() {
        this.audio.pause();
        this.isPlaying = false;

        if (this.callbacks.onPause) {
            this.callbacks.onPause();
        }
    }

    togglePlayPause() {
        if (this.isPlaying) {
            this.pauseSong();
        } else {
            this.audio.play();
            this.isPlaying = true;

            if (this.callbacks.onPlay) {
                this.callbacks.onPlay();
            }
        }
    }

    on(event, callback) {
        if (this.callbacks[event] !== undefined) {
            this.callbacks[event] = callback;
        }
    }

    off(event) {
        if (this.callbacks[event] !== undefined) {
            this.callbacks[event] = null;
        }
    }
}

export default new SongHandler();