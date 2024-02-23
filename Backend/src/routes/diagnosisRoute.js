const { Router } = require('express');
const Diagnosis = require('../db/schemas/Diagnosis');

const diagnosisRouter = Router();

// Get all diagnoses
diagnosisRouter.get('/', async (req, res) => {
  try {
    const diagnoses = await Diagnosis.find();
    res.status(200).json(diagnoses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

diagnosisRouter.get('/all', async (req, res) => {
    try {
      const diagnoses = await Diagnosis.find().populate('prescription');
      res.status(200).json(diagnoses);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

// Create a new diagnosis
diagnosisRouter.post('/create', async (req, res) => {
  try {
    const { diseaseName, symptoms, prescription } = req.body;
    
    const newDiagnosis = new Diagnosis({
      diseaseName,
      symptoms,
      prescription,
    });

    const savedDiagnosis = await newDiagnosis.save();
    res.status(201).json(savedDiagnosis);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = diagnosisRouter;
