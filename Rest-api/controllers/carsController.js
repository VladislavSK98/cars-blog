const { carModel, userModel } = require('../models');

// Добавяне на нов автомобил
function addCar(req, res, next) {
    const { _id: userId } = req.user;
    const { make, model, year, power } = req.body;

    carModel.create({ make, model, year, power, userId })
        .then(car => {
            return userModel.updateOne(
                { _id: userId },
                { $push: { cars: car._id } }
            ).then(() => res.status(201).json(car));
        })
        .catch(next);
}

// Извличане на всички автомобили на потребител
function getCars(req, res, next) {
    const { userId } = req.params;

    carModel.find({ userId })
        .then(cars => res.status(200).json(cars))
        .catch(next);
}

// Редактиране на автомобил
function editCar(req, res, next) {
    const { carId } = req.params;
    const { _id: userId } = req.user;
    const { make, model, year, power } = req.body;

    carModel.findOneAndUpdate(
        { _id: carId, userId },
        { make, model, year, power },
        { new: true }
    )
        .then(updatedCar => {
            if (updatedCar) {
                res.status(200).json(updatedCar);
            } else {
                res.status(401).json({ message: 'Not allowed!' });
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
                return userModel.updateOne(
                    { _id: userId },
                    { $pull: { cars: carId } }
                ).then(() => res.status(200).json(deletedCar));
            } else {
                res.status(401).json({ message: 'Not allowed!' });
            }
        })
        .catch(next);
}

// Харесване на автомобил
function likeCar(req, res, next) {
    const { carId } = req.params;
    const { _id: userId } = req.user;

    carModel.updateOne(
        { _id: carId },
        { $addToSet: { likes: userId } },
        { new: true }
    )
        .then(() => res.status(200).json({ message: 'Car liked successfully!' }))
        .catch(next);
}

module.exports = {
    addCar,
    getCars,
    editCar,
    deleteCar,
    likeCar,
};
