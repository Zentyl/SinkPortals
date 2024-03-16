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
let portal1 = [pos1 - 3, pos1 - 2, pos1 - 1, pos1];

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
let portal2 = [pos2 - 21, pos2 - 14, pos2 - 7, pos2];

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
let portal3 = [pos3 - 8, pos3 - 7, pos3 - 1, pos3];

console.log(portal1);
console.log(portal2);
console.log(portal3);

window.onload = function()
{
    app.init();
}

class App{
    init = () => {
        document.querySelectorAll(".cell").forEach(
            cell => cell.addEventListener("click", this.cellClick)
        );
    }
    cellClick = (e) => {
        e.target.innerHTML = "test";
    }
}

const app = new App();
