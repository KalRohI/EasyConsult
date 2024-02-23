const { Router } = require('express');
const Doctor = require('../db/schemas/Doctor');
const Consultation = require('../db/schemas/Consultation'); 
const Patient = require('../db/schemas/Patient'); 

const doctorRouter = Router();

// Get all doctors
doctorRouter.get('/', async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.status(200).json(doctors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get a doctor by ID
doctorRouter.get('/:id', async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }
    res.status(200).json(doctor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get doctors associated with a patient by patient ID
doctorRouter.get('/patient/:patientId', async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.patientId);
    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    const doctors = await Doctor.find({ patients: patient._id });
    res.status(200).json(doctors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get doctors associated with a consultation by consultation ID
doctorRouter.get('/consultation/:consultationId', async (req, res) => {
  try {
    const consultation = await Consultation.findById(req.params.consultationId);
    if (!consultation) {
      return res.status(404).json({ error: 'Consultation not found' });
    }

    const doctor = await Doctor.findById(consultation.doctorId);
    res.status(200).json(doctor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Create a new doctor
doctorRouter.post('/create', async (req, res) => {
  try {
    const { firstName, lastName,userName,password, designation, department, degree, age, bloodgroup } = req.body;

    const newDoctor = new Doctor({
      firstName,
      lastName,
      userName,
      password,
      designation,
      department,
      degree,
      age,
      bloodgroup,
    });

    const savedDoctor = await newDoctor.save();
    res.status(201).json(savedDoctor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a doctor by ID
doctorRouter.delete('/:id', async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndRemove(req.params.id);
    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update a doctor by ID
doctorRouter.put('/:id', async (req, res) => {
  try {
    const { firstname, lastname, designation, department, degree, age, bloodgroup } = req.body;

    const updatedDoctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      {
        firstname,
        lastname,
        designation,
        department,
        degree,
        age,
        bloodgroup,
      },
      { new: true }
    );

    if (!updatedDoctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }

    res.status(200).json(updatedDoctor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

doctorRouter.post('/login', async (req, res) => {
  const { userName, password } = req.body;

  try {
    const doctor = await Doctor.findOne({ userName });

    if (!doctor) {
      return res.status(404).json({ error: 'doctor not found' });
    }

    // Check if the provided password matches the one in the database
    if (doctor.password !== password) {
      return res.status(401).json({ error: 'Incorrect password' });
    }

    // Password matches; you can choose to return the doctor object or a success message
    res.status(200).json(doctor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = doctorRouter;
