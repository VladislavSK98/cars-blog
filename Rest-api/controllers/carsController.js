const { carModel } = require('../models/carModel');
const { userModel } = require('../models/userModel');

// Създаване на нов автомобил
function createCar(req, res, next) {
    const { userId, make, model, year, power } = req.body;

    carModel.create({ userId, make, model, year, power })
        .then(car => {
            return userModel.findByIdAndUpdate(
                userId, 
                { $push: { cars: car._id } },
                { new: true }
            );
        })
        .then(updatedUser => res.status(201).json(updatedUser))
        .catch(next);
}

// Получаване на всички автомобили на потребител
function getUserCars(req, res, next) {
    const { userId } = req.params;

    console.log('Request received for userId:', userId);

    carModel.find({ userId })
        .then(cars => res.status(200).json(cars))
        .catch(next);
}

// Редактиране на автомобил
function editCar(req, res, next) {
    const { carId } = req.params;
    const { make, model, year, power } = req.body;
    const { _id: userId } = req.user;

    carModel.findOneAndUpdate({ _id: carId, userId }, { make, model, year, power }, { new: true })
        .then(updatedCar => {
            if (updatedCar) {
                res.status(200).json(updatedCar);
            } else {
                res.status(401).json({ message: 'Not allowed to edit this car!' });
            }
        })
        .catch(next);
}

// Изтриване на автомобил
function deleteCar(req, res, next) {
    const { carId } = req.params;
    const { _id: userId } = req.user;

    carModel.findOneAndDelete({ _id: carId, userId })
        .then(deletedCar => {
            if (deletedCar) {
                res.status(200).json(deletedCar);
            } else {
                res.status(401).json({ message: 'Not allowed to delete this car!' });
            }
        })
        .catch(next);
}

module.exports = {
    createCar,
    getUserCars,
    editCar,
    deleteCar,
};
