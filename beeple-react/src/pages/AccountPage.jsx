import React, { useState, useContext} from 'react';
import UserContext from "../assets/UserContext.jsx";
import EditUserInfo from "../components/EditUserInfo.jsx";
import AddSongContainer from '../components/AddSongContainer.jsx';
import ADMIN_accountPage from '../components/ADMIN-accountPage.jsx';
function AccountPage() {
    const { user, logout, deleteAccount } = useContext(UserContext);
    const [activeContainer, setActiveContainer] = useState('userInfo');
   
    const handleLogout = () => {
        logout();
    };

    const handleDeleteAccount = () => {
        deleteAccount();
    };

    return (
        <>
            <div className="content-account">
                {user ? (
                    user.role === 'ADMIN' ? (
                        <ADMIN_accountPage/>
                    ) : (
                        <>
                            <div className="left-nav">
                                <button onClick={() => setActiveContainer('userInfo')}>My Account</button>
                                <button onClick={() => setActiveContainer('addSong')}>Add a song</button>
                                    <button onClick={handleDeleteAccount }>Delete Account</button>
                                <button onClick={handleLogout}>Logout</button>
                            </div>
                            <div className="right-content">
                                {activeContainer === 'userInfo' && <EditUserInfo />}
                                {activeContainer === 'addSong' && <AddSongContainer />}
                            </div>
                        </>
                    )
                ) : (
                    <span>Please login to see account information</span>
                )}
            </div>
        </>
    );
}

export default AccountPage;