import React, { useState, useContext } from 'react';
import LoginContainer from './LoginContainer';
import UserContext from '../assets/UserContext';
import { getSearchResults } from '../repositories/searchRepo';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function NavBar({setActiveContainer, sendDataToPage}) {
    const [isLoginOpen, setLoginOpen] = useState(false);
    const { user } = useContext(UserContext);
    const [searchInput, setSearchInput] = useState({
        input: ''
    });

    const openLogin = () => setLoginOpen(true);
    const closeLogin = () => setLoginOpen(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSearchInput((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const validateSearch = (input) => {
        const pattern = /^[a-zA-Z\s]+$/;
        if (!input.trim()) {
            toast.warning("Input cannot be empty");
            return false;
        }
        if (!pattern.test(input)) {
            toast.warning("Search request can only contain letters and spaces.");
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateSearch(searchInput.input)) {
            return;
        }

        try {
            const data = await getSearchResults(searchInput.input);
            sendDataToPage(data);
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong, please try again");
        }
    };
    


    return (
        <>
            <div className="nav">
                <div className="lft">
                    <Link to="/" onClick={() => setActiveContainer('home')}><svg version="1.0" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" enableBackground="new 0 0 64 64" space="preserve" fill="#ffffff" stroke="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill="#ffffff" d="M62.79,29.172l-28-28C34.009,0.391,32.985,0,31.962,0s-2.047,0.391-2.828,1.172l-28,28 c-1.562,1.566-1.484,4.016,0.078,5.578c1.566,1.57,3.855,1.801,5.422,0.234L8,33.617V60c0,2.211,1.789,4,4,4h16V48h8v16h16 c2.211,0,4-1.789,4-4V33.695l1.195,1.195c1.562,1.562,3.949,1.422,5.516-0.141C64.274,33.188,64.356,30.734,62.79,29.172z"></path> </g></svg></Link>
                </div>
                <div className="mid">
                    <div className="search-container">
                        <form id="searchbar" onSubmit={handleSubmit}>
                            <input
                                type="text"
                                placeholder="Search for artist or number"
                                name="input"
                                id="input"
                                value={searchInput.input}
                                onChange={handleChange}
                                required
                            />
                            <button className="search-icon" type="submit"><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg></button>
                        </form>
                    </div>
                </div>
                <div className="right">
                    {user ? (
                        <>
                            <Link to="/account">
                                <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M8 7C9.65685 7 11 5.65685 11 4C11 2.34315 9.65685 1 8 1C6.34315 1 5 2.34315 5 4C5 5.65685 6.34315 7 8 7Z" fill="#ffffff"></path> <path d="M14 12C14 10.3431 12.6569 9 11 9H5C3.34315 9 2 10.3431 2 12V15H14V12Z" fill="#ffffff"></path> </g></svg>
                            </Link>
                        </>
                    ) : (
                            <button onClick={openLogin} id="openLogin" className="buttttttttton"><svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M8 7C9.65685 7 11 5.65685 11 4C11 2.34315 9.65685 1 8 1C6.34315 1 5 2.34315 5 4C5 5.65685 6.34315 7 8 7Z" fill="#ffffff"></path> <path d="M14 12C14 10.3431 12.6569 9 11 9H5C3.34315 9 2 10.3431 2 12V15H14V12Z" fill="#ffffff"></path> </g></svg></button>
                    )}
                    <LoginContainer isOpen={isLoginOpen} onClose={closeLogin} />
                </div>
            </div>
        </>
    )
}

export default NavBar