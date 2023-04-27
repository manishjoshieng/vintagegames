
$('#navbar-placeholder').load('navbar.html');
$('#footer-placeholder').load('footer.html');
$('#setting-modal-placeholder').load('setting_modal.html',function() {
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


function Drum(btn,sound,image) {
    this.button = btn;
    this.sound = sound;
    
    this.button.addEventListener("click",()=>{this.play();});
    this.button.style.backgroundImage = image;
}

Drum.prototype.play = function() {
    this.button.classList.add("drum-pressed");
    let audio = new Audio(this.sound);
    audio.play();
    setTimeout(()=>{
        this.button.classList.remove("drum-pressed");
    },100);
}

var keyList         = ['w','a','s','d','j','k','l'];
var imageList       = ["tom1","tom2","tom3","tom4","snare","crash","kick"];
var soundList       = ["tom-1","tom-2","tom-3","tom-4","snare","crash","kick-bass"];
var imageExt        = ".png";
var soundExt        = ".mp3";
var imagePath       = "./resource/";
var soundPath       = "./resource/sounds/";
var btns            = document.querySelectorAll(".drum");

let drumMap = new Map();
for (let button of btns) {
    const key = button.textContent.toLowerCase();
    const index = keyList.indexOf(key);
    const imageUrl = 'url('+imagePath+imageList[index]+imageExt+')';;
    const soundUrl = soundPath+soundList[index]+soundExt;
    let drum = new Drum(button, soundUrl, imageUrl);
    drumMap.set(key,drum);
}

document.addEventListener("keypress",(event)=>{
    let key = event.key.toLowerCase();
    drumMap.get(key).play();
    // if (keyList.includes(key)){
    //     document.querySelector("."+key).click();
    // }
}); 
 

//   for(let b=0;b<btns.length; b++){
//     let button = btns[b];
//     const imageUrl = imagePath+imageList[b]+imageExt;
//     const soundUrl = soundPath+soundList[b]+soundExt;
//     button.style.backgroundImage = 'url('+imageUrl+')';
//     button.addEventListener("click",(event)=>
//     {   buttonAnimation(event.target.textContent.toLowerCase());
//         var audio = new Audio(soundUrl);
//         audio.play();
//     });
//   }

 


//   function buttonAnimation(key){
//     let button = document.querySelector("."+key);
//     button.classList.add("drum-pressed");
//     setTimeout(()=>{
//         button.classList.remove("drum-pressed");
//     },100);
//   }