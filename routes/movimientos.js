const express = require("express");
const router = express.Router();
const { getMovimientos } = require("../controllers/movimientosPokemon");
router.get("/movimientos/:nombre", getMovimientos);

module.exports = router;
