var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;   //tamanho da janela
canvas.height = window.innerHeight;  //tamanho da janela

var numeroCurvas = 1;
var curvaAtual = 0;         //curva que está sendo criada
var QuantidadePontos = 0;     //quantidade de pontos no canvas
var PosicaoXnormal = [];     //Posição X de todos os pontos de controle da curva de bezier normal
var PosicaoYnormal = [];     //Posição Y de todos os pontos de controle da curva de bezier normal
PosicaoXnormal[0] = [];       //inicializando a primeira posição será um array
PosicaoYnormal[0] = [];       //inicializando a primeira posição será um array                                                                  
var PosicaoXinversa = [];     //Posicão X de todos os pontos de controle da curva de bezier inversa                               
var PosicaoYinversa = [];     //Posicão Y de todos os pontos de controle da curva de bezier inversa                               
PosicaoXinversa[0] = [];      //inciailizando a primeira posição será um array                                                                  
PosicaoYinversa[0] = [];      //incializando a primeira posição será um array   
var PontoAtual = 0;           //Ponto referenciado no pelo click da curva normal
var PontoCurvaX = [];         //Posições X de todos os pontos da curva 
var PontoCurvaY = [];         //Posições Y de todos os pontos da curva
var numeroDeAvaliacoes = 100;  //numero de Avaliacoes da curva
ctx.fillStyle = 'black';      //cor botões e textos
ctx.font = "11px Roboto";      //tamanho do texto 
var states = [];            //guarda as curvas diferentes



var esconderpontos = {    //botao esconde pontos de controle
    x: 20,
    y: 20,
};
ctx.fillText("Esconder Pontos", 40, 25); //texto de esconder pontos
var pontosescondidos = false;   //estado dos pontos de controle
var esconderpoligonalnormal = {  //botao esconde poligonal normal
    x: 20,
    y: 70,
};
ctx.fillText("Esconder Poligonal Normal (Linhas Laranjas)", 40, 75);//texto de poligonal normal
var poligonalnormalescondida = false;  //estado da poligonal normal
var corpoligonalnormal = "orange"; //cor da poligonal normal
var esconderpoligonalinversa = {  //botao esconde poligonal inversa 
    x: 20,
    y: 120,
};
ctx.fillText("Esconder Poligonal Inversa (Linhas Pretas)", 40, 125);//texto de poligonal inversa
var poligonalinversaescondida = false; //estado da poligonal inversa 
var corpoligonalinversa = "black";   //cor da poligonal inversa
var escondernormal = {      //botao esconde  da curva normal
    x: 20,
    y: 170,
};
ctx.fillText("Esconder Curva Normal (Curva Verde)", 40, 175);//texto de curva normal
var curvanormalescondida = false; //estado da curva normal
var corcurvanomal = "green";   //cor da curva normal 
var esconderinversa = {   //botao  esconde curva inversa 
    x: 20,
    y: 220,
};
ctx.fillText("Esconder Curva Inversa (Curva Vermelha)", 40, 225);//texto de curva inversa
var curvainversaescondida = false; //estado da curva inversa
var corcurvainversa = 'red';   //cor da curva inversa
var LimparTudo = {  //botao limpa tudo
    x: 20,
    y: 270,
};
ctx.fillText("Limpa Tudo", 40, 275);//texto de limpar tudo
var limpado = false;  //estado do botao limpar tudo
var diminuirSegmento1 = { //botao  de diminuir 1 Avaliacoes 
    x: 20,
    y: 320,
};
ctx.fillText("Diminui Quantidade Avaliacoes em 1 (Começa em 100)", 40, 325); //texto de diminuir  quantidade Avaliacoes

var AumentaSegmento1 = { //botao  de aumentar 1 Avaliacoes 
    x: 20,
    y: 370,
};
ctx.fillText("Aumenta Quantidade Avaliacoes em 1 (Começa em 100)", 40, 375);//texto de  aumentar quantidade de Avaliacoes

var diminuirSegmento100 = { //botao  de diminuir 100 Avaliacoes 
    x: 20,
    y: 420,
};
ctx.fillText("Diminui Quantidade Avaliacoes em 100 (Começa em 100)", 40, 425); //texto de diminuir  quantidade Avaliacoes

var AumentaSegmento100 = { //botao  de aumentar 100 Avaliacoes 
    x: 20,
    y: 470,
};
ctx.fillText("Aumenta Quantidade Avaliacoes em 100 (Começa em 100)", 40, 475);//texto de  aumentar quantidade de Avaliacoes

var ZeraAvaliacoes = { //botao zera Avaliacoes
    x: 20,
    y: 520,
};
ctx.fillText("Zera Quantidade Avaliacoes", 40, 525);//texto de zerar Avaliacoes
var zerado = false;

ctx.fillText("Próxima Curva", 40, 575);//texto de  aumentar quantidade de Avaliacoes

var ProximaCurva = { //botao zera Avaliacoes
    x: 20,
    y: 570,
};
ctx.fillText("Curva Atual = " + curvaAtual, 120, 575);//texto de  aumentar quantidade de Avaliacoes

ctx.fillText("Curva Anterior", 40, 625);//texto de  aumentar quantidade de Avaliacoes

var AnteriorCurva = { //botao zera Avaliacoes
    x: 20,
    y: 620,
};


