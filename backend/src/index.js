const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();

app.use(cors())
app.use(express.json());
app.use(routes);
/**
 * Rota - É o caminho
 * Recurso - Ta associado a alguma tabela num banco
 */

 /**
  * Métodos HTTP
  * 
  * GET - Buscar uma informação no Back-end
  * POST - Criar uma informação no Back-end
  * PUT - ALterar uma informação no Back-end
  * DELETE -  Deletar uma informação no Back-end
  */

 /**
  * Tipos de Parâmetros
  * 
  * Query Params: Parametros nomeados enviados na rota após o "?" (Filtros, Paginação) (Só coloca oo recurso no método)
  * Route Params: Parametros utilizados para identificar recursos (Tem que colocar /:id no método)
  * Request Body: Corpo da requisição, utilizado para criar ou alterar recursos
  */

  /**
   * Instalação do Banco de dados --->
   * 
   * Driver: SELECT * FROM users
   * Query builder: table('users').select('*').where()
   */

app.listen(3333);