const {produtoModel} = require("../models/produtoModel");


const produtoController = {

    /**
     * Controlador que lista todos os produtos do banco de dados
     * 
     * @async
     * @function listarProduto
     * @param {object} req Objeto da requisoção ( recebido do cliete HTTP)
     * @param {object} res Objeto da resposta ( enviando ao cliente HTTP)
     * @returns {Promise<void>} retorna uma resposta com a lista de produtos.
     * @throws Mostra no console e retorna erro 500 se ocorrer falha ao buscar os produtos.
     */
    listarProduto: async (req, res) => {
        try {

            const produtos = await produtoModel.buscarTodos();

            res.status(200).json(produtos);
            
        } catch (error) {

          console.error('ERRO AO LISTAR PRODUTOS: ', error);

          res.status(500).json({error: 'ERRO AO BUSCAR PRODUTOS.'});

        }
    }
};

module.exports = {produtoController};