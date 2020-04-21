const choices = ["rock","paper","scissors"]
function playRound(playerChoice, computerChoice){
    const pointComputer = "pointComputer"
    const pointPlayer = "pointPlayer"
    const tie = "tie"
    if(playerChoice === computerChoice){
        console.log("Tie! You chose: " + playerChoice + " and computer chose: " + computerChoice);
        return tie;
    }
    if(playerChoice === "rock" && computerChoice === "paper"){
        return pointComputer;
    }
    if(playerChoice === "paper" && computerChoice === "rock"){
        return pointPlayer;
    }
    if(playerChoice === "rock" && computerChoice === "scissors"){
        return pointPlayer;
    }
    if(playerChoice === "scissors" && computerChoice === "rock"){
        return pointComputer;
    }
    if(playerChoice === "paper" && computerChoice === "scissors"){
        return pointComputer;
    }
    if(playerChoice === "scissors" && computerChoice === "paper"){
        return pointPlayer;
    }
}

function randomIntFromInterval(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

function computerPlay(){
    return choices[randomIntFromInterval(0,2)];
}

const roundsInput = document.querySelector('input');
const roundsLabel = document.querySelector('label[for=rounds]');
setRounds();

function setRounds(){
    roundsLabel.textContent = roundsInput.value;
}

roundsInput.addEventListener('change', setRounds);
roundsInput.addEventListener('mousemove', setRounds);

function handleBtnAction(e){
    let button = e.target;
    button.classList.toggle('clicked');
}

function handleButtonActionEnd(e){
    if(this.classList.value.includes('clicked')){
        let button = e.target;
        button.classList.toggle('clicked');
    }
}
const buttons = document.querySelectorAll('.button');
buttons.forEach(button => button.addEventListener('click', handleBtnAction));
buttons.forEach(button => button.addEventListener('transitionend', handleButtonActionEnd))

document.addEventListener('click', handleUserClick)

const rounds = document.querySelector('#rounds');
const roundsText = rounds.textContent;
const playerScoreLabel = document.querySelector('#playerScore');
const pScoreText = playerScoreLabel.textContent;
const compScoreLabel = document.querySelector('#computerScore');
const cScoreText = compScoreLabel.textContent;

function updateScores(round, playerpts, comppts){
    if (round > maxRounds) round = maxRounds;
    rounds.textContent = roundsText + round + '/' + maxRounds;
    playerScoreLabel.textContent = pScoreText + playerpts;
    compScoreLabel.textContent = cScoreText + comppts;
}

function getGameIdAttr(element){
    return element.getAttribute('data-gameid');
}

let gameRunning = false;

let maxRounds = 0;

let playerPoints = 0;
let computerPoints = 0;
let cRounds = 1;

function handleUserClick(e){
    let elementClassList = e.target.classList.value;
    if(elementClassList.includes('button')){
        let element = e.target;
        if(getGameIdAttr(element).includes('start') && !gameRunning){
            maxRounds = roundsInput.value;
            gameRunning = true;
            updateScores(cRounds, playerPoints, computerPoints);
        } else if(gameRunning){
            game(element);
        }
    }
}

function game(choice){  
    if(cRounds <= maxRounds){
        let computerChoice = computerPlay();
        let result = playRound(getGameIdAttr(choice), computerPlay());
        document.querySelector('.player-choice').textContent = getGameIdAttr(choice);
        document.querySelector('.computer-choice').textContent = computerChoice;
        if(result !== 'tie'){
            if(result === 'pointComputer'){
                computerPoints++; 
                winnerShow('Computer Wins', 'red');   
            }
            if(result === 'pointPlayer'){
                playerPoints++;   
                winnerShow('Player Wins', 'lightgreen');  
            }
            cRounds++;
        } else {
            winnerShow('Tie!', 'yellow');
        }
        updateScores(cRounds, playerPoints, computerPoints);
    } else {
        gameRunning = false;
        playerPoints = 0;
        computerPoints = 0;
        cRounds = 0;
    }  
}



function winnerShow(text, color){
    const winnerLabel = document.getElementById('round-result');
    winnerLabel.textContent = text;
    winnerLabel.style.color = color;
    winnerLabel.classList.toggle('active');

    setTimeout(() => {
        winnerLabel.classList.toggle('active');
    }, 1000)

}