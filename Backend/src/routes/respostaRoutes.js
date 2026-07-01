const express = require("express");
const router = express.Router();
const RespostaController = require("../controllers/RespostaController");

router.post("/respostas", RespostaController.store);

router.get("/respostas", RespostaController.listarTudo);

router.get("/relatorio", RespostaController.relatorio);

module.exports = router;