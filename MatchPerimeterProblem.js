//In this type of problem, the user is presented with one target shape and three other shapes,
//Only one of which has the same perimeter as the target shape. The user must choose this shape.
var MatchPerimeterProblem = function(x, y)
{	
    this.x = x;
	this.y = y;
	this.crossY = 128; //the top y-position of the cross drawn
	
	this.instructionsX = 0; //the coordinates of the message "Match the Areas!"
	this.instructionsY = 0;
	
	this.choice1 = 1; //these should be generated
	this.choice2 = 2;
	this.choice3 = 3;
	
	this.userChoice = 0;
	
	this.timeBonus = 3000; //how many milliseconds are added to the timer for time mode
	this.timePenalty = 1000; //how many milliseconds are lost when answering incorrectly for time mode
	
	this.targetPerimeter = 1; //this should be generated
}

MatchPerimeterProblem.prototype =
{
    update: function(dt)
    {	
        
    },

    draw: function(canvas)
    {
		canvas.fillStyle = "black";
		canvas.fillRect(engine.w / 2, this.crossY, 1, engine.h); //vertical line
		canvas.fillRect(0, (this.crossY + engine.h) / 2, engine.w, 1); //horizontal line
		
        canvas.font = '24px sans-serif';
        canvas.textAlign = 'center';
		canvas.fillText("Find the shape with the same perimeter!", engine.w / 2, 64);
	
		canvas.fillRect(engine.w / 2, this.crossY, 1, engine.h); //vertical line
		canvas.fillRect(0, (this.crossY + engine.h) / 2, engine.w, 1); //horizontal line
		
		canvas.fillText("#1", engine.w / 2 - 38, (engine.h - this.crossY) / 2 + this.crossY - 28);
		canvas.fillText("#2", engine.w / 2 - 38, (engine.h - this.crossY) / 2 + this.crossY + 36);
		canvas.fillText("#3", engine.w / 2 + 32, (engine.h - this.crossY) / 2 + this.crossY + 36);
    },
	
	giveAnswer: function(answer){ //handles the selection and score tracking progression of the user
		if(answer === 1){
			this.userChoice = this.choice1;
			engine.activeState.selectionBoxX = 10;
			engine.activeState.selectionBoxY = this.crossY + 10;
		}
		else if(answer == 2){
			this.userChoice = this.choice2;
			engine.activeState.selectionBoxX = 10;
			engine.activeState.selectionBoxY = this.crossY + (engine.h - this.crossY) / 2 + 10;
		}
		else if(answer === 3){
			this.userChoice = this.choice3;
			engine.activeState.selectionBoxX = engine.w / 2 + 10;
			engine.activeState.selectionBoxY = this.crossY + (engine.h - this.crossY) / 2 + 10;
		}
		else if(answer === 4){
			return; //perimeter match problems do not have a 4th option
		}
		engine.activeState.selectionBoxWidth = engine.w / 2 - 32;
		engine.activeState.selectionBoxHeight = (engine.h - engine.activeState.currentProblem.crossY) / 2 - 32;
		if(this.userChoice !== 0){
			if(this.userChoice === this.targetPerimeter){
				if(engine.activeState.numRight != null){ //this means we're in learning mode
					engine.activeState.numRight++;
				}
				else if(engine.activeState.gameTimer != null){ //this means we're in time mode
					engine.activeState.gameTimer += timeBonus;
				}
				engine.activeState.message = "Correct!";
				engine.activeState.messageColor = "green";
				engine.activeState.correctSound.play();
			}
			else{
				if(engine.activeState.numWrong != null){ //this means we're in learning mode
					engine.activeState.numWrong++;
				}
				else if(engine.activeState.gameTimer != null){ //this means we're in time mode
					engine.activeState.gameTimer -= this.timePenalty;
				}
				engine.activeState.message = "Incorrect!";
				engine.activeState.messageColor = "red";
				engine.activeState.incorrectSound.play();
				engine.activeState.isScreenShaking = true;
			}
			engine.activeState.messageX = engine.w / 2;
			engine.activeState.messageY = this.crossY;
		}
		engine.activeState.isDisplayingMessage = true;
	}
}
