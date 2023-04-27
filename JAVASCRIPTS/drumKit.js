
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
    this.sound = new Audio(sound);
    this.imageUrl = image;
    this.play = function(){
        this.button.classList.add("drum-pressed");
        this.sound.play();
        setTimeout(()=>{
            this.button.classList.remove("drum-pressed");
        },100);
    }
    this.button.addEventListener("click",()=>{this.play();});
}



  var btns = document.querySelectorAll(".drum");
  var imageList = ["tom1","tom2","tom3","tom4","snare","crash","kick"];
  var soundList = ["tom-1","tom-2","tom-3","tom-4","snare","crash","kick-bass"];
  var keyList = ['w','a','s','d','j','k','l'];
  var imageExt = ".png";
  var soundExt = ".mp3";
  var imagePath = "./resource/";
  var soundPath = "./resource/sounds/";

  for(let b=0;b<btns.length; b++){
    let button = btns[b];
    const imageUrl = imagePath+imageList[b]+imageExt;
    const soundUrl = soundPath+soundList[b]+soundExt;
    button.style.backgroundImage = 'url('+imageUrl+')';
    button.addEventListener("click",(event)=>
    {   buttonAnimation(event.target.textContent.toLowerCase());
        var audio = new Audio(soundUrl);
        audio.play();
    });
  }

  document.addEventListener("keypress",(event)=>{
        let key = event.key.toLowerCase();
        if (keyList.includes(key)){
            document.querySelector("."+key).click();
        }
  });


  function buttonAnimation(key){
    let button = document.querySelector("."+key);
    button.classList.add("drum-pressed");
    setTimeout(()=>{
        button.classList.remove("drum-pressed");
    },100);
  }