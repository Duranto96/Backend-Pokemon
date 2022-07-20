const listaPokemones = require("../models/listaPokemon");

exports.getCategorias = (req, res) => {
  const { nombre } = req.params;

  const { categoria } = listaPokemones.find(
    (pokemon) => pokemon.nombre.toLowerCase() === nombre.toLowerCase()
  );

  res.send(categoria);
};
