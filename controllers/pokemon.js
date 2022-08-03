const { Pool } = require("pg");
const pool = new Pool({
  user: "postgres",
  database: "proyectofinal",
  password: "8508",
});

exports.getPokemones = async (req, res) => {
  const { rows } = await pool.query(
    "select * FROM pokemon JOIN about ON pokemon.about_id = about.about_id JOIN categorias ON pokemon.categoria_id = categorias.categoria_id JOIN basestats ON pokemon.basestats_id = basestats.basestats_id JOIN moves ON about.moves_id = moves.moves_id where pokemon.eliminado = false order by pokemon.numero"
  );
  const resultado = rows.map((pokemon) => {
    return {
      id: pokemon.id,
      nombre: pokemon.nombre,
      numero: pokemon.numero,
      imagen: pokemon.imagen,
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
  res.send(resultado);
};

exports.getPokemonesByid = async (req, res) => {
  const { numero } = req.params;
  const { rows } = await pool.query(
    "select * FROM pokemon JOIN about ON pokemon.about_id = about.about_id JOIN categorias ON pokemon.categoria_id = categorias.categoria_id JOIN basestats ON pokemon.basestats_id = basestats.basestats_id JOIN moves ON about.moves_id = moves.moves_id where numero =$1 AND pokemon.eliminado = false",
    [numero]
  );

  const { rows: next } = await pool.query(
    "select numero from pokemon where numero > $1 and pokemon.eliminado = false order by numero asc limit 1",
    [numero]
  );

  const { rows: prev } = await pool.query(
    "select numero from pokemon where numero < $1 and pokemon.eliminado = false order by numero desc limit 1",
    [numero]
  );

  const resultado = rows.map((pokemon) => {
    return {
      next: next[0]?.numero || null,
      prev: prev[0]?.numero || null,
      imagen: pokemon.imagen,
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

exports.deletePokemones = async (req, res) => {
  const { numero } = req.params;
  const { rows } = await pool.query(
    "update pokemon set eliminado = true where numero =$1",
    [numero]
  );
  res.send("El pokemon se ha borrado correctamente");
};

exports.postPokemones = async (req, res) => {
  const pokemonNuevo = {
    imagen: req.body.imagen,
    nombre: req.body.nombre,
    numero: req.body.numero,
    categoria: [req.body.categoria[0], req.body.categoria[1]],
    colorcategoria: [req.body.colorcategoria[0], req.body.colorcategoria[1]],
    about: {
      weight: req.body.about.weight,
      height: req.body.about.height,
      moves: [req.body.about.moves[0], req.body.about.moves[1]],
      color: req.body.about.color,
      descripcion: req.body.about.descripcion,
    },
    basestats: {
      hp: req.body.basestats.hp,
      atk: req.body.basestats.atk,
      def: req.body.basestats.def,
      satk: req.body.basestats.satk,
      sdef: req.body.basestats.sdef,
      spd: req.body.basestats.spd,
    },
  };

  try {
    await pool.query(
      "INSERT INTO public.moves(nombre1, nombre2, moves_id) VALUES ($1, $2, $3)",
      [
        pokemonNuevo.about.moves[0],
        pokemonNuevo.about.moves[1],
        pokemonNuevo.numero,
      ]
    );
    await pool.query(
      "INSERT INTO public.about(weight, height, color, descripcion, moves_id, about_id) VALUES ($1, $2, $3, $4, $5, $6)",
      [
        pokemonNuevo.about.weight,
        pokemonNuevo.about.height,
        pokemonNuevo.about.color,
        pokemonNuevo.about.descripcion,
        pokemonNuevo.numero,
        pokemonNuevo.numero,
      ]
    );
    await pool.query(
      "INSERT INTO public.basestats( basestats_id, hp, atk, def, satk, sdef, spd) VALUES ($1, $2, $3, $4, $5, $6, $7)",
      [
        pokemonNuevo.numero,
        pokemonNuevo.basestats.hp,
        pokemonNuevo.basestats.atk,
        pokemonNuevo.basestats.def,
        pokemonNuevo.basestats.satk,
        pokemonNuevo.basestats.sdef,
        pokemonNuevo.basestats.spd,
      ]
    );
    await pool.query(
      "INSERT INTO public.categorias(categoria1, categoria2, color_cat1, color_cat2, categoria_id) VALUES ($1, $2, $3, $4, $5)",
      [
        pokemonNuevo.categoria[0],
        pokemonNuevo.categoria[1],
        pokemonNuevo.colorcategoria[0],
        pokemonNuevo.colorcategoria[1],
        pokemonNuevo.numero,
      ]
    );
    const { rows } = await pool.query(
      "SELECT * from public.pokemon where numero = $1",
      [pokemonNuevo.numero]
    );
    if (rows[0]) {
      res.status(400).json({ error: "Este Pokemon ya existe" });
    } else {
      await pool.query(
        "INSERT INTO public.pokemon (nombre, numero, basestats_id, categoria_id, about_id, imagen) VALUES ($1, $2, $3, $4, $5, $6)",
        [
          pokemonNuevo.nombre,
          pokemonNuevo.numero,
          pokemonNuevo.numero,
          pokemonNuevo.numero,
          pokemonNuevo.numero,
          pokemonNuevo.imagen,
        ]
      );
      res.json({ success: true, pokemonNuevo });
    }
  } catch (error) {
    res.json({ error: error });
  }
};
