
//dayle words
const targetWords = ['aahed', 'aargh'];

//all ok words to guess
const dictionary = ['aahed', 'aalii', 'aargh'];


function startInteraction(){
    document.addEventListener("click",handleMouseClick)
    document.addEventListener('click', handleKeyPress);
}

function stopInteracction(){
     document.removeEventListener('click', handleMouseClick);
     document.removeEventListener('click', handleKeyPress);
}

function handleMouseClick(e){
    if(e.target.matches("[data-key")){
        pressKey(e.target.dataset.key)
        return
    }
    if(e.target.matches("[data-enter]")){
        submitGuess()
        return
    }
    if(e.target.matches("[data-delete]")){
        deleteKey()
        return
    }
}

function handleKeyPress(e){
    if(e.key === "Enter"){
        submitGuess()
        return
    }
    if(e.key === "Backspace" || e.key === "Delete"){
        deleteKey()
        return
    }
    if(e.key.match(/^[a-z]$/)){
        pressKey(e.key)
        return
    }
}