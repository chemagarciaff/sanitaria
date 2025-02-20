const jwt = require("jwt-simple");
const moment = require("moment");
<<<<<<< HEAD
const {verificToken} = require('./../utils/token')

const checkToken = (req, res, next) => {
    const userToken = req.cookies.access_token;

    //Controlamos que existen toke
    if (!userToken) {
      return res.status(401).json({ error: "Falta Token" });
    }
    //Comprobamos si el token es correcto
    const comparacion = verificToken(userToken);

    if (!comparacion) {
      return res.status(401).json({ message: "Token no valido" });
    }
    //Comprobar si token a expirado
    if (comparacion.exp && moment().unix() > comparacion.exp) {
      return res.json({
        error: "La sesión ha expirado, por favor vuelve a iniciar sesión",
      });
    }
    
    req.user = comparacion;
    next();
=======

const checkToken = (req, res, next) => {
  if (!req.headers['user-token']) {
    return res.json({error: "Necesitas inluir el token del usuario"})
  }

  const userToken = req.headers['user-token'];

  let payload = {};
  try {
    payload = jwt.decode(userToken, process.env.JWT_SECRETKEY);
    req.user = payload;
  } catch (error) {
    return res.json({error: "Token incorrecto"})
  } 

  
  if (payload.expiredAt < moment().unix()) {
    return res.json({
      error: "La sesión ha expirado, por favor vuelve a iniciar sesión",
    });
  }

  next();
>>>>>>> 1e3274e21c5c1389ff22b37fafd1015d56c02034
};

module.exports = checkToken ;
