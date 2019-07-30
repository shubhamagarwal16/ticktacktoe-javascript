let player1 = "";
let player2 = "";
let turn = 1;
const winCases = {
    '00': [['01', '02'], ['10', '20'], ['11', '22']],
    '01': [['00', '02'], ['11', '21']],
    '02': [['00', '01'], ['12', '22'], ['11', '20']],
    '10': [['00', '20'], ['11', '12']],
    '11': [['00', '22'], ['02', '20'], ['10', '12'], ['01', '21']],
    '12': [['02', '22'], ['10', '11']],
    '20': [['00', '10'], ['21', '22'], ['11', '02']],
    '21': [['20', '22'], ['01', '11']],
    '22': [['20', '21'], ['02', '12'], ['00', '11']]
};

// setPlayers();
createLayout();


// ==================== ADD PLAYER ==============================
function setPlayers() {
    if (player1 && player2) {
        document.querySelector(".ticktaktoe").style.display = "block";
        document.querySelector("#mainStartBtn").style.display = "none";
        document.querySelector("#scoreDashboard").style.display = "block";
        $("#setPlayerModal").modal("hide");
        createLayout();
        scoreDashboard();
        return;
    }

    document.querySelector("#mainStartBtn").style.display = "block";
    document.querySelector(".ticktaktoe").style.display = "none";
    document.querySelector("#scoreDashboard").style.display = "none";
}

//========================= DASHBOARD ===============================
function scoreDashboard() {
    document.getElementById("player1Name").innerText = player1;
    document.getElementById("player2Name").innerText = player2;

}

// ============================= INIT ===========================================
function init(e) {
    e.preventDefault();

    player1 = document.getElementById("player1").value;
    player2 = document.getElementById("player2").value;

    if (player1 && player2) {
        setPlayers();
    }
}
// ===================================== CREATING LAYOUT==================================
function createLayout() {
    for (i in [1, 2, 3]) {
        temp = document.createElement("div");
        temp.className = "row";
        temp.setAttribute("id", `rowID${i}`);

        for (j in [1, 2, 3]) {
            let temp2 = document.createElement("div");
            temp2.classList.add('col', 'toe-Box');
            temp2.setAttribute("id", `rowCol${i}${j}`);
            // temp2.appendChild(document.createTextNode(`${i}${j}`));
            temp2.addEventListener('click', addDataToBlock);
            temp.appendChild(temp2);
        }
        document.querySelector(".ticktaktoe").appendChild(temp);
        // layout += `
        // <div id="rowID${i}" class="row">
        // <div id="rowCol${i}1" class="col toe-Box"></div>
        // <div id="rowCol${i}2" class="col toe-Box"></div>
        // <div id="rowCol${i}3" class="col toe-Box"></div>
        // </div>
        // `;
    }
    // document.querySelector(".ticktaktoe").innerHTML = layout;
}

function addDataToBlock(event) {
    if (event.target.innerText) return;

    let type = "O";
    if (turn === 1) type = "X";

    let currentElement = document.getElementById(event.target.id);
    currentElement.innerText = type;
    currentElement.style.color = turn === 1 ? "red" : "black";
    currentElement.removeEventListener("click", addDataToBlock);

    turn = turn === 1 ? 2 : 1;

    checkForMatch(event.target.id);
}

function checkForMatch(id) {
    let currentValue = document.getElementById(id).innerText;
    id = id.slice(6);

    if (!winCases[id]) {
        alert("Something went wrong");
        return;
    }

    for (i in winCases[id]) {
        let temp = winCases[id][i];
        let innerLoop = true;

        for (j in temp) {
            if (document.getElementById(`rowCol${temp[j]}`).innerText !== currentValue) break;            
            else if (parseInt(j) + 1 == temp.length) { createMatch(id, temp); innerLoop = false; break; }
        }
        if (!innerLoop) break;
    }
}

function createMatch(id, arr) {    
    document.getElementById(`rowCol${id}`).style.backgroundColor = "yellow";
    document.getElementById(`rowCol${arr[0]}`).style.backgroundColor = "yellow";
    document.getElementById(`rowCol${arr[1]}`).style.backgroundColor = "yellow";

    // alert( (turn ===1 ? player1 : player2) + " won!!");
    resetMatch();
}

function resetMatch(){
// console.log("==============")
}