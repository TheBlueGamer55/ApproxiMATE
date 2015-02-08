var MenuState = function(w, h)
{
    this.w = w || 0;
    this.h = h || 0;

    this.running = true;
	
	this.selectionBoxWidth = 280;
	this.selectionBoxHeight = 60;
	this.selectionBoxX = (this.w / 2) - (this.selectionBoxWidth / 2);
	this.selectionBoxY = 280;
	
	this.menuTheme = new Audio("res/RealMenu1.mp3");
	this.learningTheme = new Audio("res/StdInGame.mp3");
	this.timeTheme = new Audio("res/TimeAttack3.mp3");
	this.menuTheme.play();
}

MenuState.prototype =
{
    // Update the simulation each frame
    update: function(dt)
    {
		
    },

	keyPress: function( keyCode)
	{
		switch(keyCode){				
			case 38: // Up arrow
				console.log("Up pressed");
				if(this.selectionBoxY === 380){ //very specific, hacky code
					this.selectionBoxY = 280;
				}
				break;
			case 40: // Down arrow
				console.log("Down pressed");
				if(this.selectionBoxY === 280){ //very specific, hacky code
					this.selectionBoxY = 380;
				}
				break;
			case 13: // Enter key
				if(this.selectionBoxY === 280){ //if Learn Mode is currently selected, go to learn mode
					engine.gameState = new GameState(this.w, this.h);
					engine.activeState = engine.gameState;
					this.menuTheme.pause();
					this.menuTheme.currentTime = 0;
					this.learningTheme.play();
				}
				else if(this.selectionBoxY === 380){ //if Time Mode is currently selected, go to time mode
					engine.timerState = new TimeModeState(this.w, this.h);
					engine.activeState = engine.timerState;
					this.menuTheme.pause();
					this.menuTheme.currentTime = 0;
					this.timeTheme.play();
				}
				break;
		}
	},

    /*giveResources: function(resources)
    {
        this.stageSelection.giveResources(resources);
        this.characterSelection.giveResources(resources);
    },*/

    // Functions for starting and stopping the simulation
    start: function() { this.running = true },
    pause: function() { this.running = false },
    // Returns running
    isRunning: function() { return this.running },

    draw: function(canvas)
    {
        canvas.clearRect(0, 0, this.w, this.h);
		
		canvas.font = "40px sans-serif";
        canvas.textAlign = "center";
		canvas.fillStyle = "black";
		canvas.fillText("ApproxiMATE", engine.w / 2, 80);
		canvas.font = "30px sans-serif";
		canvas.fillText("Learning Mode", engine.w / 2, 320);
		canvas.fillText("Time Mode", engine.w / 2, 420);
		canvas.strokeRect(this.selectionBoxX, this.selectionBoxY, this.selectionBoxWidth, this.selectionBoxHeight);
    },

}
