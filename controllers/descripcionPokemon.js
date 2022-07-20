const listaPokemones = require("../models/listaPokemon");
// const pokemones = require("../models/listaPokemon");
exports.getDescripcion = (req, res) => {
  const { nombre } = req.params;
  //   res.send(nombre);

  const { about } = listaPokemones.find(
    (pokemon) => pokemon.nombre.toLowerCase() === nombre.toLowerCase()
  );

  res.send(about.descripcion);
};
