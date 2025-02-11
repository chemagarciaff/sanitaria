const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io", // o el servidor que estés utilizando
    port: 587,  // Usar el puerto 587 en lugar del 25
    secure: false, // Desactiva SSL/TLS, si el servidor no lo soporta
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    logger: true // Habilitar logs para depurar
});

const enviarCorreo = async (email_usu, nuevaPassword) => {
    try {
        console.log("Configurando opciones de correo...");
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email_usu,
            subject: "Recuperación de contraseña",
            text: `Tu nueva contraseña es: ${nuevaPassword}. Cámbiala lo antes posible.`
        });
        console.log("Correo enviado exitosamente");
        console.log("EMAIL_USER:", process.env.EMAIL_USER);
        return true;
    } catch (error) {
        console.error("Error enviando el correo:", error);
        return false;
    }
};

module.exports = enviarCorreo;
