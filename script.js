const html = document.querySelector("html");
const focoBt = document.querySelector(".app__card-button--foco");
const curtoBt = document.querySelector(".app__card-button--curto");
const longoBt = document.querySelector(".app__card-button--longo");
const lottieContainer = document.getElementById("lottie-container");
const titulo = document.querySelector(".app__title");
const botoes = document.querySelectorAll(".app__card-button");
const startPauseBt = document.querySelector("#start-pause");
const musicaFocoInput = document.querySelector("#alternar-musica");
const iniciarOuPausarBt = document.querySelector("#start-pause span");
const iniciarOuPausarBtIcone = document.querySelector(
  ".app__card-primary-butto-icon"
);
const tempoNaTela = document.querySelector("#timer");
const resetTimerBt = document.getElementById("reset-timer");

let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;

const musicas = [
  "/sons/coffee-chill-out-15283.mp3",
  "/sons/good-night-160166.mp3",
  "/sons/let-it-go-12279.mp3",
  "/sons/lofi-study-112191.mp3",
  "/sons/luna-rise-part-one.mp3",
  "/sons/mixkit-vastness-184.mp3",
  "/sons/spirit-blossom-15285.mp3",
  "/sons/relaxed-vlog-night-street-131746.mp3",
  "/sons/spirit-blossom-15285.mp3",
  "/sons/sunset-vibes-lo-fichillhop-9503.mp3",
  "/sons/coding-night-112186.mp3",
  "/sons/chillhop-beat-quotthousand-milesquot-113254.mp3",
  "/sons/street-food-112193.mp3",
  "/sons/empty-mind-118973.mp3",
];
const musica = new Audio();

const resetValues = {
  foco: 1500,
  curto: 300,
  longo: 900,
};

const audioInicio = new Audio("/sons/play.wav");
const audioPausa = new Audio("/sons/pause.mp3");
const audioFim = new Audio("/sons/end.mp3");

function tocarMusicaAleatoria() {
  const musicaAleatoria = musicas[Math.floor(Math.random() * musicas.length)];
  musica.src = musicaAleatoria;
  musica.play();
  musica.volume = 0.2;
}

musicaFocoInput.addEventListener("change", () => {
  if (musicaFocoInput.checked) {
    tocarMusicaAleatoria();
  } else {
    musica.pause();
  }
});

function carregarEVisualizarLottie(path, contexto) {
  mostrarTempo();
  botoes.forEach((contexto) => {
    contexto.classList.remove("active");
  });
  html.setAttribute("data-contexto", contexto);
  lottieContainer.innerHTML = "";
  const animation = lottie.loadAnimation({
    container: lottieContainer,
    renderer: "svg",
    loop: true,
    autoplay: true,
    path: path,
  });

  switch (contexto) {
    case "foco":
      updateTitle(
        "Otimize a sua produtividade,<br><strong class='app__title-strong'>mergulhe no que importa.</strong>"
      );
      break;

    case "descanso-curto":
      updateTitle(
        "Bora repor a cafeína?<br><strong class='app__title-strong'>Faça uma pausa curta.</strong>"
      );
      break;

    case "descanso-longo":
      updateTitle(
        "Hora de marcar aquele date...<br><strong class='app__title-strong'>Faça uma pausa longa.</strong>"
      );
      break;

    default:
      break;
  }

  lottie.setSpeed(0.5);
}

function updateTitle(newText) {
  titulo.innerHTML = newText;
}

document.addEventListener("DOMContentLoaded", function () {
  carregarEVisualizarLottie(
    "https://lottie.host/5135ea59-8dfe-49e8-af51-01d0767c6c8c/n1fwVur4On.json",
    "foco"
  );
});

focoBt.addEventListener("click", () => {
  tempoDecorridoEmSegundos = 1500;
  carregarEVisualizarLottie(
    "https://lottie.host/5135ea59-8dfe-49e8-af51-01d0767c6c8c/n1fwVur4On.json",
    "foco"
  );
  focoBt.classList.add("active");
  startPauseBt.classList.remove("longo-bt");
  startPauseBt.classList.remove("curto-bt");
  musica.pause();
  musicaFocoInput.checked = false;
  zerar();
});

curtoBt.addEventListener("click", () => {
  tempoDecorridoEmSegundos = 300;
  carregarEVisualizarLottie(
    "https://lottie.host/1bacabea-ae2a-4042-92ea-5be03003f81e/XnWX7TlWGl.json",
    "descanso-curto"
  );
  curtoBt.classList.add("active");
  startPauseBt.classList.remove("longo-bt");
  startPauseBt.classList.add("curto-bt");
  musica.pause();
  musicaFocoInput.checked = false;
  zerar();
});

longoBt.addEventListener("click", () => {
  tempoDecorridoEmSegundos = 900;
  carregarEVisualizarLottie(
    "https://lottie.host/9724cccb-c401-4d8e-835f-52673344e9fc/0IixeZuWv0.json",
    "descanso-longo"
  );
  longoBt.classList.add("active");
  startPauseBt.classList.remove("curto-bt");
  startPauseBt.classList.add("longo-bt");
  musica.pause();
  musicaFocoInput.checked = false;
  zerar();
});

resetTimerBt.addEventListener("click", () => {
  const contextoAtual = html.getAttribute("data-contexto");
  switch (contextoAtual) {
    case "foco":
      tempoDecorridoEmSegundos = resetValues.foco;
      break;

    case "descanso-curto":
      tempoDecorridoEmSegundos = resetValues.curto;
      break;

    case "descanso-longo":
      tempoDecorridoEmSegundos = resetValues.longo;
      break;

    default:
      break;
  }
  mostrarTempo();
  musica.pause();
  musicaFocoInput.checked = false;
  zerar();
});

const contagemRegressiva = () => {
  if (tempoDecorridoEmSegundos <= 0) {
    audioFim.play();
    audioFim.volume = 0.2;
    alert("Acabou o tempo!");
    zerar();
    return;
  }
  tempoDecorridoEmSegundos -= 1;
  mostrarTempo();
};

startPauseBt.addEventListener("click", iniciarOuPausar);

function iniciarOuPausar() {
  if (intervaloId) {
    audioPausa.play();
    audioPausa.volume = 0.2;
    zerar();
    return;
  }
  audioInicio.play();
  audioInicio.volume = 0.1;
  intervaloId = setInterval(contagemRegressiva, 1000);
  iniciarOuPausarBt.textContent = "Pausar";
  iniciarOuPausarBtIcone.setAttribute("src", `/imagens/pause.png`);
}

function zerar() {
  clearInterval(intervaloId);
  iniciarOuPausarBt.textContent = "Começar";
  iniciarOuPausarBtIcone.setAttribute("src", `/imagens/play_arrow.png`);
  intervaloId = null;
}

function mostrarTempo() {
  const tempo = new Date(tempoDecorridoEmSegundos * 1000);
  const tempoFormatado = tempo.toLocaleTimeString("pt-Pt", {
    minute: "2-digit",
    second: "2-digit",
  });
  tempoNaTela.innerHTML = `${tempoFormatado}`;
}

mostrarTempo();
