const listaPokemones = require("../models/listaPokemon");

exports.getNombre = (req, res) => {
  const { nombre } = req.params;

  //Hallar posición de Pokemon buscado:
  const posicionPokemon = listaPokemones.findIndex(
    (pokemon) => pokemon.nombre.toLowerCase() === nombre.toLowerCase()
  );

  res.send(listaPokemones[posicionPokemon]);
};
