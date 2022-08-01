const express = require("express");
const router = express.Router();
const {
  getPokemones,
  postPokemones,
  deletePokemones,
  getPokemonesByid,
} = require("../controllers/pokemon");
const { verifyToken } = require("../middleware/verify");

router.get("/pokemon", getPokemones);
router.get("/pokemon/:numero", getPokemonesByid);
router.post("/agregar-pokemon", verifyToken, postPokemones);
router.delete("/eliminar/pokemon/:numero", verifyToken, deletePokemones);

module.exports = router;
