const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

// Създаване на схема за автомобил
const carSchema = new mongoose.Schema({
    make: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    power: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },

    userId: {
        type: ObjectId,
        ref: "User",  // Отнася се към потребителя, който притежава колата
        required: true
    },
    likes: [{
        type: ObjectId,
        ref: "User"  // Отнася се към потребителите, които са харесали автомобила
    }]
}, { timestamps: { createdAt: 'created_at' } });  // Автоматично ще добавя полета за създаване и актуализиране

// Създаване на модел за автомобил
const Car = mongoose.model('Car', carSchema);

module.exports = Car;
