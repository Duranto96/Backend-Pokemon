const express = require("express");
const router = express.Router();
const { getNombre } = require("../controllers/nombrePokemon");
router.get("/:nombre", getNombre);

module.exports = router;
