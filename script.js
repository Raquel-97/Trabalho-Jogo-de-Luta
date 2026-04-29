
//=================================================
// Configurações iniciais do canvas e do jogo.
//=================================================
const canvas = document.querySelector('canvas'); //declara a variavel canvas e a iguala a 'canvas' direto de index.html
const c = canvas.getContext('2d'); //declara a funcao c e define o jogo como 2d

c.fillRect(0,0,960,540); //preenche o retangulo do canvas de preto

const gravidade = 0.3//declara a variavel gravidade e a iguala a 0.3, o que significa que a gravidade aplicada ao jogador e ao inimigo fará com que eles caiam mais rápido quando estiverem no ar.
//=================================================
// Classe Sprite - Define o jogador e o inimigo, onde tem suas características e funções de desenho e atualização.
//================================================
class Sprite {
    constructor({posicao,velocidade}) {//Construtor da classe Sprite, que recebe um objeto com as propriedades posicao e velocidade para definir as características do jogador e do inimigo.
        this.posicao = posicao//Define a posição do jogador e do inimigo, que são passadas como argumentos ao criar uma instância da classe Sprite.
        this.velocidade = velocidade//Define a posição e a velocidade do jogador e do inimigo, que são passadas como argumentos ao criar uma instância da classe Sprite.
        this.altura = 150//Define a altura do jogador e do inimigo, usada para calcular a colisão com o chão.
        this.lastKey//Variável para armazenar a última tecla pressionada, usada para determinar a direção do movimento do jogador e do inimigo.
    }
//==================================================
// Função de desenho do jogador, onde ele é criado e tem suas características definidas.
//==================================================
    draw () {//Função para desenhar o jogador e o inimigo no canvas, usando as propriedades de posição e altura para criar um retângulo vermelho representando cada um.
        c.fillStyle = 'red'
        c.fillRect(this.posicao.x, this.posicao.y, 50, 150)//Desenha um retângulo vermelho no canvas, onde a posição é definida pelas propriedades de posição do jogador e do inimigo, a largura é de 50 pixels e a altura é de 150 pixels.
    } //Declara as caracteristicas da existencia do jogador e do inimigo.
//==================================================
// Função de atulaização do jogador e do inimigo, onde é aplicado a gravidade e o movimento de acordo coma sateclas pressionadas.
//==================================================
    update () {
        this.draw()//Chama a função de desenho para desenhar o jogador e o inimigo no canvas.

        this.posicao.x += this.velocidade.x//Move o jogador e o inimigo horizontalmente de acordo com a sua velocidade.x, que é controlada pelas teclas pressionadas.
        this.posicao.y += this.velocidade.y//Move o jogador e o inimigo verticalmente de acordo com a sua velocidade.y, que é controlada pela gravidade.

        if (this.posicao.y + this.velocidade.y + this.altura >= canvas.height) {
            this.velocidade.y = 0 //caso a soma entre todos esses forem maior que a altura do canvas, pare o jogador imediatamente, o botando no nivel chao
        }//Se a posição vertical do jogador mais a sua velocidade vertical mais a sua altura for maior ou igual à altura do canvas, isso significa que o jogador atingiu o chão. Nesse caso, a velocidade vertical é definida como 0 para impedir que o jogador continue caindo e para mantê-lo no nível do chão.
        else {
            this.velocidade.y += gravidade //impede que passe do chao
        }//Aplica a gravidade ao jogador e ao inimigo, fazendo com que eles caiam quando estiverem no ar, e parando quando atingirem o chão.

    }
}
//==================================================
// Criação do jogador e do inimigo, onde eles são instanciados a partir da classe Sprite, com suas posições e velocidades iniciais definidas.
//==================================================
const jogador = new Sprite ({
    posicao: {
        x: 150,
        y: 100
    },//Define a posição inicial do jogador no canvas, com x igual a 150 e y igual a 100.
    velocidade: {
        x: 0,
        y: 0
    }//Define a velocidade inicial do jogador, com x igual a 0 e y igual a 0, o que significa que o jogador não se moverá até que as teclas sejam pressionadas.
}) //cria o jogador


const inimigo = new Sprite ({
    posicao: {
        x: 810,
        y: 100
    },//Define a posição inicial do inimigo no canvas, com x igual a 810 e y igual a 100.
    velocidade: {
        x: 0,
        y: 0
    }//Define a velocidade inicial do inimigo, com x igual a 0 e y igual a 0, o que significa que o inimigo não se moverá até que as teclas sejam pressionadas.
}) //cria o inimigo


console.log(jogador)
//==================================================
// Variavéis de controle do jogo.
//==================================================
const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w:{
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowLeft:{
        pressed: false
    }, 
    

}//Objeto para controlar o estado das teclas, indicando se cada tecla está pressionada ou não, usado para determinar o movimento do jogador e do inimigo.

