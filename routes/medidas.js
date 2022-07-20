const express = require("express");
const router = express.Router();
const { getMedidas } = require("../controllers/medidasPokemon");
router.get("/medidas/:nombre", getMedidas);

module.exports = router;
