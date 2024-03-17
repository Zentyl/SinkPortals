let grid = document.querySelector(".grid");
let table = document.createElement("table");
table.className = "center";
grid.appendChild(table);

let cellCounter = 0;
let stepsCounter = 0;

for (let i = 0; i < 7; i++) {
    tr = document.createElement("tr");
    table.appendChild(tr);
    for (let j = 0; j < 7; j++) {
        td = document.createElement("td");
        cell = document.createElement("div");
        cell.className = "cell";
        cell.setAttribute("index", cellCounter);
        cell.innerHTML = cellCounter;
        cell.style="background: url(hidden.png)";
        td.appendChild(cell);
        table.appendChild(td);
        cellCounter++;
    }
}


clickCell = (cell) => {
    if(cell.target.getAttribute("portal") == "horizontal"){
        cell.target.style="background: url(1.png)";
    }
    else if(cell.target.getAttribute("portal") == "vertical"){
        cell.target.style="background: url(2.png)";
    }
    else if(cell.target.getAttribute("portal") == "square"){
        cell.target.style="background: url(3.png)";
    }
    else
        cell.target.style="background: url(wrong.png)";
    cell.target.innerHTML=".";
    stepsCounter++;
    cell.target.removeEventListener("click", clickCell);
    checkWinner();
    console.log(stepsCounter);
    document.getElementById("steps").innerHTML = "Wykonane kroki: " + stepsCounter;
}


document.querySelectorAll(".cell").forEach(
    cell => cell.addEventListener("click", clickCell)
);

var cellsOccupied = [];
var leftPortals = 3;
var leftImages = 3;
function checkCells(portal) {
    for (let i = 0; i < 5; i++) {
        if (cellsOccupied.includes(portal[i]))
            return true;
    }
}


function createHorizontalPortal(portal) {
    //Komórki niedostępne dla wylosowanej pozycji ostatniej komórki portalu poziomego
    let cellsForbidden = [];
    for (let i = 0; i < 49; i += 7)
        cellsForbidden.push(i);
    for (let i = 1; i < 49; i += 7)
        cellsForbidden.push(i);
    for (let i = 2; i < 49; i += 7)
        cellsForbidden.push(i);
    let end = 0;
    do {
        //Losowanie pozycji ostatniej komórki portalu poziomego
        do {
            end = Math.floor(Math.random() * 49);
        } while (cellsForbidden.includes(end));

        //Utworzenie portalu poziomego
        portal.push(end - 3, end - 2, end - 1, end);
    } while (checkCells(portal));
    cellsOccupied.push(...portal);
    for (let i = 0; i < 4; i++)
        document.querySelector(`.cell[index='${portal[i]}']`).setAttribute("portal", "horizontal");
}

function createVerticalPortal(portal) {
    //Komórki niedostępne dla wylosowanej pozycji ostatniej komórki portalu pionowego
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
        //Utworzenie portalu pionowego
        portal.push(end - 21, end - 14, end - 7, end);
    } while (checkCells(portal));
    cellsOccupied.push(...portal);
    for (let i = 0; i < 4; i++)
        document.querySelector(`.cell[index='${portal[i]}']`).setAttribute("portal", "vertical");
}

function createSquarePortal(portal) {
    //Komórki niedostępne dla wylosowanej pozycji ostatniej komórki portalu kwadratowego
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
        //Utworzenie portalu kwadratowego
        portal.push(end - 8, end - 7, end - 1, end);
    } while (checkCells(portal));
    cellsOccupied.push(...portal);
    for (let i = 0; i < 4; i++)
        document.querySelector(`.cell[index='${portal[i]}']`).setAttribute("portal", "square");
}

let horPortal = [];
createHorizontalPortal(horPortal);
let verPortal = [];
createVerticalPortal(verPortal);
let sqPortal = [];
createSquarePortal(sqPortal);

const portals = [horPortal, verPortal, sqPortal];

console.log(horPortal);
console.log(verPortal);
console.log(sqPortal);

getCellValue = (i) => {
    return document.querySelector(`.cell[index='${i}']`).innerHTML;
}

checkHorizontal = () => {
    let a = getCellValue(portals[0][0]);
    let b = getCellValue(portals[0][1]);
    let c = getCellValue(portals[0][2]);
    let d = getCellValue(portals[0][3]);
    if (a == b && b == c && c == d) {
        return true;
    }
}

checkVertical = () => {
    let a = getCellValue(portals[1][0]);
    let b = getCellValue(portals[1][1]);
    let c = getCellValue(portals[1][2]);
    let d = getCellValue(portals[1][3]);
    if (a == b && b == c && c == d) {
        return true;
    }
}

checkSquare = () => {
    let a = getCellValue(portals[2][0]);
    let b = getCellValue(portals[2][1]);
    let c = getCellValue(portals[2][2]);
    let d = getCellValue(portals[2][3]);
    if (a == b && b == c && c == d) {
        return true;
    }
}

checkWinner = () => {
    if (checkHorizontal() && checkVertical() && checkSquare())
        console.log("Wygrałeś");
}