ctx.beginPath();             //começa desenho
ctx.arc(esconderpontos.x, esconderpontos.y, 10, 0, 2 * Math.PI);   //desenha botao 
ctx.arc(esconderpoligonalnormal.x, esconderpoligonalnormal.y, 10, 0, 2 * Math.PI); //desenha botao 
ctx.arc(esconderpoligonalinversa.x, esconderpoligonalinversa.y, 10, 0, 2 * Math.PI); //desenha botao 
ctx.arc(escondernormal.x, escondernormal.y, 10, 0, 2 * Math.PI); //desenha botao 
ctx.arc(esconderinversa.x, esconderinversa.y, 10, 0, 2 * Math.PI);//desenha botao 
ctx.arc(LimparTudo.x, LimparTudo.y, 10, 0, 2 * Math.PI); //desenha botao 
ctx.arc(diminuirSegmento1.x, diminuirSegmento1.y, 10, 0, 2 * Math.PI);//desenha botao 
ctx.arc(AumentaSegmento1.x, AumentaSegmento1.y, 10, 0, 2 * Math.PI);//desenha botao 
ctx.arc(diminuirSegmento100.x, diminuirSegmento100.y, 10, 0, 2 * Math.PI);//desenha botao 
ctx.arc(AumentaSegmento100.x, AumentaSegmento100.y, 10, 0, 2 * Math.PI);//desenha botao 
ctx.arc(ZeraAvaliacoes.x, ZeraAvaliacoes.y, 10, 0, 2 * Math.PI);//desenha botao
ctx.arc(ProximaCurva.x, ProximaCurva.y, 10, 0, 2 * Math.PI);//desenha botao
ctx.arc(AnteriorCurva.x, AnteriorCurva.y, 10, 0, 2 * Math.PI);//desenha botao
ctx.fillStyle = 'black'; //cor dos botoes
ctx.fill();     //preenche
ctx.closePath(); //termina desenho


function isInEsconderPontos(click) {  //checa se está clicando em um botao            
    var v = {                                        //v é a difença entre o click e a posicao do botão
        x: click.x - 20,
        y: click.y - 20,
    };
    if ((Math.sqrt(v.x * v.x + v.y * v.y) <= 10)) {  //calcula se o click foi dentro do botão
        return true;     //retorna que está no botao
    }
    return false; //se não, retorna que está fora do botao
}
function isInEsconderPoligonalNormal(click) {  //checa se está clicando em um botao            
    var v = {                                        //v é a difença entre o click e a posicao do botão
        x: click.x - 20,
        y: click.y - 70,
    };
    if ((Math.sqrt(v.x * v.x + v.y * v.y) <= 10)) {  //calcula se o click foi dentro do botão
        return true;     //retorna que está no botao
    }
    return false; //se não, retorna que está fora do botao
}
function isInEsconderPoligonalInversa(click) {  //checa se está clicando em um botao            
    var v = {                                        //v é a difença entre o click e a posicao do botão
        x: click.x - 20,
        y: click.y - 120,
    };
    if ((Math.sqrt(v.x * v.x + v.y * v.y) <= 10)) {  //calcula se o click foi dentro do botão
        return true;     //retorna que está no botao
    }
    return false; //se não, retorna que está fora do botao
}
function isInEsconderNormal(click) {  //checa se está clicando em um botao            
    var v = {                                        //v é a difença entre o click e a posicao do botão
        x: click.x - 20,
        y: click.y - 170,
    };
    if ((Math.sqrt(v.x * v.x + v.y * v.y) <= 10)) {  //calcula se o click foi dentro do botão
        return true;     //retorna que está no botao
    }
    return false; //se não, retorna que está fora do botao
}
function isInEsconderInversa(click) {  //checa se está clicando em um botao            
    var v = {                                        //v é a difença entre o click e a posicao do botão
        x: click.x - 20,
        y: click.y - 220,
    };
    if ((Math.sqrt(v.x * v.x + v.y * v.y) <= 10)) {  //calcula se o click foi dentro do botão
        return true;     //retorna que está no botao
    }
    return false; //se não, retorna que está fora do botao
}
function isInLimparTudo(click) {  //checa se está clicando em um botao            
    var v = {                                        //v é a difença entre o click e a posicao do botão
        x: click.x - 20,
        y: click.y - 270,
    };
    if ((Math.sqrt(v.x * v.x + v.y * v.y) <= 10)) {  //calcula se o click foi dentro do botão
        return true;     //retorna que está no botao
    }
    return false; //se não, retorna que está fora do botao
}
function isInDiminuir1(click) {  //checa se está clicando em um botao            
    var v = {                                        //v é a difença entre o click e a posicao do botão
        x: click.x - 20,
        y: click.y - 320,
    };
    if ((Math.sqrt(v.x * v.x + v.y * v.y) <= 10)) {  //calcula se o click foi dentro do botão
        return true;     //retorna que está no botao
    }
    return false; //se não, retorna que está fora do botao
}
function isInAumentar1(click) {  //checa se está clicando em um botao            
    var v = {                                        //v é a difença entre o click e a posicao do botão
        x: click.x - 20,
        y: click.y - 370,
    };
    if ((Math.sqrt(v.x * v.x + v.y * v.y) <= 10)) {  //calcula se o click foi dentro do botão
        return true;     //retorna que está no botao
    }
    return false; //se não, retorna que está fora do botao
}
function isInDiminuir100(click) {  //checa se está clicando em um botao            
    var v = {                                        //v é a difença entre o click e a posicao do botão
        x: click.x - 20,
        y: click.y - 420,
    };
    if ((Math.sqrt(v.x * v.x + v.y * v.y) <= 10)) {  //calcula se o click foi dentro do botão
        return true;     //retorna que está no botao
    }
    return false; //se não, retorna que está fora do botao
}
function isInAumentar100(click) {  //checa se está clicando em um botao            
    var v = {                                        //v é a difença entre o click e a posicao do botão
        x: click.x - 20,
        y: click.y - 470,
    };
    if ((Math.sqrt(v.x * v.x + v.y * v.y) <= 10)) {  //calcula se o click foi dentro do botão
        return true;     //retorna que está no botao
    }
    return false; //se não, retorna que está fora do botao
}
function isInZeraAvaliacoes(click) {  //checa se está clicando em um botao            
    var v = {                                        //v é a difença entre o click e a posicao do botão
        x: click.x - 20,
        y: click.y - 520,
    };
    if ((Math.sqrt(v.x * v.x + v.y * v.y) <= 10)) {  //calcula se o click foi dentro do botão
        return true;     //retorna que está no botao
    }
    return false; //se não, retorna que está fora do botao
}

