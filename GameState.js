var GameState = function(w, h)
{
    this.w = w || 0;
    this.h = h || 0;
	
    this.running = true;
	
	this.isQuitting = false;
	
	this.correctSound = new Audio("./res/RightAnswerSound.wav");
	this.incorrectSound = new Audio("./res/WrongAnswerSound.wav");
	
	this.currentChoice = 1; //integers are used to represent the choices for each problem
	
	this.numRight = 0; //the number of problems answered correctly
	this.numRightX = 0; //the coordinates of the number right
	this.numRightY = 0;
	
	this.numWrong = 0; //the number of problems answered incorrectly
	this.numWrongX = 0; //the coordinates of the number wrong
	this.numWrongY = 0;
	
	this.isScreenShaking = false; //set this to true any time a screen shake should occur 
	this.isScreenShakingEnd = false;
	this.screenShakeTimer = 0;
	this.shakeMagnitude = 12; //how far away the camera shakes around its original point, in pixels
	this.transX = 0; //keeps track of the canvas's translation in order to reset it to its original position after screen shaking
	this.transY = 0;
	
	this.isDisplayingMessage = false;
	this.displayMessageTimer = 0;
	this.message = "";
	this.messageColor = "green"; //default value - changes depending on the right/wrong answer chosen
	this.messageX = 0;
	this.messageY = 0;
	this.selectionBoxX = 0;
	this.selectionBoxY = 0;
	this.selectionBoxWidth = 0;
	this.selectionBoxHeight = 0;
	
	this.fitProblem = new HowManyFitProblem(100, 100); //test code
	this.angleProblem = new IdentifyAngleProblem(500, 500);
	this.perimeterProblem = new MatchPerimeterProblem(320, 240);
	
	this.currentProblem = this.fitProblem; //used to keep track of the current problem
}

GameState.prototype =
{	
    init: function()
    {
		
    },

    // Update the simulation each frame
    update: function(dt)
    {
        //code for screen shaking
        if(this.isScreenShaking){
            this.screenShakeTimer += dt;
            if(this.screenShakeTimer >= 250){ //how many milliseconds the screen shaking lasts
                this.screenShakeTimer = 0;
                this.isScreenShaking = false;
                this.isScreenShakingEnd = true;
            }
        }
		
		//code for displaying message after every choice made
        if(this.isDisplayingMessage){
            this.displayMessageTimer += dt;
            if(this.displayMessageTimer >= 2000){ //how many milliseconds the message lasts
                this.displayMessageTimer = 0;
                this.isDisplayingMessage = false;
				console.log("Stopped displaying message");
				//create a new problem for the user to solve
				var probChoice = Math.floor((Math.random() * 2) + 1);
				if(probChoice === 1){
					this.currentProblem = new IdentifyAngleProblem(0, 0);
				}
				else if(probChoice === 2){
					this.currentProblem = new HowManyFitProblem(0, 0);
				}
            }
        }
    },

    keyPress: function(keyCode)
    {
        switch(keyCode){				
			case 49: // '1' key
				if(!this.isDisplayingMessage){
					this.currentChoice = 1;
					this.currentProblem.giveAnswer(this.currentChoice);
				}
				break;
			case 50: // '2' key
				if(!this.isDisplayingMessage){
					this.currentChoice = 2;
					this.currentProblem.giveAnswer(this.currentChoice);
				}
				break;
			case 51: // '3' key
				if(!this.isDisplayingMessage){
					this.currentChoice = 3;
					this.currentProblem.giveAnswer(this.currentChoice);
				}
				break;
			case 52: // '4' key
				if(!this.isDisplayingMessage){
					this.currentChoice = 4;
					this.currentProblem.giveAnswer(this.currentChoice);
				}
				break;
				
			case 27: // Escape key
				if(!this.isDisplayingMessage){
					this.isQuitting = !this.isQuitting;
				}
				console.log("Esc pressed");
				break;
			case 13: // Enter key
				if(this.isQuitting){
					engine.menuState.menuTheme.play();
					engine.menuState.learningTheme.pause();
					engine.menuState.learningTheme.currentTime = 0;
					engine.activeState = engine.menuState;
				}
				break;
		}
	},

    // Functions for starting and stopping the simulation
    start: function() { this.running = true },
    pause: function() { this.running = false },
    // Returns running
    isRunning: function() { return this.running },

    draw: function(canvas)
    {
		//Screen shaking effect
		if(this.isScreenShaking){
			canvas.translate(-this.transX, -this.transY); //move the canvas back to its origin (0, 0)
			var newX = Math.random() * this.shakeMagnitude * 2 - this.shakeMagnitude;
			var newY = Math.random() * this.shakeMagnitude * 2 - this.shakeMagnitude;
			canvas.translate(newX, newY); //move the canvas to a new origin
			this.transX = newX; //keep track of the current x and y translations
			this.transY = newY;
		}
		if(this.isScreenShakingEnd){ //solves the issue where the last translation isn't called
			canvas.translate(-this.transX, -this.transY);
			this.isScreenShakingEnd = false;
			this.transX = 0;
			this.transY = 0;
		}
	
        canvas.clearRect(0, 0, this.w, this.h);
		
		canvas.font = "24px sans-serif";
        canvas.textAlign = "center";
		canvas.fillStyle = "red";
		canvas.fillText("Incorrect: " + this.numWrong, engine.w - 64, 64);
		canvas.fillStyle = "green";
		canvas.fillText("Correct: " + this.numRight, 64, 64);
		
		//this.fitProblem.draw(canvas); //test code
		//this.angleProblem.draw(canvas);
		//this.perimeterProblem.draw(canvas);
		if(this.currentProblem != null){
			this.currentProblem.draw(canvas);
		}
		
		//Displaying message after response is chosen
		if(this.isDisplayingMessage){
			canvas.fillText(this.message, this.messageX, this.messageY);
			//draw the outline highlighting the answer chosen
			canvas.strokeStyle = this.messageColor;
			canvas.strokeRect(this.selectionBoxX, this.selectionBoxY, this.selectionBoxWidth, this.selectionBoxHeight);
		}
		
		if(this.isQuitting){
			canvas.clearRect(0, 0, this.w, this.h);
			canvas.fillText("Are you sure you want to quit?", engine.w / 2, engine.h / 2 - 64);
			canvas.fillText("Press Enter to confirm", engine.w / 2, engine.h / 2);
			canvas.fillText("Press Esc again to cancel", engine.w / 2, engine.h / 2 + 64);
		}
    }
}
