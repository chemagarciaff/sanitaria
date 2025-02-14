const  Sequelize  = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize('sanitaria', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
  });

module.exports = sequelize;
