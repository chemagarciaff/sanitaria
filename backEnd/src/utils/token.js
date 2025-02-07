const jwt = require('jsonwebtoken')
const secretKey = "esta-es-la-varible-de-la-palabra-secreta-del-token";

const createToken = (req,res,next) =>{
    const user = req.user;
    const payload = {userId: user._id, userName: user._name}
    const token = jwt.sign(payload,secretKey,{
        expiresIn: '24h'
    })
}

module.exports = createToken
