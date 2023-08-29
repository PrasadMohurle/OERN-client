import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';

const MasterData = () => {
    const [usersTableHeading, setUsersTableHeading] = useState([]);
    const [usersData, setUsersData] = useState([]);

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
                setUsersData(rowsData);
            } catch (err) {
                console.error(err.message);
            }
        };
        fetchData();
    }, []);

    return (
        <>
            <div className="masterData-container">
                <Table striped bordered hover className='data-table'>
                    <thead>
                        <tr>
                            {usersTableHeading.map((heading) => (
                                <th key={heading}>{heading}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {usersData.map((rowData, index) => (
                            <tr key={index}>
                                {rowData.map((columnData, columnIndex) => (
                                    <td key={columnIndex}>{columnData}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </>
    );
};

export default MasterData;