let lastKey// Variável para armazenar a última tecla pressionada, usada para determinar a direção do movimento do jogador e do inimigo.
//==================================================
// Função de animação.
//==================================================
function animate () {
    window.requestAnimationFrame(animate) //diz ao navegador que voce quer performar uma animacao
    c.fillStyle = 'black'
    c.fillRect (0,0,960,540)
    jogador.update()//Atualiza o jogador, aplicando a gravidade e o movimento.
    inimigo.update()//Atualiza o inimigo, aplicando a gravidade e o movimento.

jogador.velocidade.x = 0//Impede que o jogador continue se movendo quando a tecla for solta.
inimigo.velocidade.x = 0//Impede que o inimigo continue se movendo quando a tecla for solta.

//Movimento do jogador
if (keys.a.pressed && lastKey ==='a'){
    jogador.velocidade.x = -1//Move o jogador para a esquerda.
} else if (keys.d.pressed && lastKey === 'd'){
    jogador.velocidade.x= 1//Move o joagador para a direita.
}

//Movimento do inimigo
if(keys.ArrowLeft.pressed && inimigo.lastKey === 'ArrowLeft'){
    inimigo.velocidade.x = -1//Move o imimigo para a esquerda.
} else if (keys.ArrowRight.pressed && inimigo.lastKey === 'ArrowRight'){
    inimigo.velocidade.x= 1//Move o inimigo para a direita.
}
}
animate()//Inicia a animação do jogo.
//==================================================
//Eventos de teclado
//==================================================
//Adiciona um event listener para a movimentação do jogador.(Dedo pressionando da tecla)
window.addEventListener('keydown', (event)=> {
    console.log(event.key);
    switch (event.key){
        //Teclas do jogador.
        case 'd':
        keys.d.pressed = true//Quando a tecla de movimento para a direita é pressionada, a velocidade horizontal do jogador é definida como 1, o que faz com que ele se mova para a direita.
        lastKey= 'd'
        break
        case 'a': 
        keys.a.pressed = true//Quando a tecla de movimento para a esquerda é pressionada, a velocidade horizontal do jogador é definida como -1, o que faz com que ele se mova para a esquerda.
        lastKey = 'a'
        break
         case 'w': 
        jogador.velocidade.y = -10//Quando a tecla de pulo é pressionada, a velocidade vertical do jogador é definida como -10, o que faz com que ele suba. A gravidade será aplicada posteriormente para fazer com que ele caia de volta ao chão.
        break
        //Teclas do inimigo.
         case 'ArrowRight':
        keys.ArrowRight.pressed = true//Quando a tecla de movimento para a direita é pressionada, a velocidade horizontal do inimigo é definida como 1, o que faz com que ele se mova para a direita.
        inimigo.lastKey = 'ArrowRight'
        break
        case 'ArrowLeft':
        keys.ArrowLeft.pressed = true//Quando a tecla de movimento para a esquerda é pressionada, a velocidade horizontal do inimigo é definida como -1, o que faz com que ele se mova para a esquerda.
        inimigo.lastKey = 'ArrowLeft'
        break
         case 'ArrowUp': 
        inimigo.velocidade.y = -10//Quando a tecla de pulo é pressionada, a velocidade vertical do inimigo é definida como -10, o que faz com que ele suba. A gravidade será aplicada posteriormente para fazer com que ele caia de volta ao chão.
        break
    }//Switch para definir quais ações devem ser tomadas quando as teclas são pressionadas, como mover o jogador ou o inimigo para a esquerda ou direita, ou fazer eles pularem.
    console.log(event.key)//Loga a tecla pressionada no console para depuração.
})
//Adiciona um event listener para a movimentação do jogador.(Dedo fora da tecla)
window.addEventListener('keyup', (event)=> {
    switch (event.key){
       //Teclas do jogador.
        case 'd':a
      keys.d.pressed = false//
        break
        case 'a': 
        keys.a.pressed = false//Quando a tecla de movimento para a esquerda ou direita é solta, a velocidade horizontal do jogador é definida como 0, o que faz com que ele pare de se mover nessa direção.
        break
          case 'w': //Quando a tecla de pulo é solta, a velocidade vertical do jogador é definida como 0, o que faz com que ele pare de subir e comece a cair devido à gravidade.
        keys.w.pressed = false
        lastKey = 'w'//Para o pulo do jogador, mas como a gravidade é aplicada, ele vai cair de volta ao chão.

       }//Switch para definir quais ações devem ser tomadas quando as teclas são soltas, como parar o movimento do jogador ou do inimigo para a esquerda ou direita, ou parar o pulo.

       // Teclas do inimigo.
       switch (event.key){
        case 'ArrowRight':
        keys.ArrowRight.pressed = false//Quando a tecla de movimento para a direita ou esquerda é solta, a velocidade horizontal do inimigo é definida como 0, o que faz com que ele pare de se mover nessa direção.
        break
        case 'ArrowLeft':
        keys.ArrowLeft.pressed = false//Quando a tecla de movimento para a esquerda é solta, a velocidade horizontal do inimigo é definida como 0, o que faz com que ele pare de se mover nessa direção.
            break
        
  

    console.log(event.key)//Loga a tecla solta no console para depuração.
}
})
