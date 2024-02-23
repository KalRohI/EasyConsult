import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar/PatientSidebar';
import DataTable from 'react-data-table-component';
import './Home.css';
import axios from 'axios';

const PatientDashboard = () => {

  const [consultations, setConsultations] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [patient, setPatient] = useState(null);

    // State to track loading state
    const [loading, setLoading] = useState(true);
    // State to track errors, if any
    const [error, setError] = useState(null);

  useEffect(() => {

    const fetchdata = async () => {
      // fetching patient details
      const patientResponse = await axios.get(`http://localhost:3030/patient/${window.localStorage.getItem("patientID")}`);
      console.log("patient"+patientResponse.data)
      await setPatient(patientResponse.data)
      const patientConsultations = await axios.get(`http://localhost:3030/consultation/patient/${window.localStorage.getItem("patientID")}`);
      await setConsultations(patientConsultations.data)
      const patientDoctors = await axios.get(`http://localhost:3030/doctor/patient/${window.localStorage.getItem("patientID")}`);
      console.log(patientDoctors.data)
      await setDoctors(patientDoctors.data)
      console.log(doctors)
      console.log(patient)
      console.log(consultations) 
      // fetch doctors who consulted this patient
    }
    fetchdata() 
  }, []);
  const [appointments, setAppointments] = useState([
    { id: 1, name: 'Appointment 1', date: '2023-11-01' },
    { id: 2, name: 'Appointment 2', date: '2023-11-15' },
  ]);

  const [medicalRecords, setMedicalRecords] = useState([
    { id: 1, name: 'Record 1', date: '2023-10-15', file: 'record1.pdf' },
    { id: 2, name: 'Record 2', date: '2023-10-30', file: 'record2.pdf' },
  ]);

  const [editingAppointment, setEditingAppointment] = useState(null);

  const columnsAppointments = [
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
      name: 'Date',
      selector: 'date',
      sortable: true,
    },
    {
      name: 'Actions',
      cell: (row) => (
        <>
          <button onClick={() => handleEditAppointment(row)}>Edit</button>
          <button onClick={() => handleDeleteAppointment(row)}>Delete</button>
        </>
      ),
    },
  ];

  const columnsMedicalRecords = [
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
      name: 'Date',
      selector: 'date',
      sortable: true,
    },
    {
      name: 'File',
      cell: (row) => (
        <a href={row.file} download={row.file}>
          Download
        </a>
      ),
    },
  ];

  const handleDeleteAppointment = (appointment) => {
    const updatedAppointments = appointments.filter((a) => a.id !== appointment.id);
    setAppointments(updatedAppointments);
  };

  const handleEditAppointment = (appointment) => {
    setEditingAppointment({ ...appointment });
  };

  const saveEditedAppointment = () => {
    const updatedAppointments = appointments.map((a) =>
      a.id === editingAppointment.id ? editingAppointment : a
    );
    setAppointments(updatedAppointments);
    setEditingAppointment(null); // Clear the editing state
  };

  if (loading) {
    return <p>Loading...</p>;
  }


  if (error) {
    return (
        <div>
            <Sidebar></Sidebar>
            <div className='main-content'>
                <h1>{error.message}</h1>
            </div>
    
        </div>
      );
  }

  return (
    <div className="patient-dashboard">
      <Sidebar />
      <div className="main-content">
        <h1>Welcome to the Patient Dashboard</h1>
        <h2>Your Appointments</h2>
        <DataTable columns={columnsAppointments} data={appointments} />
        {editingAppointment && (
          <div className="edit-appointment-form">
            <h3>Edit Appointment</h3>
            <input
              type="text"
              placeholder="Name"
              value={editingAppointment.name}
              onChange={(e) =>
                setEditingAppointment({ ...editingAppointment, name: e.target.value })
              }
            />
            <input
              type="date"
              value={editingAppointment.date}
              onChange={(e) =>
                setEditingAppointment({ ...editingAppointment, date: e.target.value })
              }
            />
            <button onClick={saveEditedAppointment}>Save</button>
            <button onClick={() => setEditingAppointment(null)}>Cancel</button>
          </div>
        )}
        <h2>Your Medical Records</h2>
        <DataTable columns={columnsMedicalRecords} data={medicalRecords} />
      </div>
    </div>
  );
};

export default PatientDashboard;
