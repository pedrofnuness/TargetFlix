const ApiService = require('./api-service')

class DetalhesFilmeService{
    
    buscarDetalhes(filmeId){

        const api = new ApiService()
        return api.get('filmes/' + filmeId)


    }
}
module.exports = DetalhesFilmeService