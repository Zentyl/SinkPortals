let grid = document.querySelector(".grid");
let table = document.createElement("table");
table.className = "center";
grid.appendChild(table);

for(let i = 0; i < 7; i++){
    tr = document.createElement("tr");
    table.appendChild(tr);
    for(let j = 0; j < 7; j++){
        td = document.createElement("td");
        cell = document.createElement("div");
        cell.className = "cell";
        cell.innerHTML = j+1;
        cell.setAttribute("index", j);
        td.appendChild(cell);
        table.appendChild(td);
    }
}
//divy w table spróbuj zrobić