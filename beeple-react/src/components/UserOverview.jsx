import React, { useState, useEffect, useContext } from 'react';
import { getUsers, deleteUser } from '../repositories/usersRepo.js';
import { toast } from 'react-toastify';
import UserContext from '../assets/UserContext';

function UserOverview({ isOpen }) {
    const { user } = useContext(UserContext);
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [pageSize] = useState(15);

    useEffect(() => {
        if (!isOpen) return;

        const fetchUsers = async () => {
            setIsLoading(true);
            try {
                const data = await getUsers(currentPage, pageSize);
                setUsers(data.users);
                setTotalPages(data.totalPages);
            } catch (error) {
                console.error("Something went wrong", error);
                toast.error("Something went wrong, please try again");
            } finally {
                setIsLoading(false);
            }
        };
        fetchUsers();
    }, [isOpen, currentPage, pageSize]);

    const handleNextPage = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage((prev) => prev + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage((prev) => prev - 1);
        }
    };

    const handleDeleteUser = async (userId) => {

        if (userId === user.id) {
            toast.warning("Haha you thought");
            return;
        }

        try {
            const data = await deleteUser(userId);
            const updatedData = await getUsers(currentPage, pageSize);
            setUsers(updatedData.users);
            setTotalPages(updatedData.totalPages);
            toast.success("User successfully deleted");
        } catch(error) {
            console.error("Failed to remove user:", error);
            toast.error("Something went wrong, please try again");
        }
    }

    if (!isOpen) return null;

    return (
        <div className="user-info">
            {isLoading ? (
                <div className="users-info">
                    <span>Loading users...</span>
                </div>
            ) : (
                <div className="users">
                    <div className="divTable usersTable">
                        <div className="divTableHeading">
                            <div className="divTableRow">
                                <div className="divTableHead1">#</div>
                                <div className="divTableHead">Name</div>
                                <div className="divTableHead">Email</div>
                                <div className="divTableHead">Role</div>
                                <div className="divTableHead">Delete</div>
                            </div>
                        </div>
                        <div className="divTableBody">
                            {users.length > 0 ? (
                                users.map((user) => (
                                    <div className="divTableRow" key={user.id}>
                                        <div className="divTableCell1">{user.id}</div>
                                        <div className="divTableCell">{user.name}</div>
                                        <div className="divTableCell">{user.email}</div>
                                        <div className="divTableCell">{user.role}</div>
                                        <div className="divTableCell"><button onClick={() => handleDeleteUser(user.id) }>Delete</button></div>
                                    </div>
                                ))
                            ) : (
                                <div className="err">
                                    <span>No users found</span>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="pagination">
                        <button disabled={currentPage === 0} onClick={handlePrevPage}>
                            Previous
                        </button>
                        <span>
                            Page {currentPage + 1} of {totalPages}
                        </span>
                        <button disabled={currentPage === totalPages - 1} onClick={handleNextPage}>
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default UserOverview;