const { Router } = require('express');
const Prescription = require('../db/schemas/Prescription');

const prescriptionRouter = Router();

// Get all prescriptions
prescriptionRouter.get('/', async (req, res) => {
  try {
    const prescriptions = await Prescription.find();
    res.status(200).json(prescriptions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Create a new prescription
prescriptionRouter.post('/create', async (req, res) => {
  try {
    const { name, notes, isMedication, isActivity, numberOfDays, dosage, when } = req.body;

    const newPrescription = new Prescription({
      name,
      notes,
      isMedication,
      isActivity,
      numberOfDays,
      dosage,
      when,
    });

    const savedPrescription = await newPrescription.save();
    res.status(201).json(savedPrescription);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Create multiple prescriptions
prescriptionRouter.post('/createmany', async (req, res) => {
    try {
      const prescriptionsData = req.body; // Array of prescription objects
  
      // Create an array to store the saved prescriptions
      const savedPrescriptions = [];
  
      for (const prescriptionData of prescriptionsData) {
        const { name, notes, isMedication, isActivity, numberOfDays, dosage, when } = prescriptionData;
  
        const newPrescription = new Prescription({
          name,
          notes,
          isMedication,
          isActivity,
          numberOfDays,
          dosage,
          when,
        });
  
        const savedPrescription = await newPrescription.save();
        savedPrescriptions.push(savedPrescription);
      }
  
      res.status(201).json(savedPrescriptions);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

module.exports = prescriptionRouter;
