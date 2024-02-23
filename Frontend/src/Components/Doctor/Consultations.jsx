import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar/DoctorSidebar';
import './Consultations.css'; 

import ReactDOM from "react-dom";
import QRCode from "react-qr-code";
import axios from 'axios';

const Consultations = () => {
  const [consultations, setConsultations] = useState([]);

  // Simulated data (replace with actual API calls)
  useEffect(() => {
    const fetchdata = async () => {
      const response = await axios.get(`http://localhost:3030/consultation/doctor/${window.localStorage.getItem("doctorID")}`);
      setConsultations(response.data)
    }
    fetchdata()
  }, []);

  const handleCreateConsultaion=()=>{
    // call to create new consultation object
    // http://localhost:3030/consultation/createEmptyConsultation
    var patientQrLink = "QR is invalid please ask Doctor to generate QR again";
    axios.post("http://localhost:3030/consultation/createEmptyConsultation", {
      "doctorId": "653b2aadc1aa1659057e5644",
      "time": "2023-10-25T10:00:00.000Z",
      "isAvailableToJoin": true,
      "isPatientJoined": false,
      "isActive" : true
    })
      .then(res => {
        var consultationID = res.data._id
        patientQrLink = "http://localhost:3000/patient/activeconsultation/" + consultationID;
        console.log(res.data._id)
        ReactDOM.render(<QRCode value={patientQrLink} />, document.getElementById("qr-container"));
        // mukesh - write code here to fetch teh consultation object every 3 seconds and check if "isPatientJoined" property is true or not. 
        // url : http://localhost:3030/consultation/:id here id is consultationID
        // if true "navigate doctor to "/doctor/activeconsultation" page or add one more button to UI upon clciking that we should navigate doctor to "/doctor/activeconsultation" page
      }, err => console.error(err))
    
  }

  const createConsultationsButton=(
    <
      button className='createconsult-button' 
      onClick={handleCreateConsultaion}
    >
    Create Consultation
    </button>
  )

  return (
    <div>
      <Sidebar />
      
      <div className="main-content">
      <h1>Doctor Consultations from db</h1>
      <pre>{JSON.stringify(consultations, null, 2)}</pre> 
        <h2>Consultations</h2>
        <table className="appointment-table">
          <thead>
            <tr>
              <th>Consultations ID</th>
              <th>Patient Name</th>
              <th>Consultations Time</th>
            </tr>
          </thead>
          <tbody>
            {consultations.map(consultation => (
              <tr key={consultation.id}>
                <td>{consultation.id}</td>
                <td>{consultation.patientName}</td>
                <td>{consultation.consultationTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <br/>
        
        <br/>

        {createConsultationsButton}
        <br/>
        <br/>
        <div id='qr-container'></div>
      </div>
  
    </div>
  );
};

export default Consultations;
