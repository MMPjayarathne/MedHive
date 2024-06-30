import React, { useState, useEffect } from 'react';
import { TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import axios from 'axios';
import Cookies from 'js-cookie';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const api = process.env.REACT_APP_BACKEND_URL;
  const [token] = useState(Cookies.get('token') || '');
  console.log(api)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get( api +'/user/admin' , {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        console.log(response);
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const filteredUsers = users.filter(user => user.Name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <TextField
        label="Search Users"
        variant="outlined"
        value={search}
        onChange={handleSearch}
        sx={{ mb: 2 }}
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user.Name}</TableCell>
                <TableCell>{user.Email}</TableCell>
                <TableCell>
                  {/* Add buttons or links for editing/removing */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button variant="contained" color="primary">Add User</Button>
    </div>
  );
};

export default UsersPage;
