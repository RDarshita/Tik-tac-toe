let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO= true;//playerX, playerY

const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];

const resetGame = () =>{
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
}

boxes.forEach((box) => {
    box.addEventListener("click",() =>{
    console.log("Box was clicked.");
    if(turnO){
        //playerO
        box.innerText = "O";
        turnO = false;
    }else{
        //playerX
        box.innerText = "X";
        turnO = true;
    }
    box.disabled = true;
    checkWinner();
    checkWinnerOrDraw();
  });
});

const disableBoxes = () => {
    for(let box of boxes){
        box.disabled = true;
    }
}

const enableBoxes = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText= "";
    }
}

const showWinner = (winner) =>{
    msg.innerText = `Congratulations,Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const checkWinner = () => {
    for(let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
        if(pos1Val == pos2Val && pos2Val == pos3Val){
            console.log("winner",pos1Val);
            showWinner(pos1Val);
            }
        }
    }
};

newGameBtn.addEventListener("click",resetGame);
resetBtn.addEventListener("click",resetGame);

document.addEventListener('DOMContentLoaded', function() {
    const iconButton = document.getElementById('icon-btn');
    const icon = document.getElementById('icon');
    const backgroundMusic = document.getElementById('background-music');

    // Add click event listener to icon button
    iconButton.addEventListener('click', function() {
        // Toggle between two different icons
        if (icon.classList.contains('fa-volume-up')) {
            icon.classList.remove('fa-volume-up');
            icon.classList.add('fa-volume-off');
            // Pause the music
            backgroundMusic.pause();
        } else {
            icon.classList.remove('fa-volume-off');
            icon.classList.add('fa-volume-up');
            // Play the music
            backgroundMusic.play();
        }
    });
});

const checkDraw = () => {
    for (let box of boxes) {
        if (box.innerText === "") {
            // If any box is empty, the game is not a draw
            return false;
        }
    }
    // If all boxes are filled and no winner is found, it's a draw
    return true;
};

const checkWinnerOrDraw = () => {
    if (checkDraw()) {
        // If it's a draw, show a message
        showDraw();
    } else {
        // If it's not a draw, check for a winner
        checkWinner();
    }
};

const showDraw = () => {
    msg.innerText = "It's a draw!";
    msgContainer.classList.remove("hide");
    disableBoxes();
};

