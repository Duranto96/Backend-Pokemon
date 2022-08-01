const express = require("express");
const { Pool } = require("pg");
const pool = new Pool({
  user: "postgres",
  database: "proyectofinal",
  password: "8508",
});
const router = express.Router();
const { registrarUsuario, iniciarSesion } = require("../controllers/auth.js");

router.post("/sign-up", registrarUsuario);
router.post("/login", iniciarSesion);

module.exports = router;
