import backEndClient from "./axiosClient";

const loginUri = "auth/login";
const registerUri = "auth/register";
const userInfoUri = "users/user-info";
const usersUri = '/users';
const deleteUri = 'users/delete-user';
const deleteMeUri = 'users/delete-me';
const editUri = 'users/edit-my-info';
import TokenManager from '../assets/TokenManager';


const tryLogin = async (email, password) => {
    try {
        const response = await backEndClient.post(loginUri, { email, password });
        const { accessToken, refreshToken } = response.data;
        TokenManager.setTokens(accessToken, refreshToken);
        console.log("login successful")
        return response.data;
    }
    catch (error) {
        console.error("login failed:", error);
        throw error;
    }
};

const tryRegister = async (name, email, password) => {
    try {
        const response = await backEndClient.post(registerUri, { name, email, password });
        return response.data;
    } catch (error) {
        console.error("Registration failed:", error);
        throw error;
    }
};

const getUserInfo = async () => {
    try {
        const response = await backEndClient.get(userInfoUri,{
            headers: {
                Authorization: `Bearer ${TokenManager.getAccessToken()}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Something went wrong fetching user data:", error);
        throw error;
    }
};

const getUsers = async (page = 0, size = 15) => {
    try {
        const response = await backEndClient.get(`${usersUri}?page=${page}&size=${size}`, {
            headers: {
                Authorization: `Bearer ${TokenManager.getAccessToken()}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Something went wrong:", error);
        throw error;
    }
};

const deleteUser = async (userId) => {
    try {
        const response = await backEndClient.delete(`${deleteUri}/${userId}`, {
            headers: {
                Authorization: `Bearer ${TokenManager.getAccessToken()}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Something went wrong:", error);
        throw error;
    }
};

const deleteThisAccount = async () => {
    try {
        const response = await backEndClient.delete(deleteMeUri, {
            headers: {
                Authorization: `Bearer ${TokenManager.getAccessToken()}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Something went wrong deleting account, contact admin");
        throw error;
    }
};

const editUserInfo = async (name, email) => {
    try {
        const response = await backEndClient.put(editUri, { name, email }, {
            headers: {
                Authorization: `Bearer ${TokenManager.getAccessToken()}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("something went wrong:", error);
        throw error;
    }
};

export { tryLogin, tryRegister, getUserInfo, getUsers, deleteUser, deleteThisAccount, editUserInfo };
