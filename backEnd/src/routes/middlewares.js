const jwt = require("jsonwebtoken");
const moment = require("moment");
const token = require('./../utils/token')

const checkToken = (req, res, next) => {
  const userToken = req.cookies.access_token;
  let payload = {};

  if (!userToken) {
    return res.json({ error: "Falta Token" });
  }

  try {
    payload = jwt.verify(userToken,token.secretKey);
  } catch (error) {
    return res.json({ error: "Token incorrecto" });
  }

  if (payload.expiredAt < moment().unix()) {
    return res.json({
      error: "La sesión ha expirado, por favor vuelve a iniciar sesión",
    });
  }
  next();
};

module.exports = { checkToken };
