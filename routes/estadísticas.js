const express = require("express");
const router = express.Router();
const { getEstadisticas } = require("../controllers/estadisticasPokemon");
router.get("/estadisticas/:nombre", getEstadisticas);

module.exports = router;
