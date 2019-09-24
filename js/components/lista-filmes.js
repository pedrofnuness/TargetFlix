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