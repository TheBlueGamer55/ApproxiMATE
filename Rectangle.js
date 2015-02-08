
var Rectangle = function(width, height, centerX, centerY){

	this.width = width;
	this.height = height;
	this.centerX = centerX;
	this.centerY = centerY;//The position and dimensions of the rectangle
	
	this.area = this.width * this.height;
	
	this.perimeter = this.width * 2 + this.height * 2;



}


Rectangle.prototype = 
{

	update: function(dt)
	{
	
	},
	
	draw: function( canvas )
	{
	
		var topY = this.centerY - this.height/2;//Determines the positions of the rectangle's edges
		var bottomY = this.centerY + this.height/2;
		
		var leftX = this.centerX - this.width/2;
		var rightX = this.centerX + this.width/2;
		
		
		//This draws it on screen
		canvas.strokeStyle = "black";
		canvas.beginPath();
		canvas.moveTo(leftX, topY); //the initial point
		canvas.lineTo(rightX, topY);
		canvas.lineTo(rightX, bottomY);
		canvas.lineTo( leftX, bottomY);
		canvas.closePath();
		canvas.stroke(); //draws an outline
		
	
	
	},
	
	drawFilled: function( canvas )
	{
	
		var topY = this.centerY - this.height/2;//Determines the positions of the rectangle's edges
		var bottomY = this.centerY + this.height/2;
		
		var leftX = this.centerX - this.width/2;
		var rightX = this.centerX + this.width/2;
		
		
		//This draws it on screen
		canvas.strokeStyle = "black";
		canvas.beginPath();
		canvas.moveTo(leftX, topY); //the initial point
		canvas.lineTo(rightX, topY);
		canvas.lineTo(rightX, bottomY);
		canvas.lineTo( leftX, bottomY);
		canvas.closePath();
		canvas.fill(); //draws an outline
		
	
	
	}



}