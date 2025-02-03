const sequelize = require("../db");

const { Model, DataTypes } = require('sequelize');

class Imagen extends Model {}

Imagen.init({
    id_ima: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    imagen: {
        type: DataTypes.BLOB('long'),
        allowNull: false
    }
}, {
    sequelize, modelName: 'imagenes', timestamps: false, freezeTableName: true
})


module.exports = Imagen;