const cards = document.querySelectorAll('.memory-card');
let hasFlippedCard = false; //matching logic clicked first or second
let previouslyClickedCard, currentlyClickedCard; 
let lockBoard = false; 

function flipCard(){
    if(lockBoard) return; 
    if(this === previouslyClickedCard) return; 
    this.classList.add('flip');
    if(!hasFlippedCard){
        hasFlippedCard = true; //first click
        previouslyClickedCard = this; // element that fired event
        return;
    }
    currentlyClickedCard = this; // second click
    checkForMatch();
}
function checkForMatch(){
    let isMatch = previouslyClickedCard.dataset.framework === currentlyClickedCard.dataset.framework;
    isMatch ? disableCards(): unflipCards()
}
function disableCards(){
    previouslyClickedCard.removeEventListener('click', flipCard);
    currentlyClickedCard.removeEventListener('click', flipCard);
    resetBoard();
}
function unflipCards(){
    lockBoard = true;
    setTimeout(() =>{
        previouslyClickedCard.classList.remove('flip');
        currentlyClickedCard.classList.remove('flip');
        resetBoard();
    }, 1500);
}
function resetBoard(){
    [hasFlippedCard, lockBoard]  = [false, false];
    [previouslyClickedCard, currentlyClickedCard] = [null, null];
}
(function shuffleCards(){ //8
    cards.forEach(card => {
        let randomPosition = Math.floor(Math.random() * 12);
        card.style.order = randomPosition;
    })
})();
cards.forEach(card => card.addEventListener('click', flipCard));

