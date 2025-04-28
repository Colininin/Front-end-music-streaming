import React, { createContext, useState, useEffect } from 'react';
import { getUserInfo, deleteThisAccount } from '../repositories/usersRepo';
import TokenManager from './TokenManager';
import {getUserPlaylists} from "../repositories/playlistRepo.js";
import SongHandler from "./SongHandler";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [playlists= [], setPlaylists] = useState([]);
    
    const updatePlaylists = async () => {
        try{
            const playlists = await getUserPlaylists();
            setPlaylists(playlists);
        }catch(error){
            console.log(error);
        }
    }
    
    const setInfo = async () => {
        try {
            const userData = await getUserInfo();
            setUser(userData);
            const playlists = await getUserPlaylists();
            setPlaylists(playlists);
        } catch (error) {
            console.log("Failed to get user data:", error);
            setUser(null);
            setPlaylists([]);
        }
    };

    const logout = async () => {
        try {
            SongHandler.reset();
            await TokenManager.clearTokens();
            setUser(null);
            setPlaylists([]);

            window.location.reload;
            console.log("Logged out succesfully");
        } catch (error) {
            console.log(error);
        }
    };

    const deleteAccount = async () => {
        try {
            const data = await deleteThisAccount();
            logout();
        } catch (error) {
            console.error("Could not delete account, contact a admin");
            throw error;
        }
    };

    return (
        <UserContext.Provider value={{ user, setUser, logout, setInfo, playlists, updatePlaylists, deleteAccount }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;