function isInProximaCurva(click) {  //checa se está clicando em um botao            
    var v = {                                        //v é a difença entre o click e a posicao do botão
        x: click.x - 20,
        y: click.y - 570,
    };
    if ((Math.sqrt(v.x * v.x + v.y * v.y) <= 10)) {  //calcula se o click foi dentro do botão
        return true;     //retorna que está no botao
    }
    return false; //se não, retorna que está fora do botao
}

function isInAnteriorCurva(click) {  //checa se está clicando em um botao            
    var v = {                                        //v é a difença entre o click e a posicao do botão
        x: click.x - 20,
        y: click.y - 620,
    };
    if ((Math.sqrt(v.x * v.x + v.y * v.y) <= 10)) {  //calcula se o click foi dentro do botão
        return true;     //retorna que está no botao
    }
    return false; //se não, retorna que está fora do botao
}


function CastelijauNormal() {       //Calcula Castelijau para a curva normal
    for (var t = 0; t < numeroDeAvaliacoes; t++) {            //suavidade da curva em Avaliacoes do t inicial 0 ate o numeroDeAvaliacoes
        for (var i = 1; i < QuantidadePontos; i++) {  //indice dos potos de controle, a partir de 1 pois se fosse 0 calcularia  indice castelijau -1;
            PosicaoXnormal[i] = [];              //transforma o array em bidimensional
            PosicaoYnormal[i] = [];              //transforma o array em bidimensional
            for (var j = 0; j < QuantidadePontos - i; j++) {   //grau dos pontos de controle
                PosicaoXnormal[i][j] = (1 - (t / (numeroDeAvaliacoes - 1))) * PosicaoXnormal[i - 1][j] + (t / (numeroDeAvaliacoes - 1)) * PosicaoXnormal[i - 1][j + 1];  //calcula castelijau
                PosicaoYnormal[i][j] = (1 - (t / (numeroDeAvaliacoes - 1))) * PosicaoYnormal[i - 1][j] + (t / (numeroDeAvaliacoes - 1)) * PosicaoYnormal[i - 1][j + 1];  //calcula castelijau
            }
        }
        //atribui os pontos da curva  normal 
        PontoCurvaX[t] = PosicaoXnormal[QuantidadePontos - 1][0];  //atribui o valor x ao ponto da curva em t
        PontoCurvaY[t] = PosicaoYnormal[QuantidadePontos - 1][0];  //atribui o valor y ao ponto da curva em t
    }
}
function CastelijauInversa() {     //Calcula Castelijau para a curva inversa
    for (var t = 0; t < numeroDeAvaliacoes; t++) {     //suavidade da curva em Avaliacoes do t inicial 0 ate o numeroDeAvaliacoes
        for (var i = 1; i < QuantidadePontos; i++) {   //indice dos potos de controle, a partir de 1 pois se fosse 0 calcularia  indice castelijau -1;
            PosicaoXinversa[i] = [];            //transforma o array em bidimensional
            PosicaoYinversa[i] = [];            //transforma o array em bidimensional
            for (var j = 0; j < QuantidadePontos - i; j++) {  //grau dos pontos de controle
                PosicaoXinversa[i][j] = (1 - (t / (numeroDeAvaliacoes - 1))) * PosicaoXinversa[i - 1][j] + (t / (numeroDeAvaliacoes - 1)) * PosicaoXinversa[i - 1][j + 1];  //calcula castelijau
                PosicaoYinversa[i][j] = (1 - (t / (numeroDeAvaliacoes - 1))) * PosicaoYinversa[i - 1][j] + (t / (numeroDeAvaliacoes - 1)) * PosicaoYinversa[i - 1][j + 1];  //calcula castelijau
            }
        }
        //atribui os pontos da curva inversa
        PontoCurvaX[t] = PosicaoXinversa[QuantidadePontos - 1][0];    //atribui o valor x ao ponto da curva em t
        PontoCurvaY[t] = PosicaoYinversa[QuantidadePontos - 1][0];    //atribui o valor y ao ponto da curva em t
    }
}
function AtualizarCanvas() {     //atualiza canvas com novas informações
    ctx.clearRect(0, 0, canvas.width, canvas.height);  //apaga canvas desatualizado
    for (var i = 0; i < QuantidadePontos; i++) {  //varre a quantidade de pontos 
        ctx.beginPath();             //começa desenho
        ctx.arc(PosicaoXnormal[0][i], PosicaoYnormal[0][i], 5, 0, 2 * Math.PI);  //cria pontos nas posicoes dos clicks do usuario 
        ctx.fill();     //preenche
        ctx.closePath();//termina desenho
    }




    ctx.beginPath();             //começa desenho
    ctx.arc(esconderpontos.x, esconderpontos.y, 10, 0, 2 * Math.PI); //desenha botao
    ctx.arc(esconderpoligonalnormal.x, esconderpoligonalnormal.y, 10, 0, 2 * Math.PI);  //desenha botao
    ctx.arc(esconderpoligonalinversa.x, esconderpoligonalinversa.y, 10, 0, 2 * Math.PI);  //desenha botao
    ctx.arc(escondernormal.x, escondernormal.y, 10, 0, 2 * Math.PI); //desenha botao
    ctx.arc(esconderinversa.x, esconderinversa.y, 10, 0, 2 * Math.PI); //desenha botao
    ctx.arc(LimparTudo.x, LimparTudo.y, 10, 0, 2 * Math.PI);
    ctx.arc(diminuirSegmento1.x, diminuirSegmento1.y, 10, 0, 2 * Math.PI);
    ctx.arc(AumentaSegmento1.x, AumentaSegmento1.y, 10, 0, 2 * Math.PI);
    ctx.arc(diminuirSegmento100.x, diminuirSegmento100.y, 10, 0, 2 * Math.PI);//desenha botao 
    ctx.arc(AumentaSegmento100.x, AumentaSegmento100.y, 10, 0, 2 * Math.PI);//desenha botao 
    ctx.arc(ZeraAvaliacoes.x, ZeraAvaliacoes.y, 10, 0, 2 * Math.PI);//desenha botao
    ctx.arc(ProximaCurva.x, ProximaCurva.y, 10, 0, 2 * Math.PI);//desenha botao
    ctx.arc(AnteriorCurva.x, AnteriorCurva.y, 10, 0, 2 * Math.PI);//desenha botao
    ctx.fillStyle = 'black';
    ctx.fill();     //preenche
    ctx.closePath(); //termina desenho
    ctx.fillText("Esconder Pontos", 40, 25);//texto de esconder pontos 
    ctx.fillText("Esconder Poligonal Normal (Linhas Laranjas)", 40, 75);//texto de poligonal normal
    ctx.fillText("Esconder Poligonal Inversa (Linhas Pretas)", 40, 125);//texto de poligonal inversa
    ctx.fillText("Esconder Curva Normal (Curva Verde)", 40, 175);//texto de curva normal 
    ctx.fillText("Esconder Curva Inversa (Curva Vermelha)", 40, 225);//texto de curva inversa
    ctx.fillText("Limpa Tudo", 40, 275);//texto de limpar tudo 
    ctx.fillText("Diminui Quantidade Avaliacoes em 1 (Começa em 100)", 40, 325);//texto de diminuir quantidade de Avaliacoes em 1 
    ctx.fillText("Aumenta Quantidade Avaliacoes em 1 (Começa em 100)", 40, 375);//texto de aumentar quantidade de Avaliacoes em 1 
    ctx.fillText("Diminui Quantidade Avaliacoes em 100 (Começa em 100)", 40, 425);//texto de diminuir quantidade de Avaliacoes em 100
    ctx.fillText("Aumenta Quantidade Avaliacoes em 100 (Começa em 100)", 40, 475);//texto de aumentar quantidade de Avaliacoes em 100 
    ctx.fillText("Zera Quantidade Avaliacoes", 40, 525);//texto de zerar quantidade Avaliacoes
    ctx.fillText("Próxima Curva", 40, 575);//texto de  aumentar quantidade de Avaliacoes
    ctx.fillText("Curva Atual = " + curvaAtual, 120, 575);//texto de  aumentar quantidade de Avaliacoes
    ctx.fillText("Curva Anterior", 40, 625);//texto de  aumentar quantidade de Avaliacoes
    

    CastelijauNormal(); //calcula o castelijau da curva normal  
    for (var j = 0; j < numeroDeAvaliacoes - 1; j++) {    //faz desenhos retas da curva ligando os numeroDeAvaliacoes-1 pontos  da curva normal
        ctx.beginPath();     //começa desenho
        ctx.strokeStyle = corcurvanomal  //cor reta verde 
        ctx.moveTo(PontoCurvaX[j], PontoCurvaY[j]);  //move cursor para X e Y do ponto na curva normal
        ctx.lineTo(PontoCurvaX[j + 1], PontoCurvaY[j + 1]); //calcula linha ate o X e Y do proximo ponto na curva normal
        ctx.stroke();  //liga
        ctx.closePath();//termina desenho
    }
    for (var l = 0; l < QuantidadePontos - 1; l++) {   //calcula a poligonal de controle da normal (ligando b0,b1,b2... da normal)
        ctx.beginPath();     //começa desenho
        ctx.strokeStyle = corpoligonalnormal; //cor da poligonal normal
        ctx.moveTo(PosicaoXnormal[0][l], PosicaoYnormal[0][l]);  //move cursor para X e Y do ponto na poligonal normal
        ctx.lineTo(PosicaoXnormal[0][l + 1], PosicaoYnormal[0][l + 1]); //calcula linha ate o X e Y do proximo ponto na poligonal normal
        ctx.stroke();  //liga
        ctx.closePath();//termina desenho
    }
    CastelijauInversa();      //calcula o castelijau da curva inversa
    for (var k = 0; k < numeroDeAvaliacoes - 1; k++) { //faz desenhos retas da curva ligando os numeroDeAvaliacoes-1 pontos da curva inversa
        ctx.beginPath();  //começa desenho
        ctx.strokeStyle = corcurvainversa  //cor reta vermelha
        ctx.moveTo(PontoCurvaX[k], PontoCurvaY[k]);  //move cursor para X e Y do ponto na curva inversa
        ctx.lineTo(PontoCurvaX[k + 1], PontoCurvaY[k + 1]); //calcula linha ate o X e Y do proximo ponto na curva inversa
        ctx.stroke(); //liga
        ctx.closePath();//termina desenho
    }
    for (var m = 0; m < QuantidadePontos - 1; m++) { //calcula a poligonal de ocntrole da inversa (lingando b0,b1,b2.... da inversa)
        ctx.beginPath();     //começa desenho
        ctx.strokeStyle = corpoligonalinversa;  //cor da poligonal inversa 
        ctx.moveTo(PosicaoXinversa[0][m], PosicaoYinversa[0][m]);   //move cursor para X e Y do ponto na poligonal inversa
        ctx.lineTo(PosicaoXinversa[0][m + 1], PosicaoYinversa[0][m + 1]); //calcula linha ate o X e Y do proximo ponto na poligonal inversa
        ctx.stroke();  //liga
        ctx.closePath();//termina desenho
    }

    states[curvaAtual] =
    {
        "QuantidadePontos": QuantidadePontos,
        "PosicaoXnormal": PosicaoXnormal,
        "PosicaoYnormal": PosicaoYnormal,
        "PosicaoXinversa": PosicaoXinversa,
        "PosicaoYinversa": PosicaoYinversa,
        "PontoAtual": PontoAtual,
        "PontoCurvaX": PontoCurvaX,
        "PontoCurvaY": PontoCurvaY,
        "numeroDeAvaliacoes": numeroDeAvaliacoes
    };

}

