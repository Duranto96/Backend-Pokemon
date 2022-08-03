const { Pool } = require("pg");
const pool = new Pool({
  user: "postgres",
  database: "proyectofinal",
  password: "8508",
});
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { TOKEN_SECRET } = require("../middleware/verify");

exports.registrarUsuario = async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(req.body.password, salt);

  const newUser = {
    nombre: req.body.nombre,
    mail: req.body.mail,
    password: password,
  };
  try {
    const { rows } = await pool.query(
      "SELECT * from public.usuarios where nombre = $1",
      [newUser.nombre]
    );
    if (rows[0]) {
      res.status(400).json({ error: "ya existe un usuario con este nombre" });
    } else {
      await pool.query(
        "INSERT INTO public.usuarios (nombre, mail, password) VALUES ($1, $2, $3)",
        [newUser.nombre, newUser.mail, password]
      );
      res.json({ success: true, newUser, salt });
    }
  } catch (error) {
    res.json({ error: error });
  }
};

exports.iniciarSesion = async (req, res) => {
  const { rows } = await pool.query(
    "SELECT * from public.usuarios where nombre=$1 limit 1",
    [req.body.nombre]
  );
  if (!rows[0]) {
    return res.status(400).json({ error: "Usuario no encontrado" });
  }
  const validPassword = await bcrypt.compare(
    req.body.password,
    rows[0].password
  );
  if (!validPassword) {
    return res.status(400).json({ error: "Contraseña no válida" });
  }

  const token = jwt.sign(
    {
      nombre: rows[0].nombre,
      mail: rows[0].mail,
    },
    TOKEN_SECRET
  );

  res.json({ error: null, data: "Login existoso", token });
};
