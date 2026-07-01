const express = require("express");
const cors = require("cors"); 
const respostaRoutes = require("./routes/respostaRoutes"); 

const app = express();

app.use(cors()); 
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ mensagem: "API funcionando!" });
});

app.use("/api", respostaRoutes);

module.exports = app;