console.log('JS OK!');

// **************CAMPO MINATO****************

// In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri 
// generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina, 
// altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle 
// altre celle.

// La partita termina quando il giocatore clicca su una bomba o raggiunge il numero massimo 
// possibile di numeri consentiti.
// Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte 
// che l’utente ha cliccato su una cella che non era una b.

// BONUS:
// 1- quando si clicca su una bomba e finisce la partita, evitare che si possa cliccare su 
// altre celle
// 2- quando si clicca su una bomba e finisce la partita, il software scopre tutte le bombe 
// nascoste
// 3- L'utente indica un livello di difficoltà in base al quale viene generata una griglia 
// di gioco quadrata, in cui ogni cella contiene un numero tra quelli compresi in un range:
// con difficoltà 1 => tra 1 e 100
// con difficoltà 2 => tra 1 e 81
// con difficoltà 3 => tra 1 e 49



// GENERO UN PROGRAMMA PER SVILUPPARE LE CELLE IN UNA GRIGLIA,
// QUANTE SONO IN BASE ALLA DIFFICOLTà (EASY, MEDIUM, HARD)
function createElementsInGrid(totalCells, levelClass) {
    // configurazione del programma 
    // const totalCells = 100/81/49; -> glielo passo come parametro su argomento

    // 1. recupero la griglia con l'id
    const grid = document.getElementById('grid');
    // resetto il contenuto della griglia
    grid.innerHTML = '';
    // 2. creo N(in questo caso 100/81/49) div all'interno della griglia
    for (let i = 0; i < totalCells; i++) {
        //      2a. creo l'elemento
        const cell = document.createElement('div');
        cell.id = 'cell-' + (i + 1);
        //      2b. aggiungo eventuali classi CSS per dargli uno stile
        cell.className = 'cell';
        cell.classList.add(levelClass);
        //      2c. associamo il numero da 1 a 100 al testo contenuto nella cella
        cell.innerText = i + 1;
        //      2d. aggiungo l'elemento creato alla griglia 
        grid.appendChild(cell);
    }
}

// GENERARE 16 NUMERI CASUALI NELLO STESSO RANGE (DA 1 A TOTALCELLS)

function generateBombs(max) {
    const positions = [];
    // console.log(positions);

    while (positions.length < 16) {
        const number = generateRandomNumbers(1, max);

        //  I numeri della lista delle bombe non possono essere duplicati.
        if (!positions.includes(number)) {
            positions.push(number);
        }
    }
    return positions;
}

function generateRandomNumbers(min, max) {
    const range = max - min + 1;
    return Math.floor(Math.random() * range) + min;
}

// CONFIGURO L'INTERAZIONE DELL'UTENTE MENTRE GIOCA E SCOVA LE BOMBE

function startGame(totCells, level) {
    const bombPositions = generateBombs(totCells);
    createElementsInGrid(totCells, level);

    for (let i = 1; i <= totCells; i++) {
        const cell = document.getElementById('cell-' + i);
        cell.addEventListener('click', () => {
            console.log(i);

            const isBomb = bombPositions.includes(i);
            if (isBomb) {
                cell.classList.toggle('bg-red');
                grid.innerHTML = '';

                console.log(alert('The End!'));
            } else {
                cell.classList.toggle('bg-blue');
            }
        })
    }
}

// LISTENER DEI PULSANTI 

const buttonEasy = document.getElementById('easy');
const buttonMedium = document.getElementById('medium');
const buttonHard = document.getElementById('hard');

buttonEasy.addEventListener('click', () => startGame(100, 'easy'));
buttonMedium.addEventListener('click', () => startGame(81, 'medium'));
buttonHard.addEventListener('click', () => startGame(49, 'hard'));


// In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri
// generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina,
// altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle
// altre celle.