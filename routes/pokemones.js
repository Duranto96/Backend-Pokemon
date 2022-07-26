const express = require("express");
const router = express.Router();
const {
  getPokemones,
  postPokemones,
  putPokemones,
  deletePokemones,
  getPokemonesByid,
} = require("../controllers/pokemon");
const { verifyToken } = require("../middleware/verify");

router.get("/pokemon", getPokemones);
router.get("/pokemon/:id", getPokemonesByid);
router.post("/agregar-pokemon", postPokemones);
router.delete("/eliminar/pokemon/:id", verifyToken, deletePokemones);

module.exports = router;
