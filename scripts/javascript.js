let win = false;
let guessCorrect = false;
const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
const wordArray = ["Novice", "Research", "Jinx", "Fluffy", "Kooky"];
const hintArray = ["A person who is new to the circumstances, work, etc., in which they are placed.", "diligent and systematic inquiry or investigation into a subject in order to discover or revise facts, theories, applications, etc.", "A person, thing, or influence supposed to bring bad luck.", "light or airy.", "strange or foolish."];
const hangman = {
    wordArray: ["Novice", "Research", "Jinx", "Fluffy", "Kooky"],
    hintArray: ["A person who is new to the circumstances, work, etc., in which they are placed.", "diligent and systematic inquiry or investigation into a subject in order to discover or revise facts, theories, applications, etc.", "A person, thing, or influence supposed to bring bad luck.", "light or airy.", "strange or foolish."],
    currWord: "",
    currHint: "",
    displayArray: [],
    remainingGuesses: 6,
    guessesMade: 0,
    setDisplay: function(length) {
        for(let i = 0; i < length; i++){
            hangman.displayArray.push("_");
        }
        console.log(hangman.displayArray);
        $('#guessDisplay').text(hangman.displayArray.join(" "));
        $("#totalGuesses").text(hangman.guessesMade);
        $("#mistakesRemaining").text(hangman.remainingGuesses);
        $("#hangmanImage").attr("src", "images/hangman-0.webp");
    },
    newHangman: function() {
        let i = Math.floor(Math.random() * 5);
        hangman.currWord = hangman.wordArray[i];
        hangman.currHint = hangman.hintArray[i];
        $("#hint").append(hangman.currHint);
        hangman.setDisplay(hangman.currWord.length);
        console.log(hangman.currHint);
        console.log(hangman.currWord);
    },
    updateScore: function() {
        $("#totalGuesses").text(hangman.guessesMade);
        $("#mistakesRemaining").text(hangman.remainingGuesses);
        $("#hangmanImage").attr("src", `images/hangman-${(6 - hangman.remainingGuesses)}.webp`);
        $('#guessDisplay').text(hangman.displayArray.join(" "));
        if(win == true){ 
            $('#popUpTitle').text('You Win!');
            $('#popUpDesc').text('Congradulations!');
            $('#popUp').fadeIn(250);
            $('#playAgain').show();
            $('.letterButton').attr("disabled", true);
            $('#tryGuessButton').attr("disabled", true);
        
        }
        else if(hangman.remainingGuesses <= 0){   
            $('#popUpTitle').text('You Loose.');
            $('#popUpDesc').text('Try Again.');
            $('#popUp').fadeIn();
            $('#playAgain').show();
            $('.letterButton').attr("disabled", true);
            $('#tryGuessButton').attr("disabled", true);
        }
        else if(guessCorrect){
            $('#popUpTitle').text('Correct!');
            $('#popUp').fadeIn(1000).delay(250).fadeOut(1000);
        }
        else{
            $('#popUpTitle').text('Incorrect.');
            $('#popUp').fadeIn(1000).delay(250).fadeOut(1000);
        }
    }
};

hangman.newHangman();

for(let i = 0; i < 26; i++){
    $("#letterSelect").append(`<button type="button" id="select${alphabet[i]}" class="letterButton">${alphabet[i]}</button>`)
}

$(".letterButton").click(function(){
    $('#selectedLetter').text($(this).text());
    $('#letterSubmit').attr("disabled", false);
})

$(".letterButton").click(function(){
    let i = hangman.currWord.toLowerCase().indexOf($(this).text().toLowerCase());
    if(i !== -1){
        guessCorrect = true;
        for(let i = 0; i < hangman.currWord.length; i++){
            if(hangman.currWord[i].toLowerCase() == $(this).text().toLowerCase()){
                hangman.displayArray[i] = $(this).text();
            }
        }
        $(`#select${$(this).text()}`).attr("disabled", true);
        hangman.guessesMade++;
        if(hangman.displayArray.join('').toLowerCase() == hangman.currWord.toLowerCase()){
            win = true;
        }
    }
    else{
        guessCorrect = false;
        $(`#select${$(this).text()}`).attr("disabled", true);
        $("#letterSubmit").attr("disabled", true);
        hangman.guessesMade++;
        hangman.remainingGuesses--;
    }
    
    hangman.updateScore();
})

$("#tryGuessButton").click(function() {
    if(hangman.currWord.toLowerCase() == $('#guessInput').val().toLowerCase()){
        hangman.displayArray = $('#guessInput').val().toUpperCase().split("");
        $('#guessDisplay').text(hangman.displayArray.join(` `));
        win = true;
        console.log(win);
    }
    else{
        hangman.guessesMade++;
        hangman.remainingGuesses--;
    }
    hangman.updateScore();
})

$('#playAgain').click(function(){
    location.reload();
});