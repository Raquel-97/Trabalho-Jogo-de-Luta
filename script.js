const canvas = document.querySelector('canvas'); //declara a variavel canvas e a iguala a 'canvas' direto de index.html
const c = canvas.getContext('2d'); //declara a funcao c e define o jogo como 2d

c.fillRect(0,0,960,540); //preenche o retangulo do canvas de preto

class Sprite {
    constructor(posicao) {
        this.posicao = posicao
    }

    draw () {
        c.fillStyle = 'red';
        c.fillRect(this.posicao.x, this.posicao.y, 50, 150);
    } //declara as caracteristicas da existencia do jogador
}

const jogador = new Sprite ({
    x: 0,
    y: 0
}) //iguala o jogador ao Sprite default

player.draw ()

console.log(player)