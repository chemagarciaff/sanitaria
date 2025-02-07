const  Sequelize  = require('sequelize');

const sequelize = new Sequelize('sanitaria', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
  });

module.exports = sequelize;
