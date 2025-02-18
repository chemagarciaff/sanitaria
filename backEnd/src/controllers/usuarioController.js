const usuarioService = require("../services/usuarioService");
const argon2 = require("argon2");
const jwt = require("jwt-simple");
// const generarToken = require("../utils/token");
// const createToken = require("../utils/token");
const { Usuario } = require('./../database/models/Usuario');


// Obtener todos los usuarios
const getAllUsers = async (req, res) => {
  try {
    console.log(req.usuarioId);
    
    const users = await usuarioService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un usuario por ID
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await usuarioService.getUserById(id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "Cliente no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un usuario por ID
const getUserByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await usuarioService.getUserByEmail(email);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "Usuario no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Obtener todos los usuarios
const getUsersByRol = async (req, res) => {
  try {
    const users = await usuarioService.getUsersByRol();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear un nuevo usuario
const createUser = async (req, res) => {
  try {
    const body = req.body;

    const contraseñaHasheada = await argon2.hash(body.password_usu);

    const userData = {
      ...body,  // Copiar todo el contenido de body
      password_usu: contraseñaHasheada,  // Cambiar solo la propiedad 'password_usu'
    };

    const createdUser = await usuarioService.createUser(userData);

    res.status(200).json(createdUser);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Logear un usuario 
const logUser = async (req, res) => {
  try {
    const { email_usu, password_usu } = req.body;
    const user = await usuarioService.getUserByEmail(email_usu);
    console.log("Usuario encontrado:", user);
    if(!user) return res.status(404).json({ message: "El email no esta registrado"});
    const contraseñaCorrecta = await argon2.verify(user.password_usu, password_usu);
    if (contraseñaCorrecta) {
      res.json({success : createToken(user)})
      
      return res.status(200).json({ message: 'Loggin correcto', rol: user.rol });
    } else {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error al iniciar sesión', error: error.message });
  }
};

//Crear token
const createToken = (user) =>{
    const payload = {userId: user.id, userName: user.name}
    postTokenLocalStorage(payload,process.env.JWT_SECRETKEY)
    return jwt.encode(payload,process.env.JWT_SECRETKEY)
}
//Pasar el token al localStorage
const postTokenLocalStorage = (token) =>{
  const arrayLocal = JSON.parse(localStorage.getItem('token')) || [];
  arrayLocal.push(token);
  localStorage.setItem('token', JSON.stringify(arrayLocal));
}
// Actualizar un usuario existente
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;

    const updatedUser = await usuarioService.updateUser(id, body);

    if (updatedUser) {
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ message: "Cliente no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un cliente
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await usuarioService.deleteUser(id);

    if (deletedUser) {
      res.status(200).json({ message: "Usuario eliminado" });
    } else {
      res.status(404).json({ message: "Usuario no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un Usuario
const deleteAllUsers = async (req, res) => {
  try {

    const deletedUsers = await usuarioService.deleteAllUsers();

    if (deletedUsers) {
      res.status(204).json({ message: "Usuarios eliminados" });
    } else {
      res.status(404).json({ message: "Usuarios no encontrados" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Recuperar contraseña de usuario existente
const recuperarPassword = async (req, res) => {
  try {
    console.log("Solicitud recibida en /recuperar");
    console.log("Cuerpo de la petición:", req.body);

const email_usu = req.body.email_usu; // Extrae el email correctamente
console.log("Email recibido:", email_usu);

    const user = await usuarioService.getUserByEmail(email_usu);
    if (user) {
      console.log(user.email_usu);
      console.log(user.id_usu);
      const result = await usuarioService.recuperarPassword(user);
      console.log(result.message);
      res.json(result); // Esto devuelve la respuesta al frontend
    } else {
      res.status(404).json({ message: "Usuario no encontrado" });
    }
  } catch (error) {
    console.error("Error en el servidor:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};
// Middleware para verificar si el usuario es administrador
const isAdmin = (req, res, next) => {
  if (req.user && req.user.rol === 'A') {
    next();
  } else {
    res.status(403).json({ message: "Acceso denegado" });
  }
};

// Cambiar el rol de un usuario
const changeUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { rol } = req.body;

    if (rol !== 'A' && rol !== 'T') {
      return res.status(400).json({ message: "Rol no válido" });
    }

    const updatedUser = await usuarioService.updateUser(id, { rol });

    if (updatedUser) {
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ message: "Usuario no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un usuario (solo admin)
const deleteUserByAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await usuarioService.getUserById(id);

    if (user.rol === 'A') {
      return res.status(403).json({ message: "No se puede eliminar a otro administrador" });
    }

    const deletedUser = await usuarioService.deleteUser(id);

    if (deletedUser) {
      res.status(200).json({ message: "Usuario eliminado" });
    } else {
      res.status(404).json({ message: "Usuario no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  getUserByEmail,
  createUser,
  logUser,
  updateUser,
  deleteUser,
  deleteAllUsers,
  recuperarPassword,
  isAdmin,
  changeUserRole,
  deleteUserByAdmin,
  getUsersByRol
};

