let alfa = 255;
let vel = 5;
let destello = true;

function setup() 
{
	createCanvas(1912, 948);
}

function draw()
{
    background(0)
    fill(255, 255, 255)
    circle(width / 2, height / 2, 150)

    if(destello){
        alfa+=vel;
        if(alfa > 250 || alfa < 250)
        {
            
        }
    }

    

}
