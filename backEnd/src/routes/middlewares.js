const jwt = require("jwt-simple");
const moment = require("moment");

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
};

module.exports ={ checkToken };