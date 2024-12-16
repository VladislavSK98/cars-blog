const express = require('express');
const router = express.Router();
const { auth } = require('../utils');
const { carsController } = require('../controllers');

// Routes for cars
router.get('/', carsController.getAllCars); 
router.post('/api/cars/:carId/like', auth(), carsController.likeCar);
router.get('/user/:userId', carsController.getCarsByUserId);
router.post('/', auth(), carsController.createCar); 
router.put('/:carId', auth(), carsController.editCar); 
router.delete('/:carId', auth(), carsController.deleteCar);
router.post('/:carId/like', auth(), carsController.likeCar); 

module.exports = router;
