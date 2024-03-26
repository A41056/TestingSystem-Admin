import React, { useState } from 'react';
import {Link} from 'react-router-dom';

function AdminUserCreate() {
  const [formData, setFormData] = useState({
    userName: '',
    password: '',
    roleName: '',
    firstName: '',
    lastName: '',
    fullName: '',
    email: '',
    phoneNumber: '',
    gender: '',
    birthDay: '',
  });
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${BASE_URL}/User/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('User added successfully');
        // Clear form fields after successful user creation
        setFormData({
          userName: '',
          password: '',
          roleName: '',
          firstName: '',
          lastName: '',
          fullName: '',
          email: '',
          phoneNumber: '',
          gender: '',
          birthDay: '',
        });
        // Redirect or perform any other action upon successful user creation
      } else {
        console.error('Failed to add user:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };
  
  return (
    <div className="tab-content rounded-bottom">
      <div className="tab-pane p-3 active preview" role="tabpanel" id="preview-1003">
        <div className="col-12">
          <div className="card mb-4">
            <div className="card-header"><strong>CREATE USER</strong></div>
            <div className="card-body">
              <form className="row g-3" onSubmit={handleSubmit}>
                 {/* Username */}
                 <div className="col-md-6">
                 <label className="form-label" htmlFor="inputUsername">Username</label>
                 <input className="form-control" id="inputUsername" type="text" name="userName" value={formData.userName} onChange={handleChange} />
             </div>
             {/* Password */}
             <div className="col-md-6">
                 <label className="form-label" htmlFor="inputPassword">Password</label>
                 <input className="form-control" id="inputPassword" type="password" name="password" value={formData.password} onChange={handleChange} />
             </div>
             {/* First Name */}
             <div className="col-md-6">
                 <label className="form-label" htmlFor="inputFirstName">First Name</label>
                 <input className="form-control" id="inputFirstName" type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
             </div>
             {/* Last Name */}
             <div className="col-md-6">
                 <label className="form-label" htmlFor="inputLastName">Last Name</label>
                 <input className="form-control" id="inputLastName" type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
             </div>
             {/* Role Name */}
             <div className="col-md-6">
             <label className="form-label" htmlFor="inputRoleName">Role Name</label>
             <select className="form-select" id="inputRoleName" name="roleName" value={formData.roleName} onChange={handleChange}>
                 <option value="">Choose...</option>
                 <option value="Admin">Admin</option>
                 <option value="Teacher">Teacher</option>
                 <option value="User">User</option>
             </select>
             </div>
             {/* Email */}
             <div className="col-md-6">
                 <label className="form-label" htmlFor="inputEmail">Email</label>
                 <input className="form-control" id="inputEmail" type="email" name="email" value={formData.email} onChange={handleChange} />
             </div>
             {/* Phone Number */}
             <div className="col-md-6">
                 <label className="form-label" htmlFor="inputPhoneNumber">Phone Number</label>
                 <input className="form-control" id="inputPhoneNumber" type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
             </div>
             {/* Gender */}
             <div className="col-md-6">
             <label className="form-label" htmlFor="inputGender">Gender</label>
             <select className="form-select" id="inputGender" name="gender" value={formData.gender} onChange={handleChange}>
                 <option value="">Choose...</option>
                 <option value="Male">Male</option>
                 <option value="Female">Female</option>
                 <option value="Other">Other</option>
             </select>
             </div>
             {/* Birthday */}
             <div className="col-md-6">
                 <label className="form-label" htmlFor="inputBirthDay">Birthday</label>
                 <input className="form-control" id="inputBirthDay" type="date" name="birthDay" value={formData.birthDay} onChange={handleChange} />
             </div>
                <div className="col-12">
                  <Link className="btn btn-secondary me-2" to="/admin-users">Back</Link>
                  <button className="btn btn-primary" type="submit">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminUserCreate;
