const express = require("express");
const router = express.Router();
const { getCategorias } = require("../controllers/categoriasPokemon");
router.get("/categorias/:nombre", getCategorias);

module.exports = router;
