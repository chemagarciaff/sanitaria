const sequelize = require("../db");
const { Model, DataTypes } = require("sequelize");
//id, fecha, observaciones, descripción, tinción, qr_muestra,
class Muestra extends Model {}
Muestra.init(
  {
    id_muestra: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fecha_muestra: {
        type: DataTypes.DATE,
        allowNull: false, 
        validate: {
            isDate: true,
        },
    },
    observaciones_muestra: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descripcion_muestra: {
        type: DataTypes.STRING(100),
        allowNull: false,
          validate: {
              len: {
              args: [1, 100],
              msg: "La descripción debe tener entre 1 y 100 caracteres",
            },
        },
    },
    tincion_muestra: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          len: {
            args: [1, 100],
            msg: "La tinción debe tener entre 1 y 100 caracteres",
          },
        },
      },
    qr_muestra : {
        type: DataTypes.STRING,
        allowNull: false,
      },
  },
  { sequelize, 
    modelName: "muestras", 
    timestamps: false,
    freezeTableName: true, }
);
module.exports = Muestra;
