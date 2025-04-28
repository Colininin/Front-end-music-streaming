import React, {useState} from 'react';
import NavBar from './components/Navbar.jsx'
import Playbar from './components/Playbar.jsx'
import { UserProvider } from './assets/UserContext.jsx'
import UserPage from './pages/UserPage.jsx'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AccountPage from './pages/AccountPage';

function App() {
    const [activeContainer, setActiveContainer] = useState('home');
    const [searchData, setSearchData] = useState([]);

    const handleSearchData = (data) => {
        setSearchData(data);
        setActiveContainer('search'); 
    };
    
    return (
        <>
            <Router>
                <UserProvider>
                    <NavBar setActiveContainer={setActiveContainer} sendDataToPage={handleSearchData}/>
                    <Routes>
                        <Route path="/" element={<UserPage activeContainer={activeContainer} setActiveContainer={setActiveContainer} searchData={searchData} />} />
                        <Route path="/account" element={<AccountPage/> }/>
                    </Routes>
                    
                    <Playbar />
                </UserProvider>
            </Router>
        </>
    )
}

export default App;