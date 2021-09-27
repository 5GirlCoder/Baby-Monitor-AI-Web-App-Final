Status = "";
song = "";
objects = [];

function preload()
{
    song = loadSound('found.mp3');
}

function setup()
{
    canvas = createCanvas(450, 400);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    objectDetector = ml5.objectDetector('cocossd', modelLoaded);

    document.getElementById('StatusH3').innerHTML = "Status : detecting objects ";
}

function draw()
{
    image(video, 0, 0, 450, 400);

    if(Status != "")
    {
        objectDetector.detect(video, gotResult);

        for(i=0; i < objects.length; i++)
        {
            document.getElementById('StatusH3').innerHTML = "Status : Objects Detected"; 
            fill('pink');
            percent = floor(object.confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke('pink');
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
       
            if(objects[i].label == "person")
            {
                document.getElementById('BabyStatusH3').innerHTML= "Baby Found"
                console.log("STOP");
                song.stop();
            }
            else
            {
                song.play();
                document.getElementById('BabyStatusH3').innerHTML= "Baby Not Found"
            }
        }
        if(objects.length == 0)
        {
            song.play();
            document.getElementById('BabyStatusH3').innerHTML= "Baby Not Found"
        }
    }
}

function modelLoaded()
{
    console.log('Model Loaded!');
    Status= true;   
}

function gotResult(error, results)
{
    if(error)
    {
        console.error(error);
    }
    else
    {
        console.log(results);
        objects = results;
    }
}