$('#navbar-placeholder').load('navbar.html');
$('#footer-placeholder').load('footer.html');

function Game() {
    this.gameStart                  = false;
    this.gameOver                   = false;
    this.gameInProcess              = false;
    this.level                      = 1;
    this.KeyToStartGame             = "a";
    this.colorList                  = ["red","blue","green","yellow"];
    this.soundpath                  = "./resource/sounds/";
    this.soundExt                   = ".mp3";
    this.resultList                 = [];
    this.userInputList              = [];
    this.simonBoxes                 = $(".simon-box");
    this.popup                      = $("#popup");
    this.popup_text                 = $("#popup-text");
    this.title                      = $(".title-text");
    this.scoreText                  = $("<h3>");
    
    //constructor
    
}

Game.prototype.setTitle = function(_msg_) {
    this.title.fadeOut();
    this.title.text(_msg_);
    this.title.fadeIn();
}

Game.prototype.getSoundFilePath = function (index) {
    return this.soundpath+this.colorList[index]+this.soundExt;
}

Game.prototype.displayPopup = function(_msg_) {
    this.popup_text.text(_msg_);
    this.popup.slideDown();
}

Game.prototype.removePopup = function() {
    this.popup.slideUp();
}

Game.prototype.getBoxById = function(id){
    if (this.colorList.includes(id)) {
        return $(this.simonBoxes[this.colorList.indexOf(id)]);
    }
    return null;
}

Game.prototype.getBoxByIndex = function(index){
    if(this.simonBoxes.length >= index){
        return $(this.simonBoxes[index]);
    }
}

Game.prototype.getBoxIndex = function(box){
    return this.colorList.indexOf(box.attr("id"));
}

Game.prototype.wrongAnswer = function () {
    $("body").addClass("game-over");
    setTimeout(()=>{$("body").removeClass("game-over")},300);
    const audio = new Audio(this.soundpath+"wrong"+this.soundExt);
    audio.play();

    score = (this.level-1)*10;

    this.gameInProcess = false;
    this.gameOver = true;
    this.gameStart = false;
    this.userInputList = [];
    this.resultList = [];
    this.level = 1;

    this.title.text("Game Over!!!");
    this.scoreText.text("score: "+score);
    this.title.after(this.scoreText)
    setTimeout(()=>{
        game.displayPopup("Click to start Game!!");
    },500);
}

Game.prototype.playNextLevel = function () {
    this.setTitle("Level "+this.level);
    this.userInputList = [];
    this.gameInProcess = true;
    const boxNumber = (Math.floor(Math.random() * 4));
    this.resultList.push(boxNumber);
    const box = this.getBoxByIndex(boxNumber);
    const soundFile = this.getSoundFilePath(boxNumber);
    const audio = new Audio(soundFile);
    setTimeout(()=>{
        this.clickBox(box,false);
    },1000);
    
    setTimeout(()=>{
        this.gameInProcess = false;
    },900);
}


Game.prototype.clickBox = function(box, validateResult = false) {
    const index = this.getBoxIndex(box);
    const soundFile = this.getSoundFilePath(index);
    const audio = new Audio(soundFile);
    audio.play();
    box.addClass("box-clicked");
    setTimeout(()=>{
        box.removeClass("box-clicked");  
    },100);

    if(validateResult){
        if (this.gameStart&& !this.gameOver){
            const index = this.getBoxIndex(box);
            this.userInputList.push(index);
            var userClickNum = this.userInputList.length;
            var totalClicks = this.resultList.length;
            if (index != this.resultList[userClickNum-1]){
                this.wrongAnswer();
                return;
            } 
            if(userClickNum == totalClicks){
                this.level+=1;
                setTimeout(()=>{
                    this.playNextLevel();
                },500);
                return;
            }
        }
    }
}

Game.prototype.initialize = function() {
    this.gameInProcess = false;
    this.gameOver = false;
    this.gameStart = false;
    this.level  = 1;
    this.userInputList = [];
    this.resultList = [];

    this.scoreText.addClass("title-text");

    //initialize popup
    this.popup.addClass("active");
    this.popup.hide();
    this.popup_text.addClass("game-text");
    this.popup.on("click",()=> {
        var startGame = false;
        var delayValue = 1000;
        if (this.gameOver){
	    this.setTitle("Simon Game");
            this.scoreText.remove();
            this.gameOver = false;
            startGame   = true;
            delayValue  = 2000;
        } else if(!this.gameStart){
            startGame = true;
        }

        if(startGame){
            this.removePopup();
            setTimeout(()=>{
                this.run();
            },delayValue)
        }
    });
}

Game.prototype.run = function() {
    this.gameStart = true;
    setTimeout(()=>{
        this.playNextLevel();
    },500);
}

var game = new Game();
game.initialize();

//initialize box click listners
for(var i = 0;i<game.simonBoxes.length;i++){
    var simonBox = $(game.simonBoxes[i]);
    simonBox.on("click",function(){
        if (!game.gameInProcess) {
            game.clickBox($(this),true);
        }
    });
}  

setTimeout(()=>{
    game.displayPopup("Click to start Game!!");
},500);



