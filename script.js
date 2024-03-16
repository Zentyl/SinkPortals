let grid = document.querySelector(".grid");
let table = document.createElement("table");
table.className = "center";
grid.appendChild(table);

let cellCounter = 1;

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

function createPortals(portal1, portal2, portal3){
    //Komórki niedostępne dla wylosowanej pozycji ostatniej komórki portalu poziomego
    let forbidden1 = [];
    for(let i = 1; i < 50; i+=7){
        forbidden1.push(i);
    }
    for(let i = 2; i < 50; i+=7){
        forbidden1.push(i);
    }

    //Losowanie pozycji ostatniej komórki portalu poziomego
    let pos1 = 0;
    do {
        pos1 = Math.floor(Math.random() * 49);
    } while(forbidden1.includes(pos1));

    //Utworzenie portalu poziomego
    portal1.push(pos1 - 3, pos1 - 2, pos1 - 1, pos1);

    //Komórki niedostępne dla wylosowanej pozycji ostatniej komórki portalu pionowego
    let forbidden2 = [];
    for(let i = 1; i < 15; i++){
        forbidden2.push(i);
    }

    //Losowanie pozycji ostatniej komórki portalu pionowego
    let pos2 = 0;
    do {
        pos2 = Math.floor(Math.random() * 49);
    } while (forbidden2.includes(pos2) || pos2 == pos1);
    //Utworzenie portalu pionowego
    portal2.push(pos2 - 21, pos2 - 14, pos2 - 7, pos2);

    //Komórki niedostępne dla wylosowanej pozycji ostatniej komórki portalu kwadratowego
    let forbidden3 = [];
    for(let i = 1; i < 50; i+=7){
        forbidden3.push(i);
    }
    for(let i = 2; i < 8; i++){
        forbidden3.push(i);
    }

    //Losowanie pozycji ostatniej komórki portalu kwadratowego
    let pos3 = 0;
    do {
        pos3 = Math.floor(Math.random() * 49);
    } while (forbidden3.includes(pos3) || pos3 == pos1 || pos3 == pos2);
    //Utworzenie portalu kwadratowego
    portal3.push(pos3 - 8, pos3 - 7, pos3 - 1, pos3);
}

let p1 = [];
let p2 = [];
let p3 = [];
createPortals(p1, p2, p3);

console.log(p1);
