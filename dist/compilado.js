(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
},{"./../services/detalhes-filme-service":7}],2:[function(require,module,exports){
const DetalhesFilme = require('./detalhes-filme')

class FilmeMiniatura {
    constructor (id, titulo, genero, avaliacao, imagem) {
        this.titulo = titulo
        this.genero = genero
        this.avaliacao = avaliacao
        this.imagem = imagem
        this.id = id
    }

    mostrarDetalhes () {
        const detalhes = new DetalhesFilme()
        detalhes.exibir(this.id)
    }

    renderizar () {
        const article = document.createElement('article')
        article.className = 'filme-miniatura'
        article.style.backgroundImage = `url(${this.imagem})`
        article.onclick = this.mostrarDetalhes.bind(this)

        const titulo = document.createElement('h1')
        titulo.innerHTML = this.titulo

        article.appendChild(titulo)

        return article
    }
}

module.exports = FilmeMiniatura
},{"./detalhes-filme":1}],3:[function(require,module,exports){
const FilmeMiniatura = require('./filme-miniatura')
class ListaFilmes {
    constructor (titulo, filmes) {
        this.titulo = titulo
        this.filmes = filmes
    }
    renderizar () {
        const titulo = document.createElement('h1')
        titulo.innerHTML = this.titulo
        document.querySelector('#lista-filmes').appendChild(titulo)

        for (const filme of this.filmes) {
            const miniatura = new FilmeMiniatura(
                filme.id,
                filme.titulo, 
                filme.genero, 
                filme.avaliacao, 
                filme.imagem
            )
            document.querySelector('#lista-filmes').appendChild(miniatura.renderizar())
        }
    }
}
module.exports = ListaFilmes
},{"./filme-miniatura":2}],4:[function(require,module,exports){
const inicio = require('./views/inicio')

inicio.renderizar()
},{"./views/inicio":9}],5:[function(require,module,exports){
const apiUrl = 'http://localhost:3000/api/'

class ApiService{
    get(url){
        return new Promise((sucesso)=> {
            const requisicao = new XMLHttpRequest()
            requisicao.open('GET', apiUrl + url)
    
            requisicao.onload = () => {
                const resultadoConvertidoEmJson = JSON.parse(requisicao.responseText)
                sucesso(resultadoConvertidoEmJson)
            }
            requisicao.send()

        })
    }
}
module.exports = ApiService
},{}],6:[function(require,module,exports){
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
},{"./api-service":5}],7:[function(require,module,exports){
const ApiService = require('./api-service')

class DetalhesFilmeService{
    
    buscarDetalhes(filmeId){

        const api = new ApiService()
        return api.get('filmes/' + filmeId)


    }
}
module.exports = DetalhesFilmeService
},{"./api-service":5}],8:[function(require,module,exports){
const ApiService = require('./api-service')

class GenerosService{
    buscarGeneros (){
        const api = new ApiService()
        return api.get('generos')
    }
}
module.exports = GenerosService
},{"./api-service":5}],9:[function(require,module,exports){
const ListaFilmes = require('./../components/lista-filmes')
const CategoriasService = require('./../services/categorias-service')
const GenerosService = require('./../services/generos-service.js')

class Inicio {

    constructor(){
        this.exibindoMenu = false
    }

    carregarGeneros(){
        const servico = new GenerosService()

        servico.buscarGeneros().then(generos =>{
            const ul = document.querySelector('#listaGeneros')

            for (const genero of generos){
                const li = document.createElement('li')
                li.innerHTML = genero.descricao

                ul.appendChild(li)
            }
        })
    }
    exibirGeneros(){
            const ul = document.querySelector('#listaGeneros')
            if (this.exibindoMenu == true){
                this.exibindoMenu = false
                ul.className = ''
            }else{
                this.exibindoMenu = true
                ul.className = 'exibir';
            }
    }

    renderizar () {
        const servico = new CategoriasService()

        servico.buscarCategorias().then(listaCategorias => {
            for (const categoria of listaCategorias) {
                const listaFilmes = new ListaFilmes(categoria.descricao, categoria.filmes);
                listaFilmes.renderizar()    
            }
        })

        this.carregarGeneros()
        const botaoMenuGeneros = document.querySelector('#generos')
        botaoMenuGeneros.onclick = this.exibirGeneros
    }
}

module.exports = new Inicio()
},{"./../components/lista-filmes":3,"./../services/categorias-service":6,"./../services/generos-service.js":8}]},{},[4]);
