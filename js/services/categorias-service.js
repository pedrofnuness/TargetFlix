const ApiService = require('./api-service')

class CategoriasService{
    buscarCategorias(){

        const api = new ApiService()
        return api.get('categorias')
      
    }
}
module.exports = CategoriasService



// MODELO DE CALLBACK

// buscarCategorias(callback){

//     const requisicao = new XMLHttpRequest()
//     requisicao.open('GET', 'http://localhost:3000/api/categorias')

//     requisicao.onload = () => {
//         const resultadoConvertidoEmJson = JSON.parse(requisicao.responseText)
//         callback(resultadoConvertidoEmJson)
//     }
//     requisicao.send()
// }