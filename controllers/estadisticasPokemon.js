const listaPokemones = require("../models/listaPokemon");

exports.getEstadisticas = (req, res) => {
  const { nombre } = req.params;
  const { basestats } = listaPokemones.find(
    (pokemon) => pokemon.nombre.toLowerCase() === nombre.toLowerCase()
  );

  res.send(basestats);
};
