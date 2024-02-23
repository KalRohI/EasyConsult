import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar/DoctorSidebar';
import { Link } from 'react-router-dom';
import './Home.css'; 
import axios from 'axios';

const DoctorHomePage = () => {
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [consultations, setConsultations] = useState([]);
  const [doctor, setDoctor] = useState();

      // State to track loading state
      const [loading, setLoading] = useState(true);
      // State to track errors, if any
      const [error, setError] = useState(null);

  // Simulated data (replace with actual API calls)
  useEffect(() => {
    const fetchdata = async () => {
      try
      {
        var doctorResponse = await axios.get(`http://localhost:3030/doctor/${window.localStorage.getItem("doctorID")}`);
        setDoctor(await doctorResponse.data)
  
        var doctorConsultations = await axios.get(`http://localhost:3030/consultation/doctor/${window.localStorage.getItem("doctorID")}`);
        setConsultations(await doctorConsultations.data)
  
        var doctorPatients = await axios.get(`http://localhost:3030/patient/doctor/${window.localStorage.getItem("doctorID")}`);
        setPatients(doctorPatients.data)
        
        console.log(doctor)
        console.log(patients)
        console.log(consultations)
        
      }
      catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }

    }
    fetchdata()
  }, []);

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
    <div>
      <Sidebar />
      <div className='main-content'>
        <h1>Dashboard</h1>
        
        Display Appointments
        {/* <AppointmentsList appointments={appointments} />

        <PatientsList patients={patients} /> */}
      </div>
    </div>
  );
};

// const AppointmentsList = ({ appointments }) => {
//   return (
//     <div>
//       <h2>Upcoming Appointments</h2>
//       <ul className="appointment-list">
//         {appointments.map(appointment => (
//           <li key={appointment.id}>
//             {appointment.patientName} - {appointment.appointmentTime}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// const PatientsList = ({ patients }) => {
//   return (
//     <div>
//       <h2>Patients List</h2>
//       <ul className="patients-list">
//         {patients.map(patient => (
//           <li key={patient.id}>
//             <Link to={`/doctor/patients/${patient.id}`}>{patient.name}</Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

export default DoctorHomePage;
