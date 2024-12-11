// restApi/models/index.js

const userModel = require('./userModel');
const tokenBlacklistModel = require('./tokenBlacklistModel');
const themeModel = require('./themeModel');
const postModel = require('./postModel');
const carModel = require('./carModel');  // Импортираме новия модел за автомобилите

module.exports = {
    userModel,
    tokenBlacklistModel,
    themeModel,
    postModel,
    carModel,  // Добавяме модела за автомобили
};
