const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const enviarCorreo = async (email, nuevaPassword) => {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Recuperación de contraseña",
            text: `Tu nueva contraseña es: ${nuevaPassword}. Cambiala lo antes posible.`
        });
        return true;
    } catch (error) {
        console.error("Error enviando el correo:", error);
        return false;
    }
};

module.exports = enviarCorreo;
