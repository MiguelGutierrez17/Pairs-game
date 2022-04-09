const tablero = document.querySelector('tbody');
const imagen = document.querySelector('#back');
const aviso_final = document.querySelector('#finalizado');
const reset_btn = document.querySelector('#resetBtn');
let parejas = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
let board = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
];

iniciarApp();

function iniciarApp() {
    document.addEventListener('DOMContentLoaded', iniciarJuegueo);
    reset_btn.addEventListener('click', reiniciarTablero);
}

function iniciarJuegueo() {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            const valorRandom = parejas[Math.floor(Math.random() * parejas.length)];
            board[i][j] = valorRandom;
            for (let k = 0; k < parejas.length; k++) {
                if (parejas[k] === valorRandom) {
                    valorIndex = parejas.indexOf(parejas[k]);
                    parejas.splice(valorIndex, 1);
                }
            }
        }
    }
    crearTablero()
}

function crearTablero() {
    for (let i = 0; i < board.length; i++) {
        let row = document.createElement('tr');
        for (let j = 0; j < board[i].length; j++) {
            row.innerHTML += `<td> <img class="piece" src="./img/${board[i][j]}.png"'><img class="back" src="./img/back.png"' data-id='${board[i][j]}'> </td>`;
            tablero.appendChild(row).addEventListener('click', tocarImagen);
        }
    }
}

let e1 = 0;
let e2 = 0;
let id_1 = 0;
let id_2 = 0;
let intentos = 0;
let intentos_totales = 0;
let final = 0;
let id_intentos = [];
id_intentos.length = 2;

function tocarImagen(e) {
    if (intentos === 0) {
        let id = e.target.getAttribute('data-id');
        if (id !== null) {
            e1 = e;
            id_1 = id;
            id_intentos[0] = id_1;
            intentos++;
            if (e.target.classList.contains('back')) {
                e.target.classList.remove('back');
                e.target.classList.add('back-selected');
            }
        }
    } else if (intentos === 1) {
        let id = e.target.getAttribute('data-id');
        if (id !== null) {
            e2 = e;
            id_2 = id;
            id_intentos[1] = id_2;
            intentos++;
            if (e.target.classList.contains('back')) {
                e.target.classList.remove('back');
                e.target.classList.add('back-selected');
            }
            if (id_intentos[0] !== id_intentos[1]) {
                setTimeout(() => {
                    intentos_totales++;
                    taparIncorrecto(e1, e2);
                    resetIntentos();
                }, 1000);
            } else if (id_intentos[0] === id_intentos[1]) {
                intentos_totales++;
                buenosIntentos();
                mantenerCorrectos(e1, e2);
                resetIntentos();
            }
        }
    }
}

function taparIncorrecto(x1, x2) {
    x1.target.classList.remove('back-selected');
    x1.target.classList.add('back');
    x2.target.classList.remove('back-selected');
    x2.target.classList.add('back');
    resetIntentos();
}

function mantenerCorrectos(y1, y2) {
    y1.target.parentElement.style.cursor = 'not-allowed';
    y2.target.parentElement.style.cursor = 'not-allowed';
    resetIntentos();
}

function buenosIntentos() {
    final++;
    if (final === 8) {
        aviso_final.innerHTML = `Juego finalizado con ${intentos_totales} intentos.`;
    }
}

function resetIntentos() {
    intentos = 0;
    id_intentos = [];
    id_intentos.length = 2;
}

function reiniciarTablero() {
    tablero.innerHTML = '';
    parejas = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
    e1 = 0;
    e2 = 0;
    id_1 = 0;
    id_2 = 0;
    intentos = 0;
    intentos_totales = 0;
    final = 0;
    id_intentos = [];
    id_intentos.length = 2;
    aviso_final.innerHTML = '';
    iniciarJuegueo();
}