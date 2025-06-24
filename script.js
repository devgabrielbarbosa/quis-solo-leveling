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

  const alternativas = document.querySelectorAll(`input[name="${pergunta}"]`);

  // Desabilita o botão para evitar múltiplos cliques
  const botao = document.querySelector(`.question[data-question="${pergunta}"] button`);
  botao.disabled = true;

 if (respostaSelecionada.value === respostasCorretas[pergunta]) {
  pontuacao++;
  alert("Resposta correta!");
  respostaSelecionada.parentElement.classList.add("correta");
} else {
  alert(`Resposta errada! A resposta correta é: ${respostasCorretas[pergunta]}`);
  respostaSelecionada.parentElement.classList.add("incorreta");

  alternativas.forEach((input) => {
    if (input.value === respostasCorretas[pergunta]) {
      input.parentElement.classList.add("correta");
    }
  });
}


  // Desativa todas as alternativas após responder
  alternativas.forEach((input) => (input.disabled = true));

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
  const totalPerguntas = Object.keys(respostasCorretas).length;
  const resultadoDiv = document.getElementById("resultado");
  resultadoDiv.innerHTML = `Você acertou <span>${pontuacao}</span> de <span>${totalPerguntas}</span> perguntas!`;

  if (pontuacao === totalPerguntas) {
    estourarFogos();
  }
}

function estourarFogos() {
  const duration = 4000; // duração total em ms
  const end = Date.now() + duration;

  (function frame() {
    // Enquanto não passar o tempo total, vai lançando fogos em posições aleatórias
    confetti({
      particleCount: 50,
      startVelocity: 30,
      spread: 60,
      ticks: 60,
      origin: {
        x: Math.random(),
        y: Math.random() * 0.6
      }
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}


function reiniciarQuiz() {
  // Reseta a pontuação
  pontuacao = 0;

  // Remove as classes correta/incorreta de todas as alternativas
  document.querySelectorAll("label.correta, label.incorreta").forEach((label) => {
    label.classList.remove("correta", "incorreta");
  });

  // Habilita todos os inputs e botões
  document.querySelectorAll("input[type=radio]").forEach((input) => {
    input.disabled = false;
    input.checked = false;
  });
  document.querySelectorAll("button").forEach((botao) => {
    botao.disabled = false;
  });

  // Esconde resultado
  const resultadoDiv = document.getElementById("resultado");
  resultadoDiv.innerHTML = "";

  // Esconde todas as perguntas
  document.querySelectorAll(".question").forEach((q) => {
    q.classList.remove("active");
  });

  // Mostra a primeira pergunta
  const primeira = document.querySelector(".question[data-question='q1']");
  if (primeira) primeira.classList.add("active");
}
