import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';

const ModifyData = () => {
    const [usersTableHeading, setUsersTableHeading] = useState([]);
    const [usersData, setUsersData] = useState([]);
    const [selectedRole, setSelectedRole] = useState(''); // State for selected role
    const [deletedUsers, setDeletedUsers] = useState([]); // State for deleted user IDs

    // Function to handle role selection
    const handleRoleSelect = (userId, role) => {
        setSelectedRole((prevRoles) => ({
            ...prevRoles,
            [userId]: role,
        }));
    };

    // Function to handle user deletion
    const handleDeleteUser = async (userId, userEmail) => {
        try {
            // Send a DELETE request to the server to delete the user based on email
            await fetch(`http://localhost:5000/dashboard/users/${userEmail}`, {
                method: 'DELETE',
                mode: 'cors',
                headers: { 'Content-Type': 'application/json' },
            });

            // Update the usersData state to remove the deleted user
            const updatedData = usersData.filter(
                (rowData) => rowData[0] !== userId
            );
            setUsersData(updatedData);

            // Update the deletedUsers state to keep track of deleted user IDs
            setDeletedUsers([...deletedUsers, userId]);
        } catch (err) {
            console.error(err.message);
        }
    };

    // Function to handle user updation
    const handleUpdateUser = async (userId, userEmail) => {
        try {
            // Send an API call to update the user's role on the server
            await fetch(`http://localhost:5000/dashboard/updateRole/${userEmail}`, {
                method: 'PUT',
                mode: 'cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ role: selectedRole[userId] }),
            });

            // Once the update is successful, update the user's role in the local state
            const updatedData = usersData.map((rowData) =>
                rowData[0] === userId
                    ? [rowData[0], rowData[1], selectedRole[userId], rowData[3]]
                    : rowData
            );
            setUsersData(updatedData);
            delete selectedRole[userId]; // Remove the selected role from the state
        } catch (err) {
            console.error(err.message);
        }
    };

    const formatData = (data) => {
        return data.map((item) => {
            return item
                .split('_')
                .map(
                    (word) =>
                        word.charAt(0).toUpperCase() +
                        word.slice(1).toLowerCase()
                )
                .join(' ');
        });
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `http://localhost:5000/dashboard/users`,
                    {
                        method: 'GET',
                        mode: 'cors',
                        headers: { 'Content-Type': 'application/json' },
                    }
                );

                const parseRes = await response.json();

                const table_heading = parseRes.metaData.map(
                    (item) => item.name
                );
                setUsersTableHeading(formatData(table_heading));

                const rowsData = parseRes.rows.map((row) => {
                    // Convert 'created_on' date to a formatted string (dd-MM-yyyy)
                    const formattedDate = new Date(row[3]).toLocaleDateString(
                        'en-GB',
                        {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                        }
                    );

                    return [...row.slice(0, 3), formattedDate];
                });
                // Initialize selectedRole state with user roles
                const initialRoles = {};
                rowsData.forEach((row) => {
                    initialRoles[row[0]] = row[2];
                });

                setUsersData(rowsData);
                setSelectedRole(initialRoles);
            } catch (err) {
                console.error(err.message);
            }
        };
        fetchData();
    }, []);

    return (
        <>
            <div className="modifyData-container">
                <Table striped bordered hover className="data-table">
                    <thead>
                        <tr>
                            {usersTableHeading.map((heading) => (
                                <th key={heading}>{heading}</th>
                            ))}
                            <th>Edit Role</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    

                    <tbody>
                        {usersData.map((rowData, index) => {
                            const userId = rowData[0];
                            const userRole = rowData[2];
                            const selectedRoleForUser =
                                selectedRole[userId] || userRole;

                            return (
                                <tr key={index}>
                                    {rowData.map((columnData, columnIndex) => (
                                        <td key={columnIndex}>{columnData}</td>
                                    ))}
                                    <td>
                                        <select value={selectedRoleForUser} onChange={(e) => {handleRoleSelect(userId,e.target.value);}} >
                                            <option value="admin">admin</option>
                                            <option value="watcher"> watcher</option>
                                            <option value="scheduler">scheduler</option>
                                        </select>
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-primary btn-sm update-btn"
                                            onClick={() => handleUpdateUser(rowData[0], rowData[1])}
                                            disabled={selectedRoleForUser === userRole}
                                        >
                                            Update
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-danger btn-sm delete-btn"
                                            onClick={() => handleDeleteUser(rowData[0], rowData[1])}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </div>
        </>
    );
};

export default ModifyData;
