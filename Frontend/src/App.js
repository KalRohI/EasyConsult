import './App.css';
import Home from './Components/Home/Home';
import Signup from './Components/Signup/Signup';
import DoctorHomePage from './Components/Doctor/Home'; 
import DoctorAppointments from './Components/Doctor/Appointments'; 
import DoctorConsultations from './Components/Doctor/Consultations'; 
import DoctorPatients from './Components/Doctor/Patients'; 
import PatientHomePage from './Components/Patient/Home';
import PatientDoctorDetails from './Components/Patient/DoctorDetails';
import PatientSearchDoctor from './Components/Patient/SearchDoctor';
import PatinetConsultations from './Components/Patient/Consultations';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import PatientActiveConsultation from './Components/Patient/ActiveConsultation';
import DoctorActiveConsultation from './Components/Doctor/ActiveConsultation';

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/doctor" element={<DoctorHomePage />} />
        <Route path="/patient" element={<PatientHomePage />} />
        <Route path="/doctor/appointments" element={<DoctorAppointments />} />
        <Route path="/doctor/consultations" element={<DoctorConsultations />} />
        <Route path="/doctor/patients" element={<DoctorPatients />} />
        <Route path="/doctor/activeconsultation" element={<DoctorActiveConsultation />} />
        <Route path="/doctor/activeconsultation/:id" element={<DoctorActiveConsultation />} />

        <Route path="/patient/doctor/:id" element={<PatientDoctorDetails />} />
        <Route path="/patient/searchdoctor" element={<PatientSearchDoctor />} />
        <Route path="/patient/consultations" element={<PatinetConsultations />} />
        <Route path="/patient/activeconsultation" element={<PatientActiveConsultation />} />
        <Route path="/patient/activeconsultation/:id" element={<PatientActiveConsultation />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
