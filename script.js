//Tworzenie planszy gry
const grid = document.querySelector(".grid");
const table = document.createElement("table");
table.className = "center";
grid.appendChild(table);

let cellCounter = 0; //Licznik komorek

//Tworzenie komorek
for (let i = 0; i < 7; i++) {
    const tr = document.createElement("tr");
    table.appendChild(tr);
    for (let j = 0; j < 7; j++) {
        const td = document.createElement("td");
        let cell = document.createElement("div");
        cell.className = "cell";
        cell.setAttribute("index", cellCounter);
        cell.innerHTML = cellCounter;
        cell.style = "background: darkgray";
        td.appendChild(cell);
        table.appendChild(td);
        cellCounter++;
    }
}

//Liczniki niezatopionych komorek poszczegolnych portali
let horizontalCounter = 4;
let verticalCounter = 4;
let squareCounter = 4;

let portalCounter = 12; //Licznik niezatopionych komorek wszystkich portali

let stepsCounter = 0; //Licznik krokow gracza

//Akcje wykonywane po kliknieciu gracza w tabele
function clickCell(cell) {
    if (cell.target.getAttribute("portal") == "horizontal") {
        cell.target.style = "background: url(1.png)";
        portalCounter--;
        horizontalCounter--;
        if (horizontalCounter == 0)
            document.getElementById("action").innerHTML = "TRAFIONY ZATOPIONY FACEBOOK";
        else
            document.getElementById("action").innerHTML = "TRAFIONY";
    }
    else if (cell.target.getAttribute("portal") == "vertical") {
        cell.target.style = "background: url(2.png)";
        portalCounter--;
        verticalCounter--;
        if (verticalCounter == 0)
            document.getElementById("action").innerHTML = "TRAFIONY ZATOPIONY YOUTUBE";
        else
            document.getElementById("action").innerHTML = "TRAFIONY";
    }
    else if (cell.target.getAttribute("portal") == "square") {
        cell.target.style = "background: url(3.png)";
        portalCounter--;
        squareCounter--;
        if (squareCounter == 0)
            document.getElementById("action").innerHTML = "TRAFIONY ZATOPIONY TIKTOK";
        else
            document.getElementById("action").innerHTML = "TRAFIONY";
    }
    else {
        cell.target.style = "background: url(wrong.png)";
        document.getElementById("action").innerHTML = "PUDŁO";
    }
    cell.target.innerHTML = ".";
    stepsCounter++;
    cell.target.removeEventListener("click", clickCell);
    document.getElementById("steps").innerHTML = "WYKONANE RUCHY: " + stepsCounter;
    checkEnd();
}

//Nadanie komorkom mozliwosci bycia kliknietymi
document.querySelectorAll(".cell").forEach(
    cell => cell.addEventListener("click", clickCell)
);

//Sprawdzanie czy w poszczegolnych komorkach nie istnieje juz inny portal
let cellsOccupied = [];
function checkCells(portal) {
    for (let i = 0; i < 5; i++) {
        if (cellsOccupied.includes(portal[i]))
            return true;
    }
}

//Tworzenie portali
function createHorizontalPortal(portal) {
    //Komórki niedostepne dla wylosowanej ostatniej komorki portalu poziomego
    let cellsForbidden = [];
    for (let i = 0; i < 49; i += 7)
        cellsForbidden.push(i);
    for (let i = 1; i < 49; i += 7)
        cellsForbidden.push(i);
    for (let i = 2; i < 49; i += 7)
        cellsForbidden.push(i);
    let end = 0;
    do {
        //Losowanie ostatniej komorki portalu poziomego
        do {
            end = Math.floor(Math.random() * 49);
        } while (cellsForbidden.includes(end));

        //Tworzenie portalu poziomego
        portal.push(end - 3, end - 2, end - 1, end);
    } while (checkCells(portal));
    cellsOccupied.push(...portal);
    for (let i = 0; i < 4; i++)
        document.querySelector(`.cell[index='${portal[i]}']`).setAttribute("portal", "horizontal");
}

