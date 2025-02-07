const Cassette = require("./models/Cassette")
const Imagen = require("./models/Imagen")
const Muestra = require("./models/Muestra")
const Usuario = require("./models/Usuario")

// Relacion 1 a N
Usuario.hasMany(Cassette, { onDelete: 'cascade'});
Cassette.belongsTo(Usuario);

Cassette.hasMany(Muestra, { onDelete: 'cascade'});
Muestra.belongsTo(Cassette);

Muestra.hasMany(Imagen, { onDelete: 'cascade'});
Imagen.belongsTo(Muestra);
