const cards = document.querySelectorAll('.card');
let countClick= 0;
let hasFlippedCard = false;
let firstCard , secondCard;
let lockBoard = false;
const flippedCard = document.getElementsByClassName("card flip");


cardsTurnOn();
setTimeout(function(){
    cardsTurnOff();
},3000)
function countFlippedCard(){
    return flippedCard.length;
}

function cardsTurnOn(){
    cards.forEach((card)=>{
        card.className="card flip"
    })
}

function cardsTurnOff(){
    cards.forEach((card)=>{
        card.className="card"
    })
}

function clicked(){
    return countClick++;
}

function flipCard(){
    if(lockBoard) return;
    // countClick++;
    clicked();
    document.getElementById("pontos").innerHTML = countClick;
    if(this === firstCard) return;

    this.classList.add('flip');
    if(!hasFlippedCard){
        hasFlippedCard = true;
        firstCard = this;
        return;
    }
    secondCard = this;
    hasFlippedCard = false;
    checkForMatch();
    if (countFlippedCard()=== 12){
        gameOver();
    }
}

function checkForMatch(){
    if(firstCard.dataset.card === secondCard.dataset.card){
        disableCards();
        return
    }
    unflipCard();
}

function disableCards(){
    firstCard.removeEventListener('click',flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

function unflipCard(){
    lockBoard = true
    setTimeout(() =>{
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    },1500)
}

function resetBoard(){
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard,secondCard] = [null, null];
}

(
    function shuffle(){
        cards.forEach((card) => {
            let randomPosition = Math.floor(Math.random() * 12);
            card.style.order = randomPosition;
        })
    })();

cards.forEach((card) =>{
    card.addEventListener('click', flipCard)
})

function gameOver(){
    document.getElementById("board-game").innerHTML=("GAME OVER");
    // const div = document.getElementById("board-game")
    // div.style.width = "100px";
    // div.style.height = "100px";
    // div.style.background = "#87CEFA";
    // div.style.textAlign="center"
    // div.style.color = "white";
    // div.style.fontSize="20px";
    // div.innerHTML = "Hello";
    // console.log("Fim de Jogo")
}
