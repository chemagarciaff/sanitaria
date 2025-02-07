const jwt = require("jwt-simple");
const moment = require("moment")

const checkToken = (req, res, next) => {
  const userToken = req.headers["user-token"];
  let payload = {};

  if (!userToken) {
    return res.json({ error: "Falta Token" });
  }

  try {
    payload = jwt.decode(userToken, "frase para probar .env");
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
