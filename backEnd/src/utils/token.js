const jwt = require('jsonwebtoken')

//Creacion del token
const createToken = (user) =>{
    return jwt.sign(user,process.env.JWT_SECRET,{
        expiresIn: '24h'
    })    
}

//Verificacion del token
const verificToken = (token) =>{
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        return null
    }
}

module.exports = {createToken, verificToken}
