let cartaSeleccionada = null;
let cartasVolteadas = 0;
let tiempoTranscurrido = 0;
const totalParejas = 12;
let intervalo;

function cargarIconos() {
    return [
        '<i class="fa-solid fa-hippo"></i>',
        '<i class="fa-solid fa-poo-storm"></i>',
        '<i class="fa-solid fa-bug"></i>',
        '<i class="fa-solid fa-user-secret"></i>',
        '<i class="fa-solid fa-dragon"></i>',
        '<i class="fa-brands fa-react"></i>',
        '<i class="fa-solid fa-dumbbell"></i>',
        '<i class="fa-solid fa-otter"></i>',
        '<i class="fa-solid fa-kiwi-bird"></i>',
        '<i class="fa-solid fa-spaghetti-monster-flying"></i>',
        '<i class="fa-solid fa-shrimp"></i>',
        '<i class="fa-regular fa-heart"></i>',
    ];
}

function generarjuego() {
    clearInterval(intervalo);
    tiempoTranscurrido = 0;
    document.getElementById('tiempo').textContent = tiempoTranscurrido;
    intervalo = setInterval(() => {
        tiempoTranscurrido++;
        document.getElementById('tiempo').textContent = tiempoTranscurrido;
    }, 1000);

    let iconos = cargarIconos().concat(cargarIconos());
    iconos.sort(() => Math.random() - 0.5);
    let tablero = document.getElementById("juego");
    let cartas = "";

    let reglas = `
    <div id="mensajeReglas">
        <p>REGLAS MEMORY:</p>
        <ol>
            <li>El juego consiste en levantar las cartas de dos en dos hasta encontrar las dos que son iguales.</li>
            <li>Tienes unos segundos antes para intentar memorizar el máximo de cartas ya que el objetivo de este es hacerlo en el menor tiempo posible.</li>
            <li>Disfruta y ejercita la memoria.</li>
        </ol>
        <button onclick="empezarJuego()">OK</button>
    </div>
    `;
    tablero.innerHTML = reglas;
}

function empezarJuego() {
    document.getElementById("mensajeReglas").style.display = "none";
    let iconos = cargarIconos().concat(cargarIconos());
    iconos.sort(() => Math.random() - 0.5);
    let tablero = document.getElementById("juego");
    let cartas = "";
    for (let i = 0; i < totalParejas * 2; i++) {
        let icono = iconos[i];
        cartas += `
        <div class="tamano-c" onclick="voltearCarta(this)">
            <div class="carta">
                <div class="cara trasera">
                    ${icono}
                </div>    
                <div class="cara superior">
                    <i class="fas fa-question"></i>
                </div>
            </div>
        </div>
        `;
    }
    tablero.innerHTML = cartas;

    let reinicioBtn = document.createElement("div");
    reinicioBtn.classList.add("reinicio");
    reinicioBtn.innerHTML = "Reiniciar";
    reinicioBtn.onclick = generarjuego;
    tablero.appendChild(reinicioBtn);
}

function voltearCarta(carta) {
    if (carta.classList.contains('volteada') || cartasVolteadas === 2) {
        return;
    }
    
    carta.querySelector('.carta').style.transform = 'rotateY(180deg)';
    carta.classList.add('volteada');
    cartasVolteadas++;
    
    if (!cartaSeleccionada) {
        cartaSeleccionada = carta;
    } else {
        const icono1 = cartaSeleccionada.querySelector('.trasera').innerHTML;
        const icono2 = carta.querySelector('.trasera').innerHTML;
        if (icono1 === icono2) {
            setTimeout(() => {
                cartaSeleccionada = null;
                cartasVolteadas = 0;
                if (document.querySelectorAll('.volteada').length === totalParejas * 2) {
                    clearInterval(intervalo);
                    document.getElementById('mensajeFelicidad').style.display = 'block';
                    setTimeout(() => {
                        document.getElementById('mensajeFelicidad').style.display = 'none';
                    }, 2000);
                }
            }, 500);
        } else {
            setTimeout(() => {
                cartaSeleccionada.querySelector('.carta').style.transform = 'rotateY(0deg)';
                carta.querySelector('.carta').style.transform = 'rotateY(0deg)';
                cartaSeleccionada.classList.remove('volteada');
                carta.classList.remove('volteada');
                cartaSeleccionada = null;
                cartasVolteadas = 0;
            }, 1000);
        }
    }
}

window.onload = generarjuego;