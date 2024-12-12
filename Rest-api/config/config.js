const env = process.env.NODE_ENV || 'development';

const config = {
  development: {
    port: process.env.PORT || 3000,
    dbURL: 'mongodb://localhost:27017/forum', // Местна MongoDB база
    origin: ['http://localhost:5555', 'http://localhost:4200'], // Локални адреси за CORS
  },
  production: {
    port: process.env.PORT || 3000,
    dbURL: process.env.DB_URL_CREDENTIALS, // Променлива за MongoDB URL в продукция
    origin: ['https://your-frontend.com'], // Домейни, които са разрешени да правят заявки
  },
};

module.exports = config[env];
