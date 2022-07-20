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

router.get("/pokemon", verifyToken, getPokemones);
router.get("/pokemon/:id", verifyToken, getPokemonesByid);
router.post("/pokemon", verifyToken, postPokemones);
router.put("/editar/pokemon/:id", verifyToken, putPokemones);
router.delete("/eliminar/pokemon/:id", verifyToken, deletePokemones);

module.exports = router;