function setState(novaCurva) {
   
    states[curvaAtual -1] =
    {
        "QuantidadePontos": QuantidadePontos,
        "PosicaoXnormal": PosicaoXnormal,
        "PosicaoYnormal": PosicaoYnormal,
        "PosicaoXinversa": PosicaoXinversa,
        "PosicaoYinversa": PosicaoYinversa,
        "PontoAtual": PontoAtual,
        "PontoCurvaX": PontoCurvaX,
        "PontoCurvaY": PontoCurvaY,
        "numeroDeAvaliacoes": numeroDeAvaliacoes
    };


    if (novaCurva >= numeroCurvas) { //criando uma curva nova
        
        QuantidadePontos = 0;     //quantidade de pontos no canvas
        PosicaoXnormal = [];     //Posição X de todos os pontos de controle da curva de bezier normal
        PosicaoYnormal = [];     //Posição Y de todos os pontos de controle da curva de bezier normal
        PosicaoXnormal[0] = [];       //inicializando a primeira posição será um array
        PosicaoYnormal[0] = [];       //inicializando a primeira posição será um array                                                                  
        PosicaoXinversa = [];     //Posicão X de todos os pontos de controle da curva de bezier inversa                               
        PosicaoYinversa = [];     //Posicão Y de todos os pontos de controle da curva de bezier inversa                               
        PosicaoXinversa[0] = [];      //inciailizando a primeira posição será um array                                                                  
        PosicaoYinversa[0] = [];      //incializando a primeira posição será um array   
        PontoAtual = 0;           //Ponto referenciado no pelo click da curva normal
        PontoCurvaX = [];         //Posições X de todos os pontos da curva 
        PontoCurvaY = [];         //Posições Y de todos os pontos da curva
        numeroDeAvaliacoes = 100;  //numero de Avaliacoes da curva

        AtualizarCanvas(); //repassa novas informações ao canvas
        
        numeroCurvas = numeroCurvas + 1;

    } else {//voltando para uma curva antiga
        var newState = states[novaCurva];
        QuantidadePontos = newState.QuantidadePontos;     //quantidade de pontos no canvas
        PosicaoXnormal = newState.PosicaoXnormal;     //Posição X de todos os pontos de controle da curva de bezier normal
        PosicaoYnormal = newState.PosicaoYnormal;     //Posição Y de todos os pontos de controle da curva de bezier normal                                                    
        PosicaoXinversa = newState.PosicaoXinversa;     //Posicão X de todos os pontos de controle da curva de bezier inversa                               
        PosicaoYinversa = newState.PosicaoYinversa;     //Posicão Y de todos os pontos de controle da curva de bezier inversa                               
        PontoAtual = newState.PontoAtual;           //Ponto referenciado no pelo click da curva normal
        PontoCurvaX = newState.PontoCurvaX;         //Posições X de todos os pontos da curva 
        PontoCurvaY = newState.PontoCurvaY;         //Posições Y de todos os pontos da curva
        numeroDeAvaliacoes = newState.numeroDeAvaliacoes;  //numero de Avaliacoes da curva
        AtualizarCanvas(); //repassa novas informações ao canvas
    }

}

   



