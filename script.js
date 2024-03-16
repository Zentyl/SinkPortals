let grid = document.querySelector(".grid");
let table = document.createElement("table");
table.className = "center";
grid.appendChild(table);

let cellCounter = 0;

for(let i = 0; i < 7; i++){
    tr = document.createElement("tr");
    table.appendChild(tr);
    for(let j = 0; j < 7; j++){
        td = document.createElement("td");
        cell = document.createElement("div");
        cell.className = "cell";
        cell.setAttribute("index", cellCounter);
        cell.innerHTML = cellCounter;
        td.appendChild(cell);
        table.appendChild(td);
        cellCounter ++;
    }
}

var occupiedCells = [];

function checkCells(portal){
    for(let i = 0; i < 5; i++){
        if(occupiedCells.includes(portal[i])){
            return true;
        }
    }
}

function createHorizontalPortal(portal){
    //Komórki niedostępne dla wylosowanej pozycji ostatniej komórki portalu poziomego
    let forbidden = [];
    for(let i = 0; i < 49; i+=7){
        forbidden.push(i);
    }
    for(let i = 1; i < 49; i+=7){
        forbidden.push(i);
    }
    for(let i = 2; i < 49; i+=7){
        forbidden.push(i);
    }
    let end = 0;
    do{
        //Losowanie pozycji ostatniej komórki portalu poziomego
        do {
            end = Math.floor(Math.random() * 49);
        } while(forbidden.includes(end));

        //Utworzenie portalu poziomego
        portal.push(end - 3, end - 2, end - 1, end);
    } while(checkCells(portal));
    occupiedCells.push(...portal);
}


function createVerticalPortal(portal){
    //Komórki niedostępne dla wylosowanej pozycji ostatniej komórki portalu pionowego
    let forbidden = [];
    for(let i = 0; i < 21; i++){
        forbidden.push(i);
    }
    let end = 0;
    //Losowanie pozycji ostatniej komórki portalu pionowego
    do{
        portal.length = 0;
        do {
            end = Math.floor(Math.random() * 49);
        } while(forbidden.includes(end));
        //Utworzenie portalu pionowego
        portal.push(end - 21, end - 14, end - 7, end);
    }while(checkCells(portal));
    occupiedCells.push(...portal);
}

function createSquarePortal(portal){
    //Komórki niedostępne dla wylosowanej pozycji ostatniej komórki portalu kwadratowego
    let forbidden = [];
    for(let i = 0; i < 49; i+=7){
        forbidden.push(i);
    }
    for(let i = 1; i < 7; i++){
        forbidden.push(i);
    }
    
    //Losowanie pozycji ostatniej komórki portalu kwadratowego
    let end = 0;
    do{
        portal.length = 0;
        do {
            end = Math.floor(Math.random() * 49);
        } while (forbidden.includes(end));
        //Utworzenie portalu kwadratowego
        portal.push(end - 8, end - 7, end - 1, end);
    }while(checkCells(portal));
    occupiedCells.push(...portal);
}

let p1 = [];
createHorizontalPortal(p1);
let p2 = [];
createVerticalPortal(p2);
let p3 = [];
createSquarePortal(p3);


console.log(p1);
console.log(p2);
console.log(p3);
