const express = require("express");
const router = express.Router();
const { getDescripcion } = require("../controllers/descripcionPokemon");
router.get("/descripcion/:nombre", getDescripcion);

module.exports = router;
