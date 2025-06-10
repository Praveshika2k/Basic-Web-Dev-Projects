// alert("hello");
//3.At the top of the game.js file, create a new array called buttonColours and set it to hold the sequence "red", "blue", "green", "yellow" .
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern=[];     
var userClickedPattern=[];         
var started=false;

var level=0;

$(document).keypress(function(){
    if (!started){
        $("#level-title").text("Level " + level);
        nextSequence();
        started=true;
    }
});

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    //4.In the click event handler, get the id of the button that was clicked and store it
    //in the userChosenColour variable.
    userClickedPattern.push(userChosenColour);
    // console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function() {
                nextSequence();
                }, 1000);
            }
        } else {
            playSound("wrong");
            $("body").addClass("game-over");
            $("#level-title").text("Game Over! Press Any Key to Restart");
            setTimeout(function() {
                $("body").removeClass("game-over");
            },200);
            startOver();
        }
    }

function nextSequence(){
    userClickedPattern = [];

    level++;

    $("#level-title").text("Level " + level);
    //2. Inside the new function generate a new random number between 0 and 3, and store it in a variable called randomNumber
    var randomNumber = Math.floor(Math.random() * 4);
    //4. Create a new variable called randomChosenColour and use the randomNumber from step 2 to select a random colour from the buttonColours array.
    var randomChosenColour = buttonColours[randomNumber];
    //6. Add the new randomChosenColour generated in step 4 to the end of the gamePattern.
    gamePattern.push(randomChosenColour);

    //1. Use jQuery to select the button with the same id as the randomChosenColour
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
}

//1. Create a new function called animatePress(), it should take a single input parameter called currentColour.
function animatePress(currentColour) {
//3. Use jQuery to add this pressed class to the button that gets clicked inside animatePress().
$("#" + currentColour).addClass("pressed");
//figure out how you can use Javascript to remove the pressed class after a 100 milliseconds.
setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
    }, 100);

}

function playSound(name){
    //3. figure out how you can use Javascript to play the sound for the button colour selected in step 1.
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
            
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}













