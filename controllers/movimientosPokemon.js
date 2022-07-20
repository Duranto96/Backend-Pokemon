const listaPokemones = require("../models/listaPokemon");

exports.getMovimientos = (req, res) => {
  const { nombre } = req.params;
  const { about } = listaPokemones.find(
    (pokemon) => pokemon.nombre.toLowerCase() === nombre.toLowerCase()
  );

  res.send(about.moves);
};