canvas.addEventListener('click', function (e) {		//faz algo quando clica
    if (isInCircle({ x: e.offsetX, y: e.offsetY }) == false) {  //calcula se não está clicando em um ponto ja existente
        ctx.beginPath();   //começa desenho
        if (isInEsconderPontos({ x: e.offsetX, y: e.offsetY }) == true && pontosescondidos == false) {  //se botao foi clicado e os pontos nao estao escondidos
            ctx.fillStyle = 'white'; //cor do preenchimento branco;
            pontosescondidos = true; //pontos estao escondidos 
        } else if (isInEsconderPontos({ x: e.offsetX, y: e.offsetY }) == true && pontosescondidos == true) { //se botao foi clicado e os pontos  estao escondidos
            ctx.fillStyle = 'black'; //cor do preenchimento azul;
            pontosescondidos = false; //pontos nao estao escondidos
        } else if (isInEsconderPoligonalNormal({ x: e.offsetX, y: e.offsetY }) == true && poligonalnormalescondida == false) { //se botao foi clicado e a poligonal normal nao esta escondida
            corpoligonalnormal = "white"; //cor da poligonal normal branca
            poligonalnormalescondida = true; //poligonal escondida
        }
        else if (isInEsconderPoligonalNormal({ x: e.offsetX, y: e.offsetY }) == true && poligonalnormalescondida == true) { //se botao foi clicado e a poligonal normal  esta escondida
            corpoligonalnormal = "orange"; //cor da poligonal  normal laranja
            poligonalnormalescondida = false; //poligonal normal nao escondida
        } else if (isInEsconderPoligonalInversa({ x: e.offsetX, y: e.offsetY }) == true && poligonalinversaescondida == false) {  //se botao foi clicado e a poligonal inversa nao esta escondida
            corpoligonalinversa = "white"; //cor da poligonal inversa branca
            poligonalinversaescondida = true; //poligonal inversa escondida 
        } else if (isInEsconderPoligonalInversa({ x: e.offsetX, y: e.offsetY }) == true && poligonalinversaescondida == true) {  //se botao foi clicado e a poligonal normal  esta escondida
            corpoligonalinversa = "black";// cor poligonal inversa preta 
            poligonalinversaescondida = false;// poligonal nao estao escondida
        } else if (isInEsconderNormal({ x: e.offsetX, y: e.offsetY }) == true && curvanormalescondida == false) { //se botao foi clicado e a curva normal nao esta escondida
            corcurvanomal = "white"; //cor curva normal branca
            curvanormalescondida = true; //curva normal escondida
        } else if (isInEsconderNormal({ x: e.offsetX, y: e.offsetY }) == true && curvanormalescondida == true) {//se botao foi clicado e a curva normal  esta escondida
            corcurvanomal = "green"; //cor da curva normal verda 
            curvanormalescondida = false;//curva normal nao escondida 
        } else if (isInEsconderInversa({ x: e.offsetX, y: e.offsetY }) == true && curvainversaescondida == false) {//se botao foi clicado e a curva inversa nao esta escondida
            corcurvainversa = "white";//cor curva inversa branca
            curvainversaescondida = true; //curva inversa escondida
        } else if (isInEsconderInversa({ x: e.offsetX, y: e.offsetY }) == true && curvainversaescondida == true) {//se botao foi clicado e a curva normal  esta escondida
            corcurvainversa = "red";//cor da curva inversa vermelha
            curvainversaescondida = false; //curva inversa nao escondidp
        } else if (isInLimparTudo({ x: e.offsetX, y: e.offsetY }) == true && limpado == false) {//se botao foi clicado 
            ctx.clearRect(0, 0, canvas.width, canvas.height);  //apaga canvas desatualizado
            QuantidadePontos = 0;  //apaga os pontos
            states = [];
            curvaAtual = 0;
            limpado = true; //estado botao limpar 
        } else if (isInDiminuir1({ x: e.offsetX, y: e.offsetY }) == true) {//se botao foi clicado 
            if (numeroDeAvaliacoes - 1 >= 0) {  //se o numero de Avaliacoes menos 1 nao for negativo 
                numeroDeAvaliacoes = numeroDeAvaliacoes - 1;  //diminua o numero de Avaliacoes em 1
            }
        } else if (isInAumentar1({ x: e.offsetX, y: e.offsetY }) == true) {//se botao foi clicado 
            numeroDeAvaliacoes = numeroDeAvaliacoes + 1; //numero de Avaliacoes é aumentado em 1
        } else if (isInDiminuir100({ x: e.offsetX, y: e.offsetY }) == true) {//se botao foi clicado 
            if (numeroDeAvaliacoes - 100 >= 0) {  //se o numero de Avaliacoes menos 100 nao for negativo 
                numeroDeAvaliacoes = numeroDeAvaliacoes - 100;  //diminua o numero de Avaliacoes em 100
            }
        } else if (isInAumentar100({ x: e.offsetX, y: e.offsetY }) == true) {//se botao foi clicado 
            numeroDeAvaliacoes = numeroDeAvaliacoes + 100; //numero de Avaliacoes é aumentado em 100
        } else if (isInZeraAvaliacoes({ x: e.offsetX, y: e.offsetY }) == true) {//se botao foi clicado 
            numeroDeAvaliacoes = 0; //numero de Avaliacoes é zerado
        } else if (isInProximaCurva({ x: e.offsetX, y: e.offsetY }) == true) {//se botao foi clicado
            //print("cheguei"); 
            curvaAtual = curvaAtual + 1;
            setState(curvaAtual);
        } else if (isInAnteriorCurva({ x: e.offsetX, y: e.offsetY }) == true) {//se botao foi clicado
            //print("cheguei");
            if(curvaAtual>0){
                curvaAtual = curvaAtual - 1;
            }            
            setState(curvaAtual);
        } else {
            PosicaoXnormal[0][QuantidadePontos] = [e.offsetX];   //atribui o valor x do click a ao array de posições dos pontos de controle da curva normal 
            PosicaoYnormal[0][QuantidadePontos] = [e.offsetY];   //atribui o valor y do click a ao array de posições dos pontos de controle da curva normal 
            ctx.arc(PosicaoXnormal[0][QuantidadePontos], PosicaoYnormal[0][QuantidadePontos], 5, 0, 2 * Math.PI);  //cria pontos nas posiçã do click do usuario
            QuantidadePontos++;   //após criar ponto aumenta seu numero em 1
            ctx.fill();  //preenche
            ctx.closePath();//termina desenho
            PosicaoXinversa[0][QuantidadePontos - 1] = PosicaoXnormal[0][QuantidadePontos - 1];  //adiciona aos pontos de controle da inversa como se fosse a normal
            PosicaoYinversa[0][QuantidadePontos - 1] = PosicaoYnormal[0][QuantidadePontos - 1];  //adiciona aos pontos de controle da inversa como se fosse a normal
            if (QuantidadePontos % 2 == 0) {    // para quantidade de pontos pares realiza a troca de pontos de controle 
                var f = 0;   //inicializa f
                var g = 0;  // inicializa g
                f = PosicaoXinversa[0][QuantidadePontos - 1];  //f guarda X do ultimo ponto de controle da curva inversa
                g = PosicaoYinversa[0][QuantidadePontos - 1];  //g guarda Y do ultimo ponto de controla da curva inversa
                PosicaoXinversa[0][QuantidadePontos - 1] = PosicaoXinversa[0][QuantidadePontos - 2]; //realiza a troca dos pontos de controle para a curva inversa
                PosicaoYinversa[0][QuantidadePontos - 1] = PosicaoYinversa[0][QuantidadePontos - 2]; //realiza a troca dos pontos de controle para a curva inversa
                PosicaoYinversa[0][QuantidadePontos - 2] = g;  //realiza a troca dos pontos de controle para a curva inversa
                PosicaoXinversa[0][QuantidadePontos - 2] = f;  //realiza a troca dos pontos de controle para a curva inversa
            }
        }
    }
    if (limpado == true) {
        ctx.beginPath();             //começa desenho
        ctx.arc(esconderpontos.x, esconderpontos.y, 10, 0, 2 * Math.PI); //desenha botao
        ctx.arc(esconderpoligonalnormal.x, esconderpoligonalnormal.y, 10, 0, 2 * Math.PI);  //desenha botao
        ctx.arc(esconderpoligonalinversa.x, esconderpoligonalinversa.y, 10, 0, 2 * Math.PI);  //desenha botao
        ctx.arc(escondernormal.x, escondernormal.y, 10, 0, 2 * Math.PI); //desenha botao
        ctx.arc(esconderinversa.x, esconderinversa.y, 10, 0, 2 * Math.PI); //desenha botao
        ctx.arc(LimparTudo.x, LimparTudo.y, 10, 0, 2 * Math.PI);//desenha botao
        ctx.arc(diminuirSegmento1.x, diminuirSegmento1.y, 10, 0, 2 * Math.PI);//desenha botao
        ctx.arc(AumentaSegmento1.x, AumentaSegmento1.y, 10, 0, 2 * Math.PI);//desenha botao
        ctx.arc(diminuirSegmento100.x, diminuirSegmento100.y, 10, 0, 2 * Math.PI);//desenha botao
        ctx.arc(AumentaSegmento100.x, AumentaSegmento100.y, 10, 0, 2 * Math.PI);//desenha botao
        ctx.arc(ZeraAvaliacoes.x, ZeraAvaliacoes.y, 10, 0, 2 * Math.PI);//desenha botao
        ctx.arc(ProximaCurva.x, ProximaCurva.y, 10, 0, 2 * Math.PI);//desenha botao
        ctx.arc(AnteriorCurva.x, AnteriorCurva.y, 10, 0, 2 * Math.PI);//desenha botao
        ctx.fillStyle = 'black';
        ctx.fill();     //preenche
        ctx.closePath(); //termina desenho)
        ctx.fillText("Esconder Pontos", 40, 25);//texto de esconder pontos 
        ctx.fillText("Esconder Poligonal Normal (Linhas Laranjas)", 40, 75);//texto de poligonal normal
        ctx.fillText("Esconder Poligonal Inversa (Linhas Pretas)", 40, 125);//texto de poligonal inversa
        ctx.fillText("Esconder Curva Normal (Curva Verde)", 40, 175);//texto de curva normal 
        ctx.fillText("Esconder Curva Inversa (Curva Vermelha)", 40, 225);//texto de curva inversa
        ctx.fillText("Limpa Tudo", 40, 275);//texto de limpar tudo 
        ctx.fillText("Diminui Quantidade Avaliacoes em 1 (Começa em 100)", 40, 325);//texto de diminuir quantidade de Avaliacoes em 1 
        ctx.fillText("Aumenta Quantidade Avaliacoes em 1 (Começa em 100)", 40, 375);//texto de aumentar quantidade de Avaliacoes em 1 
        ctx.fillText("Diminui Quantidade Avaliacoes em 100 (Começa em 100)", 40, 425);//texto de diminuir quantidade de Avaliacoes em 100
        ctx.fillText("Aumenta Quantidade Avaliacoes em 100 (Começa em 100)", 40, 475);//texto de aumentar quantidade de Avaliacoes em 100 
        ctx.fillText("Zera Quantidade Avaliacoes", 40, 525);//texto de zerar quantidade Avaliacoes  
        ctx.fillText("Próxima Curva", 40, 575);//texto de  aumentar quantidade de Avaliacoes
        ctx.fillText("Curva Atual = " + curvaAtual, 120, 575);//texto de  aumentar quantidade de Avaliacoes
        ctx.fillText("Curva Anterior", 40, 625);//texto de  aumentar quantidade de Avaliacoes
        limpado = false;
    } else {
        AtualizarCanvas(); //repassa novas informações ao canvas
    }

});
canvas.addEventListener('dblclick', function (e) {   //faz ao ao clicar 2 vezes ,no caso remove o ponto do double click
    if (isInCircle({ x: e.offsetX, y: e.offsetY }) == true) {//calcula se está clicando em um ponto ja existente
        PosicaoXnormal.splice(PontoAtual, 1); //remove X do ponto referenciado pelo click duplo da curva normal
        PosicaoYnormal.splice(PontoAtual, 1); //remove Y do ponto referenciado pelo click duplo da curva normal 
        QuantidadePontos--;   //diminui o numero de pontos 
        for (var i = PontoAtual; i < QuantidadePontos; i++) {     //checa ponto clicado referente a curva normal até o ultimo ponto 
            if (PontoAtual != 0) {                               //se não removeu  o primeiro então
                PosicaoXnormal[0][i] = PosicaoXnormal[0][i + 1];  //posicao x será a do proximo pontoatual referente a curva normal
                PosicaoYnormal[0][i] = PosicaoYnormal[0][i + 1];   //posicao y será a do proximo pontoatual referente a curva normal
            }
        }
        //recriar os pontos de controle  da inversa a partir dos novos pontos de contole da normal
        for (var j = 0; j < QuantidadePontos; j++) {      //varre a quantidade de pontos 
            if (QuantidadePontos % 2 == 0) {            //se a quantidade de pontos for par
                if (j % 2 == 0) {                           //se o ponto for par 
                    PosicaoXinversa[0][j] = PosicaoXnormal[0][j + 1];  //o ponto da inversa ficará trocado em relação a normal,sendo sempre 1 a frente
                    PosicaoYinversa[0][j] = PosicaoYnormal[0][j + 1];  //o ponto da inversa ficará trocado em relação a normal,sendo sempre 1 a frente
                } else {
                    PosicaoXinversa[0][j] = PosicaoXnormal[0][j - 1];     //o ponto da inversa ficará trocado em relação a normal,sendo sempre 1 a tras   
                    PosicaoYinversa[0][j] = PosicaoYnormal[0][j - 1];     //o ponto da inversa ficará trocado em relação a normal,sendo sempre 1 a tras   
                }
            }
            if (QuantidadePontos % 2 == 1) {     //se a quantidade de pontos for impar 
                if (j == QuantidadePontos - 1) {             //se o ponto for o ultimo
                    PosicaoXinversa[0][j] = PosicaoXnormal[0][j];     //o ponto da inversa ficará igual ao da normal
                    PosicaoYinversa[0][j] = PosicaoYnormal[0][j];     //o ponto da inversa ficará igual ao da normal
                }
                if (j % 2 == 0 && j != QuantidadePontos - 1) {             //se o ponto for par e não for o ultimo 
                    PosicaoXinversa[0][j] = PosicaoXnormal[0][j + 1];  //o ponto da inversa ficará trocado em relação a normal,sendo sempre 1 a frente
                    PosicaoYinversa[0][j] = PosicaoYnormal[0][j + 1];  //o ponto da inversa ficará trocado em relação a normal,sendo sempre 1 a frente
                } if (j % 2 == 1 && j != QuantidadePontos - 1) {           //se o ponto for impar e não for o ultimo
                    PosicaoXinversa[0][j] = PosicaoXnormal[0][j - 1];  //o ponto da inversa ficará trocado em relação a normal,sendo sempre 1 a tras   
                    PosicaoYinversa[0][j] = PosicaoYnormal[0][j - 1]; //o ponto da inversa ficará trocado em relação a normal,sendo sempre 1 a tras   
                }
            }
        }
    }
    AtualizarCanvas();  //repassa novas informações ao canvas  
})

