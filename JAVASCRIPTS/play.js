$(document).ready(function() {
    $('#navbar-placeholder').load('navbar.html');
    $('#footer-placeholder').load('footer.html');
    $('#setting-modal-placeholder').load('setting_modal.html', function() {
        console.log("setting-modal loaded");
        // The setting modal content is fully loaded at this point
      
        // Bind the change event handlers inside the load callback function
        var soundCheckBox = $('.soundSetting input[type="checkbox"]');
        soundCheckBox.prop('checked', true);
        soundCheckBox.change(function() {
          if ($(this).is(":checked")) {
            console.log("Sound enabled");
            soundEnable = true;
          } else {
            console.log("Sound disabled");
            soundEnable = false;
          }
        });
      
        $('.secondDice').hide();
    });
});
  
var soundEnable = true;
var player1EditBtn = document.getElementById("player1Edit");
var player2EditBtn = document.getElementById("player2Edit");
var savePlayerNameBtn = document.getElementById("saveBtn");
var playBtn = document.getElementById("playBtn");
var whichPlayerClicked = 0;
var maxAllowedCharacters = 16;
var player1DiceImg = document.getElementById("player1Dice");
var player2DiceImg = document.getElementById("player2Dice");
var imagepath = "./resource/";
var imageExt = ".png";
var imageName = "dice";
var winnerMsg = "The winner is ";
var popup = document.getElementById("popup");
var popup_text= document.getElementById("popup-text");
var titleText = document.querySelector(".title-text").innerText;

function isValidPlayerName(_name_)
{
    if (_name_.length > 2 && _name_.length <= maxAllowedCharacters) {
        return true;
    } else {
        var msg = "Enter valid Player Name. ";
        if (_name_.length == 0){
            msg += "Name can not be empty.";
        } else {
            msg += "Max allowed character is 8!";
        }
    }
    alert(msg);
    return false;
}

function rollDice() {
    // Generate a random number between 0 and 1
    var random = Math.random();
    
    // Scale the random number to be between 1 and 6
    var diceRoll = Math.floor(random * 6) + 1;
    
    // Return the result
    return diceRoll;
}

function rotateAndUpdateImage(image,newPath) {
    // Your updated JavaScript function here
    let currentAngle = image.style.transform.replace(/[^\d.-]/g, '');
    if (!currentAngle) {
    currentAngle = 0;
    }
    const targetAngle = parseInt(currentAngle) + (360*5);
    image.style.transition = "transform 2s linear";
    image.style.transform = `rotateZ(${targetAngle}deg)  rotateY(${targetAngle}deg) rotateX(${targetAngle}deg)`;
    
    setTimeout(() => {
    image.src = newPath;
    image.style.transition = "transform 2s linear";
    image.style.transform = `rotateZ(${currentAngle}deg)`;
    }, 2000);
}

function playText(_msg){
    if(!soundEnable) { return;}
    if ('SpeechSynthesisUtterance' in window && 'speechSynthesis' in window)  {
        const speech = new SpeechSynthesisUtterance(_msg);

        speech.lang = 'en-US';
        speech.volume = 1;
        speech.rate = 0.75;
        speech.pitch = 1;
        console.log("Playing: "+_msg);
        window.speechSynthesis.speak(speech);

        speech.onend = function(event) {
            console.log("speach completed");
        };
    } else {
        console.log("Browser dont support text to speech");
    }
}

function buttonClicked() {
    const audio  = new Audio("./resource/sounds/click-button.mp3");
    audio.play();
}


/* add event listner to all button type element when clicked*/
const buttons = document.querySelectorAll('[type=button]');
for(var b = 0;b<buttons.length; b++){   
    buttons[b].addEventListener("click",buttonClicked,true);
}



popup.addEventListener("click",()=>{
    popup.classList.remove("active");
});

playBtn.addEventListener("click",()=>{
    var dice1 = rollDice();
    var dice2 = rollDice();
    rotateAndUpdateImage(player1DiceImg,imagepath+imageName+dice1+imageExt);
    rotateAndUpdateImage(player2DiceImg,imagepath+imageName+dice2+imageExt);
    
    var msg = winnerMsg;
    if (dice1 > dice2){
        msg+=document.getElementById("player1Name").innerText;
        msg=" 🚩️ "+msg+" 🚩️ ";
    } else if (dice2 > dice1){
        msg+=document.getElementById("player2Name").innerText;
        msg=" 🚩️ "+msg+" 🚩️ ";
    } else{
        msg = "it's a tie!!";
    }
    popup_text.innerText = msg;
    setTimeout(()=>{
        popup.classList.add("active");
        var soundMsg = msg.replace(/🚩️/g, "");
        console.log(soundMsg);
        playText(soundMsg);
    }, 5000);
    
    setTimeout(() => {
        popup.classList.remove("active");
    }, 10000);
},false);

player1EditBtn.addEventListener("click",()=>{
    whichPlayerClicked = 1;
    console.log("Player1Edit clicked");
},false);

player2EditBtn.addEventListener("click",()=>{
    whichPlayerClicked = 2;
    console.log("Player2Edit clicked");
},false);

savePlayerNameBtn.addEventListener("click",()=>{
    var text = document.getElementById("fname").value;
    if (isValidPlayerName(text)) {
        if (whichPlayerClicked==1){
            document.getElementById("player1Name").innerText = text;
        } else {
            document.getElementById("player2Name").innerText = text;
        }
    } 
    whichPlayerClicked = 0;
    document.getElementById("playerNameText").click();
},false);



/*google-chrome --disable-web-security --disable-gpu --user-data-dir=~/chromeTemp*/