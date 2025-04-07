const respostasCorretas = {
    q1: "Sung Jin-Woo",
    q2: "Caçador de Rank E",
    q3: "Guilda Hunters",
    q4: "Go Gun-Hee",
    q5: "Sistema do Jogador",
    q6: "Soldado de Ferro",
    q7: "Uma caçadora de Rank S",
    q8: "Monarca da Destruição",
    q9: "Guilda Ahjin",
    q10: "Sung Il-Hwan"
};

let pontuacao = 0;

function verificarResposta(pergunta) {
    const respostaSelecionada = document.querySelector(`input[name="${pergunta}"]:checked`);
    if (!respostaSelecionada) {
        alert("Por favor, selecione uma resposta!");
        return;
    }

    if (respostaSelecionada.value === respostasCorretas[pergunta]) {
        pontuacao++;
        alert("Resposta correta!");
    } else {
        alert("Resposta errada!");
    }
    mostrarProximaPergunta(pergunta);
}

function mostrarProximaPergunta(perguntaAtual) {
    const perguntaAtualDiv = document.querySelector(`.question[data-question="${perguntaAtual}"]`);
    const proximaPerguntaDiv = perguntaAtualDiv.nextElementSibling;

    perguntaAtualDiv.classList.remove("active");
    if (proximaPerguntaDiv && proximaPerguntaDiv.classList.contains("question")) {
        proximaPerguntaDiv.classList.add("active");
    } else {
        mostrarResultado();
    }
}

function mostrarResultado() {
    const resultadoDiv = document.getElementById("resultado");
    resultadoDiv.innerHTML = `Você acertou <span>${pontuacao}</span> de <span>${Object.keys(respostasCorretas).length}</span> perguntas!`;
}