const listaPokemones = require("../models/listaPokemon");

exports.getMedidas = (req, res) => {
  const { nombre } = req.params;

  const { about } = listaPokemones.find(
    (pokemon) => pokemon.nombre.toLowerCase() === nombre.toLowerCase()
  );

  res.send({ peso: about.weight, altura: about.height });
};
