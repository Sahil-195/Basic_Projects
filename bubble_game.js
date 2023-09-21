let timer = 60;
let score = 0;
let hitrn = 0;
let timerint;
let isgameon = 0;

// number of bubbles in a row
let nr = Math.floor(((document.querySelector('#pbtm').clientWidth) - 30 + 10)/60);
// number of bubbles in a column
let nc = Math.floor(((document.querySelector('#pbtm').clientHeight) - 30 + 10)/60);
// Total number og bubbles
let tb = nr*nc;

// To increase the score when the user hit the correct bubble
function increaseScore() {
    score += 10;
    document.querySelector("#scoreval").textContent = score;
}

// To generate a new hit after every correct hit click
function getNewHit() {
    hitrn = Math.floor(Math.random()*10);
    document.querySelector("#hitval").textContent = hitrn;
}

// To generate new bubbles after every correct hit click
function makeBubble() {
    let clutter = "";

    for (let i = 1; i <= tb; i++) {
        rn = Math.floor(Math.random() * 10);
        clutter += `<div class="bubble">${rn}</div>`;
    }
    document.querySelector("#pbtm").innerHTML = clutter;
}

// To run timer
function runTimer() {
    timerint = setInterval(function () {
        if(timer > 0) {
            timer--;
            document.querySelector("#timerval").textContent = `${timer}s`;
        }
        else {
            isgameon = 0;
            clearInterval(timerint);
            document.querySelector("#pbtm").innerHTML = `<p id="game-over">Game Over, your score is ${score}</p>`;
            score = 0;
            document.querySelector("#btn").innerHTML = "Start Game";
        }
    }, 1000);
}

// Checking whether the clicked button is correct or not
document.querySelector("#pbtm").addEventListener("click",function(dets) {
    let clickednum = Number(dets.target.textContent);
    let bub = dets.target;
    if(bub.className=="bubble" && clickednum === hitrn) {
        let all_bub = document.querySelectorAll('.bubble');
        all_bub.forEach(elem => {
        if(elem.style.backgroundColor=='red') {
                elem.style.backgroundColor = 'rgba(0, 0, 0, 0.582)';
            }
        });

        bub.style.animationName = "rot";
        bub.style.animationDuration = "1s";
        bub.style.backgroundColor = "limegreen";
        setTimeout(() => {
            if(timer>1) {
                makeBubble();
            }
        }, 1000);   
        getNewHit();
        increaseScore();
    }
    else if(bub.className=="bubble"){
        bub.style.animationName = "rot";
        bub.style.animationDuration = "1s";
        bub.style.backgroundColor = "red";
    }
})


// Start button click event
document.querySelector("#btn").addEventListener("click",function() {

    if(isgameon==0) {
        isgameon = 1;
        timer = 60;
        document.querySelector("#scoreval").textContent = 0;
        makeBubble();
        runTimer();
        getNewHit();
        document.querySelector("#timerval").textContent = "30s";
        document.querySelector("#btn").innerHTML = "Quit Game";
    }
    else {
        isgameon = 0;
        clearInterval(timerint);
        document.querySelector("#btn").innerHTML = "Start Game";
        document.querySelector("#pbtm").innerHTML = `<p id="game-over">Game Over, your score is ${score}</p>`;
        score = 0;
    }
})
