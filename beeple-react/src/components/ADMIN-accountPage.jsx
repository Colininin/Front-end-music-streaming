import React, { useContext, useState } from 'react';
import UserContext  from '../assets/UserContext';
import SongCount from './SongCount';
import UserOverview from './UserOverview';
function ADMIN_accountPage() {
    const { logout } = useContext(UserContext);
    const [activeContainer, setActiveContainer] = useState('userOverview');

    const handleLogout = () => {
        logout();
    };

    return (
        <>
            <div className="content-account">
                <div className="left-nav">
                    <button onClick={() => setActiveContainer('userOverview')}>See users</button>
                    <button onClick={() => setActiveContainer('songCount')}>See song count</button>
                    <button onClick={handleLogout}>Logout</button>
                </div>
                <div className="right-content">
                    {activeContainer === 'userOverview' && <UserOverview isOpen={activeContainer === "userOverview" } />}
                    {activeContainer === 'songCount' && <SongCount isOpen={activeContainer === "songCount"}/>}
                </div>
            </div>
        </>
    );
}

export default ADMIN_accountPage;