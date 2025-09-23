// Game sequence and user sequence
let gameSeq = [];
let userSeq = [];

// Available button colors
let btns = ["red", "yellow", "green", "purple"];

let started = false; 
let level = 0;       
let h3 = document.querySelector("h3");

// Start the game on key press
document.addEventListener("keypress", function(){
    if(started === false){
        started = true;
        console.log("🎮 Game Started");
        levelUp();
    }
});

// Function to increase level and show next button
function levelUp(){
    userSeq = []; // Reset user sequence for new level
    level++;
    h3.innerText = `Level ${level}`;
    console.log(`⭐ Level ${level}`);

    // Choose a random button
    let randIdx = Math.floor(Math.random() * 4); 
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);

    // Add chosen color to game sequence
    gameSeq.push(randColor);
    console.log(`Simon flashed: ${randColor}`);

    // Flash the chosen button
    btnFlash(randBtn);
}

// Flash effect for button
function btnFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    }, 300);
}
// Add event listeners to all buttons
let allBtns = document.querySelectorAll(".btn");
for(let btn of allBtns){
    btn.addEventListener("click", btnPress);
}
// When user clicks a button
function btnPress(){
    let btn = this;
    btnFlash(btn);

    // Get button color (id) and add to user sequence
    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    console.log(`👉 You clicked: ${userColor}`);

    // Check answer after each click
    checkAnswer(userSeq.length - 1);
}

// Check if user's answer is correct
function checkAnswer(currentLevel){
    if(userSeq[currentLevel] === gameSeq[currentLevel]){
        console.log("✅ Correct so far");
        // If user completed the whole sequence correctly
        if(userSeq.length === gameSeq.length){
            console.log("🎉 Sequence completed! Moving to next level...");
            setTimeout(levelUp, 1000); 
        }
    } else {
        // Game over
        console.log("❌ Wrong choice! Game Over.");
        h3.innerText = "Game Over! Press any key to restart.";
        resetGame();
    }
}

// Reset the game
function resetGame(){
    console.log("🔄 Game reset. Waiting for new start...");
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}


