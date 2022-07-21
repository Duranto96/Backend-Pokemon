const express = require("express");
const app = express();
const pokemonRoutes = require("./routes/pokemones");
const descripcionRoutes = require("./routes/descripcion");
const movimientosRoutes = require("./routes/movimientos");
const estadisticasRoutes = require("./routes/estadísticas");
const nombreRoutes = require("./routes/nombre");
const medidasRoutes = require("./routes/medidas");
const categoriasRoutes = require("./routes/categorias");
const CORS = require("cors");
const path = require("path");
const authRouter = require("./routes/auth");

app.use(express.static(path.join(__dirname, "public")));
app.use(CORS());
app.use(express.json());
app.use("/", pokemonRoutes);
app.use("/", descripcionRoutes);
app.use("/", movimientosRoutes);
app.use("/", estadisticasRoutes);
app.use("/", nombreRoutes);
app.use("/", medidasRoutes);
app.use("/", categoriasRoutes);
app.use("/", authRouter);

app.listen(1234, async () => {
  console.log("Server listening in http://localhost:1234");
});
