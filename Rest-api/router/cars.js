// restApi/router/cars.js

const router = require('express').Router();
const { carModel } = require('../models');

// Добавяне на нов автомобил за потребител
router.post('/:userId', async (req, res) => {
  const { make, model, year, power } = req.body;
  const { userId } = req.params;  // Вземаме userId от URL

  try {
    const newCar = new carModel({ make, model, year, power, userId });
    await newCar.save();
    res.status(201).json(newCar);
  } catch (err) {
    res.status(500).json({ message: "Error adding car", error: err });
  }
});

// Получаване на всички автомобили за даден потребител
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;  // Вземаме userId от URL

  try {
    const cars = await carModel.find({ userId });
    res.status(200).json(cars);
  } catch (err) {
    res.status(500).json({ message: "Error fetching cars", error: err });
  }
});

module.exports = router;
