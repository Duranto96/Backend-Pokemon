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
  //solucionar consulta grande con los join
  const { rows } = await pool.query(
    "select * FROM pokemon JOIN about ON pokemon.about_id = about.about_id JOIN categorias ON pokemon.categoria_id = categorias.categoria_id JOIN basestats ON pokemon.basestats_id = basestats.basestats_id JOIN moves ON about.moves_id = moves.moves_id"
  );
  const resultado = rows.map((pokemon) => {
    return {
      id: pokemon.id,
      nombre: pokemon.nombre,
      numero: pokemon.numero,
      categoria: [pokemon.categoria1, pokemon.categoria2],
      colorcategoria: [pokemon.color_cat1, pokemon.color_cat2],
      about: {
        weight: pokemon.weight,
        height: pokemon.height,
        moves: [pokemon.nombre1, pokemon.nombre2],
        color: pokemon.color,
        descripcion: pokemon.descripcion,
      },
      basestats: {
        hp: pokemon.hp,
        atk: pokemon.atk,
        def: pokemon.def,
        satk: pokemon.satk,
        sdef: pokemon.sdef,
        spd: pokemon.spd,
      },
    };
  });
  //ver como devuelve los datos

  // a raiz de eso, armar el objeto pokemon que le gusta al front

  //rows array [{nombre:pokemon.nombre, numero:pokemon.numero, about:{weight:pokemon.weight}}]
  res.send(resultado);
};

//////////////////////Mostrar Pokemon Descripto///////////////////////
exports.getPokemonesByid = async (req, res) => {
  //solucionar consulta grande con los join
  const { id } = req.params;
  const { rows } = await pool.query(
    "select * FROM pokemon JOIN about ON pokemon.about_id = about.about_id JOIN categorias ON pokemon.categoria_id = categorias.categoria_id JOIN basestats ON pokemon.basestats_id = basestats.basestats_id JOIN moves ON about.moves_id = moves.moves_id where id =$1",
    [id]
  );
  ///////////////////////////Navegar siguiente y anterior///////////////////

  const { rows: next } = await pool.query(
    "select id FROM pokemon where id =$1",
    [id + 1]
  );
  const { rows: prev } = await pool.query(
    "select id FROM pokemon where id =$1",
    [id - 1]
  );

  const resultado = rows.map((pokemon) => {
    return {
      id: pokemon.id,
      next: next[0]?.id || null,
      prev: prev[0]?.id || null,
      nombre: pokemon.nombre,
      numero: pokemon.numero,
      categoria: [pokemon.categoria1, pokemon.categoria2],
      colorcategoria: [pokemon.color_cat1, pokemon.color_cat2],
      about: {
        weight: pokemon.weight,
        height: pokemon.height,
        moves: [pokemon.nombre1, pokemon.nombre2],
        color: pokemon.color,
        descripcion: pokemon.descripcion,
      },
      basestats: {
        hp: pokemon.hp,
        atk: pokemon.atk,
        def: pokemon.def,
        satk: pokemon.satk,
        sdef: pokemon.sdef,
        spd: pokemon.spd,
      },
    };
  });

  res.send(resultado[0]);
};

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
