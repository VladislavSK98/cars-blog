const express = require('express');
const router = express.Router();
const { carsController } = require('../controllers');
const { auth } = require('../utils');

// Създаване на нов автомобил
router.post('/', auth(), carsController.createCar);

// Получаване на всички автомобили на потребителя
router.get('/:userId', auth(), carsController.getUserCars);

// Редактиране на автомобил
router.put('/:carId', auth(), carsController.editCar);

// Изтриване на автомобил
router.delete('/:carId', auth(), carsController.deleteCar);

module.exports = router;
