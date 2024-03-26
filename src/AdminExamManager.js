import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function AdminExamManager() {
  const [exams, setExams] = useState([]);
  const [filter, setFilter] = useState({
    userName: '',
    gender: '',
  });

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    fetchExams();
  }, [filter]); // Refetch exams when filters change

  const fetchExams = async () => {
    try {
      const token = localStorage.getItem('token');

      // Construct the API request URL based on the filter criteria
      let apiUrl = `${BASE_URL}/Exam/list`;
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
        const examList = await response.json();
        setExams(examList.data);
      } else {
        console.error('Failed to fetch exams:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching exams:', error);
    }
  };

  const handleChange = e => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    // Fetch users with updated filter values
    fetchExams();
  };

  return (
    <div className="container-fluid">
      <div className="card mb-4">
        <div className="card-header">
          <strong>Exams</strong>
        </div>
        <div className="card-body">
          <form className="row g-3 align-items-center" onSubmit={handleSubmit}>
            <div className="col-auto">
              <label className="visually-hidden" htmlFor="title">Exam Title</label>
              <input
                className="form-control"
                id="title"
                type="text"
                placeholder="Search by exam title"
                value={filter.title}
                name="title"  // Changed name attribute to match the filter key
                onChange={handleChange}
              />
            </div>
            <div className="col-auto">
              <button className="btn btn-primary" type="submit">Search</button>
            </div>
            <div className="col-auto">
              <Link to="/admin-create-exam" className="btn btn-primary">Create Exam</Link>
            </div>
          </form>
          <table className="table table-hover mt-3">
            {/* Table header */}
            <thead>
              <tr>
                <th scope="col">Number</th>
                <th scope="col">Title</th>
                <th scope="col">Status</th>
                <th scope="col">Auto Grade</th>
                <th scope="col">Created At</th>
                <th scope="col">Modified At</th>
                <th scope="col">Teacher</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody>
              {exams.map((exam, index) => (
                <tr key={exam.examId}>
                  <td>{index + 1}</td>
                  <td>{exam.title}</td>
                  <td>{exam.status}</td>
                  <td>{exam.isAutoGrade ? 'Yes' : 'No'}</td>
                  <td>{exam.created}</td>
                  <td>{exam.modified}</td>
                  <td>{exam.createdByUserId ? exam.createdByUserId : 'Unknown'}</td> {/* Perform null check */}
                  <td>
                    <Link to={`/admin-edit-exam/${exam.examId}`}>Edit</Link>
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

export default AdminExamManager;
