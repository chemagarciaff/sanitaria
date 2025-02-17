const jwt = require('jsonwebtoken')
const {JWT_SECRET} = process.env;

//Creacion del token
const createToken = (user) =>{
    return jwt.sign({user},JWT_SECRET,{
        expiresIn: '24h'
    })    
}

//Verificacion del token
const verificToken = (token) =>{
    try {
        const comparacion = jwt.verify(token, JWT_SECRET);
        return comparacion;
    } catch (error) {
        return null
    }
}

module.exports = {createToken, verificToken}
