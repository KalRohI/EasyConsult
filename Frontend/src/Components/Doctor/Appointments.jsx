import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar/DoctorSidebar';
import './Appointments.css'; 

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);

  // Simulated data (replace with actual API calls)
  useEffect(() => {
    // Fetch appointments from your API here
    // Example data (replace with actual data retrieval):
    const exampleAppointments = [
      { id: 1, patientName: 'John Doe', appointmentTime: '2023-10-31 10:00 AM' },
      { id: 2, patientName: 'Jane Smith', appointmentTime: '2023-11-01 2:30 PM' },
      // Add more appointment data
    ];

    setAppointments(exampleAppointments);
  }, []);

  return (
    <div>
      <Sidebar />
      <div className="main-content">
        <h2>Appointments</h2>
        <table className="appointment-table">
          <thead>
            <tr>
              <th>Appointment ID</th>
              <th>Patient Name</th>
              <th>Appointment Time</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map(appointment => (
              <tr key={appointment.id}>
                <td>{appointment.id}</td>
                <td>{appointment.patientName}</td>
                <td>{appointment.appointmentTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Appointments;
