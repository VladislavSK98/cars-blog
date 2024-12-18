const { userModel, carModel } = require('../models');

function newCar(make, model, year, userId, power, color, imageUrl) {
    return carModel.create({ make, model, year, userId, power, color, imageUrl })
        .then(car => {
            return userModel.updateOne(
                { _id: userId },
                { $push: { cars: car._id } }
            ).then(() => car);
        });
}

function getCarsByUserId(req, res, next) {
    const { userId } = req.params;  
    carModel.find({ userId })
        .populate('userId', 'username')  
        .then(cars => res.status(200).json(cars))
        .catch(next);
}

function getAllCars(req, res, next) {
    carModel.find()
        .populate('userId', 'username') 
        .then(cars => 
            {
                const carsWithLikes = cars.map(car => ({
                    ...car.toObject(),
                    likesCount: car.likes.length, 
                }));
                res.status(200).json(carsWithLikes);
            })
            .catch(next);
            
}

function createCar(req, res, next) {
    const { _id: userId } = req.user;
    const { make, model, year, power, color, imageUrl } = req.body;  

    newCar(make, model, year, userId, power, color, imageUrl)  
        .then(car => res.status(201).json(car))
        .catch(next);
}

function editCar(req, res, next) {
    const { carId } = req.params;
    const { make, model, year, power, color, imageUrl } = req.body;
    const { _id: userId } = req.user;

    carModel.findOneAndUpdate(
        { _id: carId, userId },
        { make, model, year, power, color, imageUrl },
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
                res.status(200).json({ message: 'Car deleted successfully!' });
            } else {
                res.status(401).json({ message: 'Not allowed!' });
            }
        })
        .catch(next);
}

function getCarDetails(req, res, next) {
    const { carId } = req.params;

    carModel.findById(carId)  
        .then(car => {
            if (car) {
                
                const carWithLikes = {
                    ...car.toObject(),
                    likesCount: car.likes.length,  
                };

                res.status(200).json(carWithLikes);  
            } else {
                res.status(404).json({ message: 'Car not found' });
            }
        })
        .catch(next);
}


function likeCar(req, res, next) {
    const { carId } = req.params; 
    const { _id: userId } = req.user; 
  
    carModel.updateOne(
      { _id: carId },
      { $addToSet: { likes: userId } } 
    )
    .then(() => res.status(200).json({ message: 'Car liked successfully!' }))
    .catch(next); 
  }

module.exports = {
    getAllCars,
    newCar,
    createCar,
    editCar,
    deleteCar,
    likeCar,
    getCarsByUserId,
    getCarDetails,
};