const DetalhesFilmeService = require('./../services/detalhes-filme-service')

class DetalhesFilme {
    constructor (titulo, genero, avaliacao) {
        this.titulo = titulo
        this.genero = genero
        this.avaliacao = avaliacao
    }

    exibir (filmeId) {
        //buscar os dados da API
        const servico = new DetalhesFilmeService()

        servico.buscarDetalhes(filmeId).then(detalhes => {
            //montar o HTML para exibir os dados que foram buscados
            const detalhesFilme = document.querySelector('aside#detalhes-filme')
            detalhesFilme.className = 'exibir'
            detalhesFilme.querySelector('button').onclick = this.esconder
            detalhesFilme.querySelector('h2.detalhes-titulo').innerHTML = detalhes.titulo
            detalhesFilme.querySelector('div.detalhes-genero').innerHTML = detalhes.genero
            detalhesFilme.querySelector('div.detalhes-avaliacao').innerHTML = detalhes.avaliacao
            detalhesFilme.querySelector('div.detalhes-ano').innerHTML = detalhes.ano
            detalhesFilme.querySelector('div.detalhes-diretor').innerHTML = detalhes.diretor
            detalhesFilme.querySelector('div.detalhes-faixaEtaria').innerHTML = detalhes.faixaEtaria
            detalhesFilme.querySelector('div.detalhes-sinopse').innerHTML = detalhes.sinopse
            detalhesFilme.querySelector('img.detalhes-imagem').src = detalhes.imagem
        })

    }

    esconder () {
        document.querySelector('aside#detalhes-filme').className = ''
    }
}

module.exports = DetalhesFilme