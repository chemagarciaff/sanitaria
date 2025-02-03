//Cassette: id, fecha, observaciones, descripción, características, qr_casette, órgano.
const sequelize = require("../db");
const { Model, DataTypes } = require("sequelize");

class Cassette extends Model {}

Cassette.init(
  {
   id_cassette: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fecha_cassette: {
        type: DataTypes.DATE,
        allowNull: false, 
        validate: {
            isDate: true,
        },
    },
    observaciones_cassette: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
            len: {
            args: [1, 100],
            msg: "Las observaciones deben tener entre 1 y 100 caracteres",
            },
        },
    },
    descripcion_cassette: {
      type: DataTypes.STRING(100),
      allowNull: false,
        validate: {
            len: {
            args: [1, 100],
            msg: "La descripción debe tener entre 1 y 100 caracteres",
            },
        },
    },
    caracteristicas_cassette: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          len: {
            args: [1, 100],
            msg: "Las características deben tener entre 1 y 100 caracteres",
          },
        },
      },
    qr_casette : {
        type: DataTypes.STRING,
        allowNull: false,
      },
    organo_cassette: {
        type: DataTypes.STRING(30),
        allowNull: false,
        validate: {
          len: {
            args: [1, 30],
            msg: "El órgano debe tener entre 1 y 30 caracteres",
          },
          },
      },
  },
  { sequelize: sequelize, 
    modelName: "cassettes", 
    timestamps: false,
    freezeTableName: true }
);

module.exports = Cassette;
