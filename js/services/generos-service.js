const ApiService = require('./api-service')

class GenerosService{
    buscarGeneros (){
        const api = new ApiService()
        return api.get('generos')
    }
}
module.exports = GenerosService