const { userModel, carModel } = require('../models');

function newCar(make, model, year, userId, power, color) {
    return carModel.create({ make, model, year, userId, power, color })
        .then(car => {
            return userModel.updateOne(
                { _id: userId },
                { $push: { cars: car._id } }
            ).then(() => car);
        });
}

function getCarsByUserId(req, res, next) {
    const { userId } = req.params;  // Извличаме userId от URL
    carModel.find({ userId })
        .populate('userId', 'username')  // Попълваме потребителското име, ако е необходимо
        .then(cars => res.status(200).json(cars))
        .catch(next);
}

function getAllCars(req, res, next) {
    carModel.find()
        .populate('userId', 'username') // Попълване на информация за потребителя, ако е необходимо
        .then(cars => res.status(200).json(cars))
        .catch(next);
}

function createCar(req, res, next) {
    const { _id: userId } = req.user;
    const { make, model, year, power, color } = req.body;

    newCar(make, model, year, userId, power, color)
        .then(car => res.status(201).json(car))
        .catch(next);
}

function editCar(req, res, next) {
    const { carId } = req.params;
    const { make, model, year, power, color } = req.body;
    const { _id: userId } = req.user;

    carModel.findOneAndUpdate(
        { _id: carId, userId },
        { make, model, year, power, color },
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

function deleteCar(req, res, next) {
    const { carId } = req.params;
    const { _id: userId } = req.user;

    Promise.all([
        carModel.findOneAndDelete({ _id: carId, userId }),
        userModel.updateOne({ _id: userId }, { $pull: { cars: carId } })
    ])
        .then(([deletedCar]) => {
            if (deletedCar) {
                res.status(200).json(deletedCar);
            } else {
                res.status(401).json({ message: 'Not allowed!' });
            }
        })
        .catch(next);
}

// function likeCar(req, res, next) {
//     const { carId } = req.params;
//     const { _id: userId } = req.user;

//     carModel.updateOne(
//         { _id: carId },
//         { $addToSet: { likes: userId } },
//         { new: true }
//     )
//         .then(() => res.status(200).json({ message: 'Car liked successfully!' }))
//         .catch(next);
// }

function likeCar(req, res, next) {
    const { carId } = req.params; // Вземаме carId от параметрите
    const { _id: userId } = req.user; // Вземаме userId от аутентикирания потребител
  
    // Извършваме актуализация на колата с добавяне на userId към likes масива
    carModel.updateOne(
      { _id: carId },
      { $addToSet: { likes: userId } } // $addToSet добавя потребителя в likes само ако не е вече там
    )
    .then(() => res.status(200).json({ message: 'Car liked successfully!' }))
    .catch(next); // При грешка изпращаме към следващото middleware (например за обработка на грешки)
  }

module.exports = {
    getAllCars,
    newCar,
    createCar,
    editCar,
    deleteCar,
    likeCar,
    getCarsByUserId,
};