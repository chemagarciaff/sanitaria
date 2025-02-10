const usuarioRouter = require("express").Router();
const usuarioController = require("../controllers/usuarioController");
const Usuario = require('./../database/models/Usuario');

usuarioRouter.get("/", usuarioController.getAllUsers);


usuarioRouter.get("/:id", usuarioController.getUserById);


usuarioRouter.get("/email/:email", usuarioController.getUserByEmail);


usuarioRouter.post("/", usuarioController.createUser);


usuarioRouter.post("/logUser", usuarioController.logUser);


usuarioRouter.put("/:id", usuarioController.updateUser);


usuarioRouter.patch("/:id", usuarioController.updateUser);


usuarioRouter.delete("/:id", usuarioController.deleteUser);


usuarioRouter.delete("/", usuarioController.deleteAllUsers);

//Ruta de recuperacion de contraseña
//usuarioRouter.post("/recuperar", usuarioController.recuperarPassword);
usuarioRouter.post("/recuperar", async (req, res) => {
    const { email } = req.body;
    console.log("Correo recibido:", email);

    try {
        const usuario = await Usuario.findOne({ where: { email_usu: email } });
        if (!usuario) {
            return res.status(404).json({ message: "Cliente no encontrado" });
        }
        res.json({ message: "Usuario encontrado", usuario });
    } catch (error) {
        console.error("Error al recuperar usuario:", error);
        res.status(500).json({ message: "Error en el servidor" });
    }
});


module.exports = usuarioRouter;