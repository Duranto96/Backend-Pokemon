const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { verifyToken, TOKEN_SECRET } = require("../middleware/verify");
const router = express.Router();

const usuarios = [
  {
    name: "Antonella",
    mail: "anto@gmail.com",
    password: "$2b$10$f.2wwfTFoFhXAMnWU6ol4OehydMN2blcY3pHH6iuHhloy3G124cl2",
  },
];

//registro de un usuario
router.post("/register", async (req, res) => {
  //hash contraseña
  //instalar: npm install bcrypt
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(req.body.password, salt);

  const newUser = {
    name: req.body.name,
    mail: req.body.mail,
    password: password,
  };
  usuarios.push(newUser);

  res.json({ succes: true, newUser, usuarios });
});

//buscamos usuario con el mismo mail
router.post("/login", async (req, res) => {
  const user = usuarios.find((u) => u.name === req.body.name);
  if (!user) {
    return res.status(400).json({ error: "Usuario no encontrado" });
  }
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return res.status(400).json({ error: "Contraseña no válida" });
  }

  //creación del token
  const token = jwt.sign(
    {
      name: user.name,
      mail: user.mail,
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
