const player1 = "";
const player2 = "";

setPlayers();

// ==================== ADD PLAYER ==============================
function setPlayers(){
    if(player1 && player2) return;
    
    document.querySelector(".ticktaktoe").style.display = "none";
    document.querySelector("#setPlayerModal").modal("show")
}

// document.querySelectorAll(".toe-Box").map(ele => {
//     ele.addEventListener("click", () => {
//         alert("s")
//     })
// })