/*main*/
document.addEventListener('DOMContentLoaded',afterContetnLoaded );

$(document).ready(function() {
  $('#navbar-placeholder').load('navbar.html');
  $('#footer-placeholder').load('footer.html');
  $('#setting-modal-placeholder').load('setting_modal.html',function() {
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
      
        var secondDiceBox = $('.secondDice input[type="checkbox"]');
        secondDiceBox.change(function(){
          if($(this).is(":checked")){
            dice2.classList.remove("dice-2");
          }else {
            dice2.classList.add("dice-2");
          }
        });
  });
});

var isVoiceLoaded = false;
var soundEnable = true;
var dice2 = document.getElementById("die-2");
var rollDice = document.getElementById("rollDice");
var popup = document.getElementById("popup");
var setting_popup = document.getElementById("setting-popup");
var setting_header = document.getElementById("settingHeader");
var popup_text= document.getElementById("popup-text");
var settingLink = document.querySelector(".setting");
var welcome_msg = "Welcome to roll the dice!";


/* add event listner to all button type element when clicked*/
const buttons = document.querySelectorAll('button[type="button"]');
for(var b = 0;b<buttons.length; b++){
  buttons[b].addEventListener("click",buttonClicked,true);
}


popup.addEventListener("click",()=>{
  popup.classList.remove("active");
},false);

rollDice.addEventListener("click",rollDiceFunc,false);

/* functions */

function afterContetnLoaded() {
  // isMouseOverFirstTime = true;
  displayPopup("Welcome! Ready to Roll The Dice");
}


function buttonClicked() {
  const audio  = new Audio("./resource/sounds/click-button.mp3");
  audio.play();
}

function changePopupText(_msg_)
{
  popup_text.innerText = _msg_;
}


function displayPopup(_msg_) {
  changePopupText(_msg_);
  popup.classList.add("active");
  setTimeout(() => {
    popup.classList.remove("active");
  }, 5000);
}

function rollDiceFunc(){
  var totalDiceNUmber = 0;
  const dice = [...document.querySelectorAll(".die-list")];
  dice.forEach(die => {
    if (!die.classList.contains("dice-2")) {
    toggleClasses(die);
    var randomNumber = getRandomNumber(1,6);
    totalDiceNUmber+=randomNumber;
    die.dataset.roll = randomNumber;
    }
  });
  popup_text.innerText = totalDiceNUmber;
  setTimeout(() => {
    playText(popup_text.innerText);
    popup.classList.add("active");
  }, 2000);
  setTimeout(() => {
      popup.classList.remove("active");
  }, 4000);
}

function toggleClasses(die) {
    die.classList.toggle("odd-roll");
    die.classList.toggle("even-roll");
}
  
function getRandomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function playText(_msg){
  if(!soundEnable) { return;}
  if ('SpeechSynthesisUtterance' in window && 
      'speechSynthesis' in window ) {
      var speech = new SpeechSynthesisUtterance(_msg);

      speech.lang = 'en-US';
      speech.volume = 1;
      speech.rate = 0.75;
      speech.pitch = 1;
      window.speechSynthesis.speak(speech);
      speech.onend = function(event) {
          console.log("speach completed");
      };
  }else {
    console.log("Browser dont support text to speech");
  }
} 