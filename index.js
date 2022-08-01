const express = require("express");
const app = express();
const pokemonRoutes = require("./routes/pokemones");
const CORS = require("cors");
const authRouter = require("./routes/auth");

app.use(CORS());
app.use(express.json());
app.use("/", pokemonRoutes);
app.use("/", authRouter);

app.listen(1234, async () => {
  console.log("Server listening in http://localhost:1234");
});
