const Cassette = require("../database/models/Cassette");
const {Op} = require ("sequelize");
// Obtener todos los cassettes
const getAllCassettes = async () => {
  try {
    return await Cassette.findAll();
  } catch (error) {
    throw new Error("Error al pedir todos los cassettes: " + error.message);
  }
};
// Obtener un cassette por ID
const getCassettesById = async (id) => {
  try {
    return await Cassette.findByPk(id);
  } catch (error) {
    throw new Error("Error al pedir un cassette por id: " + error.message);
  }
};
// Obtener un cassette por clave
const getCassettesByClave = async (clave) => {
  try {
    return await Cassette.findOne({
      where: {
        clave_cassette: clave,
      }
    });
  } catch (error) {
    throw new Error("Error al pedir un cassette por id: " + error.message);
  }
};
// Obtener un cassette por Usuario
const getCassettesByUser = async (id_user) => {
    try {
      return await Cassette.findAll({
        where:{
            usuarioIdUsu:id_user,
        }});
    } catch (error) {
      throw new Error("Error al pedir un cassette por id: " + error.message);
    }
  };
//Obtener un cassette por organo
  const getCassettesByOrgano = async (organo) => {
    try {
      return await Cassette.findAll({
        where:{
            organo_cassette: organo,
        }});
    } catch (error) {
      throw new Error("Error al pedir un cassette por organo : " + error.message);
    }
  };
//Obtener un cassette por fecha
  const getCassettesByFecha = async (fecha) => {
    try {
      return await Cassette.findAll({
        where:{
            fecha_cassette:{
                [Op.gte]: fecha,
            },
        }});
    } catch (error) {
      throw new Error("Error al pedir un cassette por fecha : " + error.message);
    }
  };
//Obtener un cassette entre fechas
  const getCassettesBetweenFecha = async (fechaInicio, fechaFin) => {
    try {
      return await Cassette.findAll({
        where:{
            fecha_cassette:{
                [Op.gte]: fechaInicio,
                [Op.lte]: fechaFin,
            },
        }});
    } catch (error) {
      throw new Error("Error al pedir un cassette entre fechas : " + error.message);
    }
  };
// Crear un cassette
const createCassette = async (cassetteData) => {
  try {
    return await Cassette.create(cassetteData);
  } catch (error) {
    throw new Error("Error al crear el cassette: " + error.message);
  }
};
// Actualizar un cassette
const updateCassette = async (id, cassetteData) => {
  try {
    const cassette = await Cassette.findByPk(id);
    if (!cassette) {
      throw new Error("Cassette no encontrado");
    }
    return await cassette.update(cassetteData);
  } catch (error) {
    throw new Error("Error al borrar modificar el cassette: " + error.message);
  }
};
// Borrar un cassette
const deleteCassette = async (id) => {
  try {
    const cassette = await Cassette.findByPk(id);
    if (!cassette) {
      throw new Error("El cassette no existe");
    }
    return await cassette.destroy();
  } catch (error) {
    throw new Error("Error al borrar el cassette: " + error.message);
  }
};

//Elimininar todos los cassettes
const deleteAllCassettes = async () => {
  try {
    return await Cassette.destroy({where:{}});
  } catch (error) {
    throw new Error("Error al borrar todos los cassettes: " + error.message);
  }
};

module.exports = {
  getAllCassettes,
  getCassettesById,
  getCassettesByUser,
  getCassettesByClave,
  getCassettesByOrgano,
  getCassettesByFecha,
  getCassettesBetweenFecha,
  createCassette,
  updateCassette,
  deleteCassette,
  deleteAllCassettes,
};
