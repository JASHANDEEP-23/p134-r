
Status = "";
objects = [];
alarm = "";

function preload(){
alarm = loadSound('ALARM.mp3')
}

function setup(){
canvas = createCanvas(380,380)
canvas.center();
video = createCapture(VIDEO)
video.size(380,380)
video.hide()



}
function modelLoaded(){
    console.log('modelLoaded')
    Status = true ; 
    
}

function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Object";
}

function gotResult(error , results){
    if (error){
        console.log(error);

    }
    console.log(results);
    objects = results;
}

function draw() {
    //image( name, x , y, width, height)
image(video , 0 , 0 , 380 , 380); 
if(Status != "")
{
    objectDetector.detect(video , gotResult)
    for(i = 0; i < objects.length; i++)
    {
        document.getElementById("status").innerHTML = "Status : Object Detected";
       
        fill("black");
         percent = floor(objects[i].confidence * 100);
         text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y,);
         noFill();
         stroke('black');
         rect(objects[i].x, objects[i].y, objects[i].width,  objects[i].height);
   
   
   
         if(objects[i].label == "person"){
            document.getElementById("baby").innerHTML = " BABY FOUND";
         alarm.stop()
         
        
        }


        else{
            document.getElementById("baby").innerHTML = " BABY NOT FOUND";
            alarm.play()  
        }

        if(objects.length == 0){
        document.getElementById("baby").innerHTML = " BABY NOT FOUND";
        alarm.play()  
        }

    }
    
}



if(Status = "")
{
    objectDetector.detect(video , gotResult)
   for(i = 0; i < objects.length; i++)
   {
        document.getElementById("status").innerHTML = "Status : Object Is Not Detected";
       document.getElementById("baby").innerHTML = " BABY NOT FOUND";
       // MAM PLEASE WRITE THE CODE HOW TO PLAY AN AUDIO IN FEEDBACK
       alarm = "ALARM.mp3";
        fill("black");
         percent = floor(objects[i].confidence * 100);
         text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y,);
         noFill();
         stroke('black');
         rect(objects[i].x, objects[i].y, objects[i].width,  objects[i].height);
    }
    
    
}
}
