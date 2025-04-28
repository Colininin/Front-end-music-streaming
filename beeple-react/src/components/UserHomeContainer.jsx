import React, { useContext } from 'react';
import UserContext from "../assets/UserContext.jsx";

function UserHomeContainer() {
    const { user } = useContext(UserContext);
    return (
        <div className="userHomeContainer">
            {user ? (
                <>
                    <span>Welcome back, {user.name}!</span>
                </>
            ) : (
                <span>Welcome</span>
            )}
        </div>
    )
}

export default UserHomeContainer;