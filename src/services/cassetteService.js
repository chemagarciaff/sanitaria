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
  const getCassetesByOrgano = async (id_organo) => {
    try {
      return await Cassette.findAll({
        where:{
            organo_cassette:id_organo,
        }});
    } catch (error) {
      throw new Error("Error al pedir un cassette por organo : " + error.message);
    }
  };
//Obtener un cassette por fecha
  const getCassetesByFecha = async (startDate) => {
    try {
      return await Cassette.findAll({
        where:{
            fecha_cassette:{
                [Op.gte]: startDate,
            },
        }});
    } catch (error) {
      throw new Error("Error al pedir un cassette por fecha : " + error.message);
    }
  };
//Obtener un cassette entre fechas
  const getCassetesBetweenFecha = async (startDate, endDate) => {
    try {
      return await Cassette.findAll({
        where:{
            fecha_cassette:{
                [Op.gte]: startDate,
                [Op.lte]: endDate,
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

module.exports = {
  getAllCassettes,
  getCassettesById,
  getCassettesByUser,
  getCassetesByOrgano,
  getCassetesByFecha,
  getCassetesBetweenFecha,
  createCassette,
  updateCassette,
  deleteCassette,
};
