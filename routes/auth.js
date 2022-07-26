const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { verifyToken, TOKEN_SECRET } = require("../middleware/verify");
const { Pool } = require("pg");
const pool = new Pool({
  user: "postgres",
  database: "proyectofinal",
  password: "8508",
});
const router = express.Router();

// const usuarios = [
//   {
//     name: "Antonella",
//     mail: "anto@gmail.com",
//     password: "$2b$10$f.2wwfTFoFhXAMnWU6ol4OehydMN2blcY3pHH6iuHhloy3G124cl2",
//   },
// ];

//registro de un usuario
router.post("/sign-up", async (req, res) => {
  //hash contraseña
  //instalar: npm install bcrypt
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(req.body.password, salt);

  const newUser = {
    nombre: req.body.nombre,
    mail: req.body.mail,
    password: password,
  };

  try {
    pool.query(
      "INSERT INTO public.usuarios (nombre, mail, password) VALUES ($1, $2, $3)",
      [newUser.nombre, newUser.mail, password]
    );
    res.json({ success: true, newUser, salt });
  } catch (error) {
    res.json({ error: error });
  }
});

//buscamos usuario con el mismo mail
router.post("/login", async (req, res) => {
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

  //creación del token
  const token = jwt.sign(
    {
      nombre: rows[0].nombre,
      mail: rows[0].mail,
    },
    TOKEN_SECRET
  );

  res.json({ error: null, data: "Login existoso", token });
});

//listado de usuarios
router.get("/usuarios", verifyToken, async (req, res) => {
  //podemos acceder a los datos del usuario que hizo la request
  //según el JWT que envío en los headers de la request
  console.log(req.user);

  res.json({ error: null, usuarios });
});

module.exports = router;
