import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar/PatientSidebar';
import axios from 'axios';

const Consultations = () => {
  const [consultations, setConsultations] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to fetch data
    const fetchData = async () => {
      try {
        // Make a GET request using Axios
        var patientID = window.localStorage.getItem("patientID");
        console.log(patientID)

        const response = await axios.get('http://localhost:3030/consultation/patient/' + patientID);
        // Set the fetched data in the state
        setConsultations(response.data);
      } catch (error) {
        // Set error state if there is an issue with the fetch
        setError(error);
      } finally {
        // Set loading state to false once the fetch is complete
        setLoading(false);
      }
    };

    // Call the fetch function
    fetchData();
  }, []);
  return (
    <div>
        <Sidebar/>
        <div className='main-content'>
            Welcome to Your Consultations
            <h1>Fetched Data</h1>
            <pre>{JSON.stringify(consultations, null, 2)}</pre>
        </div>
    </div>
  )
}



export default Consultations;