function isInCircle(click) {  //checa se está clicando em um circulo
    for (var j = 0; j < QuantidadePontos; j++) {                 //checa todos pontos
        var v = {                                             //v é a difença entre o click e a posicao de todos os pontos;
            x: click.x - PosicaoXnormal[0][j],
            y: click.y - PosicaoYnormal[0][j],
        };
        if ((Math.sqrt(v.x * v.x + v.y * v.y) <= 5)) {  //calcula se o click foi dentro de algum circulo 
            PontoAtual = j;   //se foi então guarda ponto referenciado referente a curva normal
            return true;     //retorna que está no circulo
        }
    }
    return false; //se não, retorna que está fora do circulo
}
var move = false;  //o mouse não está movimentando

canvas.addEventListener('mousedown', function (e) {   //faz algo ao abaixar o mouse 
    move = isInCircle({ x: e.offsetX, y: e.offsetY });  //checa se está no circulo do abaixamento do mouse e atribui ao estado de movimento do mouse

});

canvas.addEventListener('mousemove', function (e) { //faz algo ao mover o mouse 
    if (move) {                              //se o mouse estiver movendo
        PosicaoXnormal[0][PontoAtual] = e.offsetX;     //o X do ponto de controle da normal referenciado pelo click será o mesmo que o do mouse  
        PosicaoYnormal[0][PontoAtual] = e.offsetY;     //o Y do ponto de controle da normal referenciado pelo click será o mesmo que o do mouse  
        if (QuantidadePontos % 2 == 1 && PontoAtual == QuantidadePontos - 1) {  // Se o numero de pontos no canvas for impar e o ponto referenciado pelo click for o ultimo ponto de controle 
            PosicaoXinversa[0][PontoAtual] = e.offsetX;   //o X do ponto de controle da inversa referenciado pelo click será o mesmo que o do mouse  
            PosicaoYinversa[0][PontoAtual] = e.offsetY;   //o Y do ponto de controle da inversa referenciado pelo click será o mesmo que o do mouse  
        }
        if (PontoAtual % 2 == 0) {   //checa se o ponto referenciado pelo click é par
            PosicaoXinversa[0][PontoAtual + 1] = e.offsetX;  //o X do ponto de controle da inversa referenciado pelo click será o referenciado da normal +1  
            PosicaoYinversa[0][PontoAtual + 1] = e.offsetY;  //o Y do ponto de controle da inversa referenciado pelo click será o referenciado da normal +1  
        }
        if (PontoAtual % 2 == 1 && PontoAtual != QuantidadePontos) { //checa se o ponto referenciado pelo click é impar e que não seja o ultimo ponto de controle do canvas
            PosicaoXinversa[0][PontoAtual - 1] = e.offsetX;  //o X do ponto de controle da inversa referenciado pelo click será o referenciado da normal -1  
            PosicaoYinversa[0][PontoAtual - 1] = e.offsetY;  //o Y do ponto de controle da inversa referenciado pelo click será o referenciado da normal -1  
        }
        AtualizarCanvas(); //repassa novas informações ao canvas
    }
});
canvas.addEventListener('mouseup', function (e) {  // faz algo ao soltar o botão mouse
    PontoAtual = 0;     //reseta o ponto referenciado
    move = false;     //reseta estado de movimento dos pontos
});
