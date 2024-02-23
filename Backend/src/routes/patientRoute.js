const { Router } = require('express');
const { default: mongoose } = require('mongoose');
const Patient = require('../db/schemas/Patient')

const patientRouter = Router()


// get all patinets
patientRouter.get("/", async (req, res) => {
    try
    {
        const patients = await Patient.find();
        res.json(patients);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching patients' });
    }     
})

// get all patients wrt doctor
patientRouter.get("/doctor/:doctorId", (req, res) => {
    const doctorId = parseInt(req.params.doctorId);
        
    res.send("response sent successfully.")
})

// get patient with id
patientRouter.get("/:id", async (req, res) => {
    try 
    {
        const patientId = req.params.id; 
        if (!mongoose.Types.ObjectId.isValid(patientId)) {
            return res.status(400).json({ error: 'Invalid patient ID' });
          }
        const patient = await Patient.findById(patientId);
        if (patient) {
          res.json(patient);
        } else {
          res.status(404).json({ error: 'Patient not found' });
        }
      } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Error fetching patient' });
      }
})

// get app patinets with certain conditions
patientRouter.get("/conditions", (req, res) => {
    
    res.send("response sent successfully.")
})



// creta a new patient
patientRouter.post('/create', async (req, res) => {
    const {firstName, lastName, gender, email} = req.body;
    const patientDB = await Patient.findOne({ "email": email });
    if (patientDB)
        res.status(400).json({"msg":"Patient already Exists with this email ID"})
    else
    {
        console.log(req.body)
        const newPatient = await Patient.create({firstName, lastName, gender, email});
        newPatient.save();
        console.log(newPatient)
        res.json(newPatient)
    }

})

// Create a new patient
patientRouter.post('/create2', async (req, res) => {
    const {
      firstName,
      lastName,
      userName,
      password,
      gender,
      email,
      bloodgroup,
      age,
      dateOfBirth,
      contactInformation,
      medicalHistory,
      doctors,
      consultations,
    } = req.body;
  
    const patientDB = await Patient.findOne({ email });
  
    if (patientDB) {
      res.status(400).json({ msg: "Patient already exists with this email ID" });
    } else {
      try {
        const newPatient = await Patient.create({
          firstName,
          lastName,
          userName,
          password,
          gender,
          email,
          bloodgroup,
          age,
          dateOfBirth,
          contactInformation,
          medicalHistory,
          doctors,
          consultations,
        });
  
        res.status(201).json(newPatient);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  });

// Login route for patients
patientRouter.post('/login', async (req, res) => {
  const { userName, password } = req.body;

  try {
    const patient = await Patient.findOne({ userName });

    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    // Check if the provided password matches the one in the database
    if (patient.password !== password) {
      return res.status(401).json({ error: 'Incorrect password' });
    }

    // Password matches; you can choose to return the patient object or a success message
    res.status(200).json(patient);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// update patient
// update multiple patients

// delete patient
// delete multiple patients



module.exports = patientRouter;
