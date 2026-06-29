const express = require("express");

const app = express();

app.use(express.json());

// rota de teste
app.get("/", (req, res) => {
  res.json({ mensagem: "API funcionando!" });
});

module.exports = app;

