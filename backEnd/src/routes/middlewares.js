const jwt = require("jsonwebtoken");
const moment = require("moment");
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
};

module.exports = checkToken ;
