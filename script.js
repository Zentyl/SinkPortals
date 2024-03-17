window.onload = initGame();
document.getElementById("restart").addEventListener("click", initGame);

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

clickCell = (cell) => {
    cell.target.innerHTML = "chuj";
    checkWinner();
}

document.querySelectorAll(".cell").forEach(
    cell => cell.addEventListener("click", clickCell)
);


function initGame(){
    var sunkPortals = 0;
    var occupiedCells = [];

    function checkCells(portal){
        for(let i = 0; i < 5; i++){
            if(occupiedCells.includes(portal[i]))
                return true;
        }
    }

    function createHorizontalPortal(portal){
        //Komórki niedostępne dla wylosowanej pozycji ostatniej komórki portalu poziomego
        let forbiddenCells = [];
        for(let i = 0; i < 49; i+=7)
            forbiddenCells.push(i);
        for(let i = 1; i < 49; i+=7)
            forbiddenCells.push(i);
        for(let i = 2; i < 49; i+=7)
            forbiddenCells.push(i);
        let end = 0;
        do{
            //Losowanie pozycji ostatniej komórki portalu poziomego
            do {
                end = Math.floor(Math.random() * 49);
            } while(forbiddenCells.includes(end));

            //Utworzenie portalu poziomego
            portal.push(end - 3, end - 2, end - 1, end);
        } while(checkCells(portal));
        occupiedCells.push(...portal);
    }

    function createVerticalPortal(portal){
        //Komórki niedostępne dla wylosowanej pozycji ostatniej komórki portalu pionowego
        let forbiddenCells = [];
        for(let i = 0; i < 21; i++)
            forbiddenCells.push(i);
        let end = 0;
        //Losowanie pozycji ostatniej komórki portalu pionowego
        do{
            portal.length = 0;
            do {
                end = Math.floor(Math.random() * 49);
            } while(forbiddenCells.includes(end));
            //Utworzenie portalu pionowego
            portal.push(end - 21, end - 14, end - 7, end);
        }while(checkCells(portal));
        occupiedCells.push(...portal);
    }

    function createSquarePortal(portal){
        //Komórki niedostępne dla wylosowanej pozycji ostatniej komórki portalu kwadratowego
        let forbiddenCells = [];
        for(let i = 0; i < 49; i+=7)
            forbiddenCells.push(i);
        for(let i = 1; i < 7; i++)
            forbiddenCells.push(i);
        
        //Losowanie pozycji ostatniej komórki portalu kwadratowego
        let end = 0;
        do{
            portal.length = 0;
            do {
                end = Math.floor(Math.random() * 49);
            } while (forbiddenCells.includes(end));
            //Utworzenie portalu kwadratowego
            portal.push(end - 8, end - 7, end - 1, end);
        }while(checkCells(portal));
        occupiedCells.push(...portal);
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
    checkWinner = () => {
        for(let i = 0; i < portals.length; i++){
            let portal = portals[i];
            let a = getCellValue(portal[0]);
            let b = getCellValue(portal[1]);
            let c = getCellValue(portal[2]);
            let d = getCellValue(portal[3]);
            if(!(a == b && b == c && c == d))
                break
            if(a == b && b == c && c == d){
                sunkPortals ++;
                console.log(sunkPortals);
                continue;
            }
        }
        if(sunkPortals == 3)
            console.log("Wygrałeś");
    }
}
