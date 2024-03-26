import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function AdminUserManager() {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState({
    userName: '',
    gender: '',
  });

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    fetchUsers();
  }, [filter]); // Refetch users when filters change

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');

      // Construct the API request URL based on the filter criteria
      let apiUrl = `${BASE_URL}/User/list`;
      let queryString = Object.keys(filter)
        .filter(key => filter[key] !== '')
        .map(key => `${key}=${filter[key]}`)
        .join('&');
      if (queryString) {
        apiUrl += `?${queryString}`;
      }

      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const userList = await response.json();
        setUsers(userList.data);
      } else {
        console.error('Failed to fetch users:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleChange = e => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    // Fetch users with updated filter values
    fetchUsers();
  };

  return (
    <div className="container-fluid">
      <div className="card mb-4">
        <div className="card-header">
          <strong>Users</strong>
        </div>
        <div className="card-body">
          <form className="row g-3 align-items-center" onSubmit={handleSubmit}>
            <div className="col-auto">
              <label className="visually-hidden" htmlFor="userName">Username</label>
              <input
                className="form-control"
                id="userName"
                type="text"
                placeholder="Search by username"
                value={filter.userName}
                name="userName"
                onChange={handleChange}
              />
            </div>
            <div className="col-auto">
              <label className="visually-hidden" htmlFor="gender">Gender</label>
              <select
                className="form-select"
                id="gender"
                name="gender"
                value={filter.gender}
                onChange={handleChange}
              >
                <option value="">All Genders</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="col-auto">
              <button className="btn btn-primary" type="submit">Search</button>
            </div>
            <div className="col-auto">
              <Link to="/admin-create-user" className="btn btn-primary">Create User</Link>
            </div>
          </form>
          <table className="table table-hover mt-3">
            {/* Table header */}
            <thead>
              <tr>
                <th scope="col">Number</th>
                <th scope="col">Username</th>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Email</th>
                <th scope="col">Phone Number</th>
                <th scope="col">Gender</th>
                <th scope="col">Birthday</th>
                <th scope="col">Active</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{user.userName}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                  <td>{user.phoneNumber}</td>
                  <td>{user.gender}</td>
                  <td>{user.birthDay}</td>
                  <td>{user.isActive ? 'Yes' : 'No'}</td>
                  <td>
                    <Link to={`/admin-edit-user/${user.id}`}>Edit</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminUserManager;
