var ExampleProblem = function(x, y)
{	
    this.x = x;
	this.y = y;
}

ExampleProblem.prototype =
{
    update: function(dt)
    {	
        
    },

    draw: function(canvas)
    {
		canvas.fillText("This is a problem object", this.x, this.y);
    }
}
