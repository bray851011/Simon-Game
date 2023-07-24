// Play button's audio
function playSound(filename){
    var audio = new Audio("sounds/" + filename + ".mp3");
    audio.play();
}

// Button animation
function btnClicked(color){
    var btn = $("#" + color);
    btn.addClass("pressed");
    setTimeout(function() {
        btn.removeClass("pressed");
    }, 100);
}

function playCurrentGamePattern(pattern){
    index = 0;
    
    function loop(){
        var color = pattern[index];
        setTimeout(function(){
            playSound(color);
            btnClicked(color);
            index++;
            if (index == pattern.length){
                $("h1").text("Your Turn");
            }else{
                loop()
            }
        }, 1000 - (80 * level));
    }
    loop();        
}

// New color for the next level
function nextSequence(){
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = array[randomNumber];

    // Push the new color to the array
    gamePattern.push(randomChosenColour);

    // Add one level
    level++;
    $("h1").text("Level " + level);
    playCurrentGamePattern(gamePattern);
}

// Game setup
const array = ["red", "blue", "green", "yellow"];

const gamePattern = [];

var index = 0;
var highScore = 0;
var level = 0;
var started = false;
$(document).keypress(function() {
    if(!started){
        $("h1").text("Level " + level);
        nextSequence();
        started = true
    }
});


const userClickedPattern = [];

$(".btn").click(function(){
    if(index === gamePattern.length){
        var userChosenColor = $(this).attr("id");

        playSound(userChosenColor);
        btnClicked(userChosenColor);

        userClickedPattern.push(userChosenColor);
        checkAnswer();
    }
});

function checkAnswer(){
    var arrayLength = userClickedPattern.length;

    // Fail the current level
    if (userClickedPattern[arrayLength - 1] !== gamePattern[arrayLength - 1]){
        $("h1").text("Game Over!");
        $("body").css("background-color", "red");
        playSound("wrong");
        index = -1;
        setTimeout(function(){
            restart();
        }, 3000);
    }

    // Pass current level
    else if(arrayLength === gamePattern.length){
        $("h1").text("Passed Level " + level);
        userClickedPattern.length = 0;
        if(level > highScore){
            highScore = level;
            $("h2").text("High Score: " + highScore)
        }
        setTimeout(nextSequence,1000);
    }
}

function restart(){
    started = false;
    gamePattern.length = 0;
    userClickedPattern.length = 0;
    if(level > highScore){
        highScore = level;
        $("h2").text("High Score: " + highScore)
    }
    level = 0;
    $("h1").text("Press A Key to Start");
    $("body").css("background-color", "#011F3F");
}