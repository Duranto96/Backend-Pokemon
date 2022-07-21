// const listaPokemones = require("../models/listaPokemon");
// const pokemones = require("../models/listaPokemon");
const { Pool } = require("pg");
const pool = new Pool({
  user: "postgres",
  database: "proyectoFinal",
  password: "1234",
});

//////////////////////Mostrar Lista de Pokemones///////////////////////
exports.getPokemones = async (req, res) => {
  const { rows } = await pool.query("select * from public.pokemon");
  res.send(rows);
};

// exports.getPokemonesByid = (req, res) => {
//   const { id } = req.params;}

// function encontrarPorTypes(pokemonesFiltrados, type1) {
//   pokemonesFiltrados = pokemonesFiltrados.filter((e) =>
//     e.elemento.some((el) => el.toLowerCase() === type1.toLowerCase())
//   );
//   return pokemonesFiltrados;
// }

// /////////////////////////////////////////////////////////////////
// exports.postPokemones = (req, res) => {
//   const pokemon = req.body;
//   console.log(req.body);
//   const nuevaListaPokemon = listaPokemones;
//   nuevaListaPokemon.push(pokemon);
//   res.send(nuevaListaPokemon[nuevaListaPokemon.length - 1]);
// };

// ///////////////////////////////////////////////////////////////
// exports.putPokemones = (req, res) => {
//   const pokemon = req.body;
//   const { id } = req.params;
//   //Hallar posición de Pokemon a editar:
//   const posicionPokemonAEditar = listaPokemones.findIndex(
//     (poke) => poke.numero === id
//   );

//   const nuevoPokemon = {
//     ...listaPokemones[posicionPokemonAEditar],
//     ...pokemon,
//   };

//   listaPokemones[posicionPokemonAEditar] = nuevoPokemon;
//   res.send(nuevoPokemon);
// };

// ////////////////////////////////////////////////////////////
// exports.deletePokemones = (req, res) => {
//   const pokemon = req.body;
//   const { id } = req.params;
//   //Hallar posición de Pokemon a eliminar:
//   const posicionPokemonAEliminar = listaPokemones.findIndex(
//     (poke) => poke.numero === id
//   );
//   listaPokemones.splice(posicionPokemonAEliminar, 1)[posicionPokemonAEliminar] =
//     pokemon;
//   res.send(listaPokemones[posicionPokemonAEliminar]);
// };

//   const posicionPokemon = listaPokemones.findIndex(
//     (poke) => poke.numero === id
//   );

//   const pokemon = listaPokemones[posicionPokemon];

//   const next =
//     posicionPokemon != listaPokemones.length - 1
//       ? listaPokemones[posicionPokemon + 1].numero
//       : null;

//   const prev =
//     posicionPokemon != 0 ? listaPokemones[posicionPokemon - 1].numero : null;
//   res.send({ ...pokemon, next, prev });
// };