function createVerticalPortal(portal) {
    //Komórki niedostepne dla wylosowanej ostatniej komorki portalu pionowego
    let cellsForbidden = [];
    for (let i = 0; i < 21; i++)
        cellsForbidden.push(i);
    let end = 0;
    //Losowanie pozycji ostatniej komórki portalu pionowego
    do {
        portal.length = 0;
        do {
            end = Math.floor(Math.random() * 49);
        } while (cellsForbidden.includes(end));
        //Tworzenie portalu pionowego
        portal.push(end - 21, end - 14, end - 7, end);
    } while (checkCells(portal));
    cellsOccupied.push(...portal);
    for (let i = 0; i < 4; i++)
        document.querySelector(`.cell[index='${portal[i]}']`).setAttribute("portal", "vertical");
}

function createSquarePortal(portal) {
    //Komórki niedostepne dla wylosowanej ostatniej komorki portalu kwadratowego
    let cellsForbidden = [];
    for (let i = 0; i < 49; i += 7)
        cellsForbidden.push(i);
    for (let i = 1; i < 7; i++)
        cellsForbidden.push(i);

    //Losowanie pozycji ostatniej komórki portalu kwadratowego
    let end = 0;
    do {
        portal.length = 0;
        do {
            end = Math.floor(Math.random() * 49);
        } while (cellsForbidden.includes(end));
        //Tworzenie portalu kwadratowego
        portal.push(end - 8, end - 7, end - 1, end);
    } while (checkCells(portal));
    cellsOccupied.push(...portal);
    for (let i = 0; i < 4; i++)
        document.querySelector(`.cell[index='${portal[i]}']`).setAttribute("portal", "square");
}

//Utworzenie portali
const horizontalPortal = [];
createHorizontalPortal(horizontalPortal);
const verticalPortal = [];
createVerticalPortal(verticalPortal);
const squarePortal = [];
createSquarePortal(squarePortal);

const portals = [horizontalPortal, verticalPortal, squarePortal]; //Tabela zawierajaca portale

//Funkcja zwracajaca indeks komorki portalu
function getCellValue(i) {
    return document.querySelector(`.cell[index='${i}']`).innerHTML;
}

//Sprawdzanie czy portal poziomy zostal zatopiony
function checkHorizontal() {
    const a = getCellValue(portals[0][0]);
    const b = getCellValue(portals[0][1]);
    const c = getCellValue(portals[0][2]);
    const d = getCellValue(portals[0][3]);
    if (a == b && b == c && c == d) {
        return true;
    }
}

//Sprawdzanie czy portal pionowy zostal zatopiony
function checkVertical() {
    const a = getCellValue(portals[1][0]);
    const b = getCellValue(portals[1][1]);
    const c = getCellValue(portals[1][2]);
    const d = getCellValue(portals[1][3]);
    if (a == b && b == c && c == d) {
        return true;
    }
}

//Sprawdzanie czy portal kwadratowy zostal zatopiony
function checkSquare() {
    const a = getCellValue(portals[2][0]);
    const b = getCellValue(portals[2][1]);
    const c = getCellValue(portals[2][2]);
    const d = getCellValue(portals[2][3]);
    if (a == b && b == c && c == d) {
        return true;
    }
}

//Sprawdzanie czy wszystkie portale zostaly zatopione
function checkEnd() {
    if (checkHorizontal() && checkVertical() && checkSquare()) {
        document.getElementById("action").innerHTML = "KONIEC GRY";
        document.getElementById("steps").innerHTML = "UDAŁO CI SIĘ W " + stepsCounter + " RUCHACH";
        document.querySelectorAll(".cell").forEach(
            cell => cell.removeEventListener("click", clickCell)
        ); //Usuniecie mozliwosci klikania przez gracza w komorki
    }
}