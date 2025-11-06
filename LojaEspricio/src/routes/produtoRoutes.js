const express = require('express');
const router = express.Router();
const { produtoController } = require("../controllers/produtoController");

router.get("/produtos", produtoController.listarProduto);

module.exports = { podutoRoutes: router }; 