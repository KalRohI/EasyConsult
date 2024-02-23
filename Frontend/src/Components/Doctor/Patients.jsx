import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar/DoctorSidebar';
import DataTable from 'react-data-table-component';
import './Patients.css';
import axios from 'axios';

const Patients = () => {
  const [patients, setPatients] = useState([
    { id: 1, name: 'John Doe', age: 30, comments: 'Test' },
    { id: 2, name: 'Jane Smith', age: 25, comments: 'No comments' },
    // Add more patient data
  ]);
  useEffect(() => {
    const fetchdata = async () => {
      const response = await axios.get(`http://localhost:3030/patient/doctor/${window.localStorage.getItem("doctorID")}`);
      console.log(response.data)
      //setPatients(response.data)
    }
    fetchdata()
  }, []);

  const [filterText, setFilterText] = useState('');
  const [editingPatient, setEditingPatient] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const columns = [
    {
      name: 'ID',
      selector: 'id',
      sortable: true,
    },
    {
      name: 'Name',
      selector: 'name',
      sortable: true,
    },
    {
      name: 'Age',
      selector: 'age',
      sortable: true,
    },
    {
      name: 'Comments', // New column for comments
      selector: 'comments', // Assuming that your patient data has a 'comments' property
      sortable: true,
    },
    {
      name: 'Actions',
      cell: (row) => (
        <>
          <button onClick={() => handleEditPatient(row)}>Edit</button>
          <button onClick={() => handleDeletePatient(row)}>Delete</button>
        </>
      ),
    },
  ];
  const handleDeletePatient = (patient) => {
    const updatedPatients = patients.filter((p) => p.id !== patient.id);
    setPatients(updatedPatients);
  };

  const handleEditPatient = (patient) => {
    setEditingPatient({ ...patient });
    setIsEditing(true);
  };

  const editPatient = () => {
    // Implement save/edit functionality
    const updatedPatients = patients.map((patient) =>
      patient.id === editingPatient.id ? editingPatient : patient
    );
    setPatients(updatedPatients);
    setIsEditing(false);
  };

  const handleFilterChange = (event) => {
    setFilterText(event.target.value);
  };

  const filteredPatients = patients.filter((patient) => {
    return patient.name.toLowerCase().includes(filterText.toLowerCase());
  });

  return (
    <div>
      <Sidebar />
      <div className="main-content">
      <h1>Doctor Consultations from db</h1>
      <pre>{JSON.stringify(patients, null, 2)}</pre> 
        <h1>Patients</h1>
        <input
          type="text"
          placeholder="Search by Name"
          value={filterText}
          onChange={handleFilterChange}
        />
        <DataTable
          columns={columns}
          data={filteredPatients}
          pagination
          selectableRows
          highlightOnHover
          responsive
        />
        {isEditing && (
          <div className="edit-patient-form">
            <h2>Edit Patient</h2>
            <input
              type="text"
              placeholder="Name"
              value={editingPatient.name}
              onChange={(e) => setEditingPatient({ ...editingPatient, name: e.target.value })}
            />
            <input
              type="number"
              placeholder="Age"
              value={editingPatient.age}
              onChange={(e) => setEditingPatient({ ...editingPatient, age: e.target.value })}
            />
            <input
              type="text"
              placeholder="Comments"
              value={editingPatient.comments}
              onChange={(e) => setEditingPatient({ ...editingPatient, comments: e.target.value })}
            />
            <button onClick={editPatient}>Save</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Patients;
