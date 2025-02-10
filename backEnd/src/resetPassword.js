const Usuario = require('./database/models/Usuario');
const enviarCorreo = require('./email');
const crypto = require('crypto');
const argon2 = require('argon2');

const resetPassword = async (email) => {
    try {
        // 1. Buscar si el email existe
        const usuario = await Usuario.findOne({ where: { email_usu: email } });
        if (!usuario) {
            return { success: false, message: "El correo no está registrado" };
        }

        // 2. Generar una nueva contraseña random
        const nuevaPassword = crypto.randomBytes(4).toString('hex');
        const contraseñaHasheada = await argon2.hash(nuevaPassword);

        // 3. Actualizar la BD con la nueva contraseña
        await usuario.update({ password: contraseñaHasheada });

        // 4. Enviar el correo con la nueva contraseña
        const emailEnviado = await enviarCorreo(email, nuevaPassword);
        if (!emailEnviado) {
            return { success: false, message: "No se pudo enviar el correo" };
        }
        return { success: true, message: "Contraseña restablecida. Revisa tu correo.", nuevaContraseña };
    } catch (error) {
        console.error("Error en el proceso de recuperación:", error);
        return { success: false, message: "Error interno" };
    }
};

module.exports = resetPassword;
