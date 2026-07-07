// Campo da senha
const campoSenha = document.querySelector("#campo-senha");

// Texto do número de caracteres
const numeroSenha = document.querySelector(".parametro-senha__texto");

// Botões + e -
const botoes = document.querySelectorAll(".parametro-senha__botao");

// Checkboxes
const checkbox = document.querySelectorAll(".checkbox");

const forcaSenha = document.querySelector('.forca');

// Tamanho inicial
let tamanhoSenha = 12;
numeroSenha.textContent = tamanhoSenha;

// Caracteres
const letrasMaiusculas = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const letrasMinusculas = "abcdefghijklmnopqrstuvwxyz";
const numeros = "0123456789";
const simbolos = "!@#$%&*()-_=+[]{}<>?/";

// Gerar senha
function geraSenha() {
    let alfabeto = "";

    if (checkbox[0].checked) {
        alfabeto += letrasMaiusculas;
    }
    if (checkbox[1].checked) {
        alfabeto += letrasMinusculas;
    }
    if (checkbox[2].checked) {
        alfabeto += numeros;
    }
    if (checkbox[3].checked) {
        alfabeto += simbolos;
    }

    // Se nenhum checkbox estiver marcado
    if (alfabeto.length === 0) {
        campoSenha.value = "";
        return;
    }

    let senha = "";

    for (let i = 0; i < tamanhoSenha; i++) {
        const indice = Math.floor(Math.random() * alfabeto.length);
        senha += alfabeto[indice];
    }

    campoSenha.value = senha;
    classificaSenha();
}

// Diminuir tamanho
function diminuiTamanho() {
    if (tamanhoSenha > 1) {
        tamanhoSenha--;
        numeroSenha.textContent = tamanhoSenha;
        geraSenha();
    }
}

// Aumentar tamanho
function aumentaTamanho() {
    if (tamanhoSenha < 20) {
        tamanhoSenha++;
        numeroSenha.textContent = tamanhoSenha;
        geraSenha();
    }
}

// Botões
botoes[0].addEventListener("click", diminuiTamanho);
botoes[1].addEventListener("click", aumentaTamanho);

// Atualizar senha quando marcar/desmarcar checkboxes
checkbox.forEach(item => {
    item.addEventListener("change", geraSenha);
});

// Gerar senha inicial
geraSenha();

function classificaSenha(tamanhoAlfabeto){
    let entropia = tamanhoSenha * Math.log2(tamanhoSenha);
    console.log(entropia);
    forcaSenha.classList.remove('fraca','media','forte');
    if (entropia > 57){
        forcaSenha.classList.add('forte');
    } else if (entropia > 35 && entropia < 57) {
        forcaSenha.classList.add('media');
    } else if (entropia <= 35){
        forcaSenha.classList.add('fraca');
    }
    const valorEntropia = document.querySelector('.entropia');
        valorEntropia.textContent = "Um computador pode levar até " + Math.floor(2**entropia/(100e6*60*60*24)) + " dias para descobrir essa senha.";
}