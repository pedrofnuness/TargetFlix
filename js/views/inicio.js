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