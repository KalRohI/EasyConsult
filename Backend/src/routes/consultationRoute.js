const { Router } = require('express');
const Consultation = require('../db/schemas/Consultation');
const Patient = require('../db/schemas/Patient');
const Doctor = require('../db/schemas/Doctor');

const consultationRouter = Router();

// Get all consultations
consultationRouter.get('/', async (req, res) => {
  try {
    const consultations = await Consultation.find();
    res.status(200).json(consultations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

consultationRouter.get('/all', async (req, res) => {
  try {
    const consultations = await Consultation.find()
      .populate('patientId') // Populate the 'patient' property with the patient object
      .populate('doctorId'); // Populate the 'doctor' property with the doctor object

    res.status(200).json(consultations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get all consultations with a specific patient ID
consultationRouter.get('/patient/:patientId', async (req, res) => {
  try {
    const consultations = await Consultation.find({ patientId: req.params.patientId });
    res.status(200).json(consultations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get all consultations with a specific doctor ID
consultationRouter.get('/doctor/:doctorId', async (req, res) => {
  try {
    const consultations = await Consultation.find({ doctorId: req.params.doctorId });
    res.status(200).json(consultations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get all consultations with a specific patient and doctor ID
consultationRouter.get('/patient/:patientId/doctor/:doctorId', async (req, res) => {
  try {
    const consultations = await Consultation.find({
      patientId: req.params.patientId,
      doctorId: req.params.doctorId,
    });
    res.status(200).json(consultations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get a consultation by ID
consultationRouter.get('/:id', async (req, res) => {
  try {
    const consultation = await Consultation.findById(req.params.id);
    if (!consultation) {
      return res.status(404).json({ error: 'Consultation not found' });
    }
    res.status(200).json(consultation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Create a new consultation
consultationRouter.post('/create', async (req, res) => {
  try {
    const { patientId, doctorId, time, diagnosis, isAvailableToJoin, isPatientJoined, isActive } = req.body;

    const newConsultation = new Consultation({
      patientId,
      doctorId,
      time,
      diagnosis,
      isAvailableToJoin,
      isPatientJoined,
      isActive
    });

    const savedConsultation = await newConsultation.save();
    res.status(201).json(savedConsultation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Create empty consultation with doctor ID
consultationRouter.post('/createEmptyConsultation', async (req, res) => {
  try {
    const { doctorId, time, isAvailableToJoin, isPatientJoined, isActive } = req.body;

    const newConsultation = new Consultation({
      doctorId,
      time,
      isAvailableToJoin,
      isPatientJoined,
      isActive
    });

    const savedConsultation = await newConsultation.save();
    res.status(201).json(savedConsultation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a consultation by ID
consultationRouter.delete('/:id', async (req, res) => {
  try {
    const consultation = await Consultation.findByIdAndRemove(req.params.id);
    if (!consultation) {
      return res.status(404).json({ error: 'Consultation not found' });
    }
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update a consultation by ID
consultationRouter.put('/:id', async (req, res) => {
  try {
    const consultationId = req.params.id;
    console.log(req.body)
    console.log(req.body.patientId)
    const updatedFields = {};
    if (req.body.patientId) {
      updatedFields.patientId = req.body.patientId;
    }
    if (req.body.doctorId) {
      updatedFields.doctorId = req.body.doctorId;
    }
    if (req.body.isAvailableToJoin) {
      updatedFields.isAvailableToJoin = req.body.isAvailableToJoin;
    }
    if (req.body.isPatientJoined) {
      updatedFields.isPatientJoined = req.body.isPatientJoined;
    }
    if (req.body.isActive) {
      updatedFields.isActive = req.body.isActive;
    }
    if (req.body.time) {
      updatedFields.time = req.body.time;
    }
    if (req.body.diagnosis) {
      updatedFields.diagnosis = req.body.diagnosis;
    }

    const updatedConsultation = await Consultation.findByIdAndUpdate(
      consultationId,
      { $set: updatedFields },
      { new: true }
    );

    if (!updatedConsultation) {
      return res.status(404).json({ error: 'Consultation not found' });
    }
    //console.log(updatedConsultation)
    res.status(200).json(updatedConsultation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = consultationRouter;
