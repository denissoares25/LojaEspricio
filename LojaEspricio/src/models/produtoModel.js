const {sql, getConnection} = require("../config/db"); //forma certa de importa

const produtoModel = {

 /**
  * Busca todos os produtos no banco de dados
  * 
  * @async
  * @function buscarTodos
  * @returns {Promise<Array>} Retorna uma lista com todos os produtos.
  * @throws Mostra no console e propaga o erro caso a busca falhe. 
  */   
    buscarTodos: async () => {
        try {
            const pool = await getConnection();

            const querySQL = 'SELECT * FROM Produtos';

            const result = await pool.request()
                .query(querySQL);
            
            return result.recordset;

        } catch (error) {
            console.error("ERRO AO BUSCAR PRODUTOS: ", error);
            throw error; //reveberar o erro para a funcao que o chamar.
            
        }
    }

};


module.exports = {produtoModel}; //ja coloque antes que esqueça 