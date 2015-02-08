var Triangle = function(width, height, centerX, centerY){

	this.width = width;
	this.height = height;
	this.centerX = centerX;
	this.centerY = centerY;//The position and dimensions of the triangle
	
	this.area = this.width * this.height / 2;
	
	this.perimeter = this.width * 2 + this.height * 2;



}


Triangle.prototype = 
{

	update: function(dt)
	{
	
	},
	
	draw: function( canvas )
	{
	
		var topY = this.centerY - this.height/2;//Determines the positions of the triangle's edges
		var bottomY = this.centerY + this.height/2;
		
		var leftX = this.centerX - this.width/2;
		var rightX = this.centerX + this.width/2;
		
		
		//This draws it on screen
		canvas.strokeStyle = "black";
		canvas.beginPath();
		canvas.moveTo(this.centerX, topY); //the top point
		canvas.lineTo(rightX, bottomY);//The bottom right point
		canvas.lineTo(leftX, bottomY);//The bottom felt point
		canvas.closePath();
		canvas.stroke(); //draws an outline
		
	
	
	},
	
	drawFilled: function( canvas )
	{
	
		var topY = this.centerY - this.height/2;//Determines the positions of the triangle's edges
		var bottomY = this.centerY + this.height/2;
		
		var leftX = this.centerX - this.width/2;
		var rightX = this.centerX + this.width/2;
		
		
		//This draws it on screen
		canvas.strokeStyle = "black";
		canvas.beginPath();
		canvas.moveTo(this.centerX, topY); //the top point
		canvas.lineTo(rightX, bottomY);//The bottom right point
		canvas.lineTo(leftX, bottomY);//The bottom felt point
		canvas.closePath();
		canvas.fill(); //draws an outline
		
	
	
	}



}