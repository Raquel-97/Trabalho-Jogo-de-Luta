const canvas = document.querySelector('canvas'); //declara a variavel canvas e a iguala a 'canvas' direto de index.html
const c = canvas.getContext('2d'); //declara a funcao c e define o jogo como 2d

c.fillRect(0,0,960,540); //preenche o retangulo do canvas de preto

const gravidade = 0.3

class Sprite {
    constructor({posicao,velocidade}) {
        this.posicao = posicao
        this.velocidade = velocidade
        this.altura = 150
    }

    draw () {
        c.fillStyle = 'red'
        c.fillRect(this.posicao.x, this.posicao.y, 50, 150)
    } //declara as caracteristicas da existencia do jogador

    update () {
        this.draw()
        this.posicao.y += this.velocidade.y
        
        if (this.posicao.y + this.velocidade.y + this.altura >= canvas.height) {
            this.velocidade.y = 0 //caso a soma entre todos esses forem maior que a altura do canvas, pare o jogador imediatamente, o botando no nivel chao
        }
        else {
            this.velocidade.y += gravidade //impede que passe do chao
        }

    }
}


const jogador = new Sprite ({
    posicao: {
        x: 150,
        y: 100
    },
    velocidade: {
        x: 0,
        y: 0
    }
}) //cria o jogador


const inimigo = new Sprite ({
    posicao: {
        x: 810,
        y: 100
    },
    velocidade: {
        x: 0,
        y: 0
    }
}) //cria o inimigo


console.log(jogador)

function animate () {
    window.requestAnimationFrame(animate) //diz ao navegador que voce quer performar uma animacao
    c.fillStyle = 'black'
    c.fillRect (0,0,960,540)
    jogador.update()
    inimigo.update()
}

animate()