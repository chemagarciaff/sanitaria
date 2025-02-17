const jwt = require("jsonwebtoken");
const moment = require("moment");
const token = require('./../utils/token')

const checkToken = (req, res, next) => {
  try {
    const userToken = req.header;
    let payload = {};

    //Controlamos que existen toke
    if (!userToken) {
      return res.satus(401).json({ error: "Falta Token" });
    }
    //Comprobamos si el token es correcto
    payload = jwt.verify(userToken,token.secretKey);
    
    req.user = jwt.decode.user;
    next();
    if (payload.expiredAt < moment().unix()) {
      return res.json({
        error: "La sesión ha expirado, por favor vuelve a iniciar sesión",
      });
    }
  } catch (error) {
    // res.satus(401).json({message: "Token incorrecto"})
  }
};

module.exports = checkToken ;
