var buttonColors = ["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern = [];
var count=0;
var level=0;

function startOver()
{
    level=0;
    gamePattern=[];
    userClickedPattern=[];
    count=0;
}

$(document).keydown( function() {
    if(count==0){
    nextSequence();
    $("h1").text("Level "+ count);
    count++;
    
}
});

$(".btn").click(function(){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
          console.log("success");
         if (userClickedPattern.length === gamePattern.length){
           setTimeout(function() {
             nextSequence();
           }, 1000);
         }
   
       } else {
   
        var wrong=new Audio("sounds/wrong.mp3");
        wrong.play();
        $("h1").text("Game Over, Press Any Key to Restart");

        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
          }, 200);

          startOver();
       }
   
   }

function nextSequence(){
    userClickedPattern=[];
    level++;
    $("h1").text("Level "+ level);
    var randomNumber=Math.floor(Math.random() * 4);
    var randomChoosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChoosenColor);
    $("#" + randomChoosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChoosenColor);

    
}

function playSound(name){
    var audio=new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(anime){
    var currentColor= $("#" + anime );
    currentColor.addClass("pressed");

    setTimeout(function(){
        currentColor.removeClass("pressed");
    },100);
}



