const jwt = require('jsonwebtoken')
const secretKey = "esta-es-la-varible-de-la-palabra-secreta-del-token";

const createToken = (user) =>{
    const payload = {userId: user.id, userName: user.name}
    const token = jwt.sign(payload,secretKey,{
        expiresIn: '24h'
    })
    return token;
}

module.exports = {createToken,secretKey}
