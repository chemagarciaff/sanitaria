const sequelize = require("../db");

const { Model, DataTypes } = require('sequelize');

class Usuario extends Model { }

// Usuario (Técnico): id, nombre, apellidos, email, password, centro.

Usuario.init({
    id_usu: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre_usu: {
        type: DataTypes.STRING(30),
        allowNull: false,
        validate: {
            notNull: {
                msg: "El nombre del cliente no puede ser nulo",
            },
            len: {
                args: [1, 30],
                msg: "El nombre del usuario debe tener entre 1 y 30 caracteres",
            },
            isAlpha: {
                args: true,
                msg: "El nombre del usuario solo puede contener letras",
            }
        }
    },
    apellidos_usu: {
        type: DataTypes.STRING(60),
        allowNull: false,
        validate: {
            notNull: {
                msg: "El apellido del usuario no puede ser nulo",
            },
            len: {
                args: [1, 30],
                msg: "El nombre del usuario debe tener entre 1 y 60 caracteres",
            },
            isAlpha: {
                args: true,
                msg: "El nombre del usuario solo puede contener letras",
            }
        }
    },
    email_usu: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
            notNull: {
                msg: "El email del usuario no puede ser nulo",
            },
            isEmail: {
                msg: "El email del usuario no es válido"
            },
            len: {
                args: [1, 100],
                msg: "El email del usuario debe tener entre 1 y 100 caracteres"
            }
        }
    },
    password_usu: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notNull: {
                msg: "La contraseña del usuario no puede ser nullo"
            },
            len: {
                args: [1, 100],
                msg: "La contraseña del usuario debe tener entre 1 y 100 caracteres"
            },
        }
    },
    centro_usu: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notNull: {
                msg: "El centro del usuario no puede ser nulo"
            },
            len: {
                args: [1, 100],
                msg: "El centro del usuario debe tener entre 1 y 100 caracteres"
            }
        }
    },
    rol: {
        type: DataTypes.CHAR(),
        allowNull: false,
        validate: {
            notNull: {
                msg: "El rol del usuario no puede ser nulo"
            },
            len: {
                args: [1, 1],
                msg: "El rol del usuario debe tener 1 caracter"
            }
        }


    }

}, {
    sequelize, modelName: 'usuarios', timestamps: false, freezeTableName: true
})


module.exports = Usuario;