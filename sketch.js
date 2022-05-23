
let serial;
let latestData = "waiting for data";

let img;

function preload() {
  img_r = loadImage('data/seraphim_r.png');
  img_g = loadImage('data/seraphim_g.png');
  img_b = loadImage('data/seraphim_b.png');
}

function setup() {
  frameRate(60);
 createCanvas(windowWidth, windowHeight);

 serial = new p5.SerialPort();

 serial.list();
 serial.open('COM3');

 serial.on('connected', serverConnected);

 serial.on('list', gotList);

 serial.on('data', gotData);

 serial.on('error', gotError);

 serial.on('open', gotOpen);

 serial.on('close', gotClose);
}

function serverConnected() {
 print("Connected to Server");
}

function gotList(thelist) {
 print("List of Serial Ports:");

 for (let i = 0; i < thelist.length; i++) {
  print(i + " " + thelist[i]);
 }
}

function gotOpen() {
 print("Serial Port is Open");
}

function gotClose(){
 print("Serial Port is Closed");
 latestData = "Serial Port is Closed";
}

function gotError(theerror) {
 print(theerror);
}

function gotData() {
 let currentString = serial.readLine();
  trim(currentString);
 if (!currentString) return;
 //console.log(currentString);
 latestData = currentString;
}

function draw() {
blendMode(NORMAL);
 background(0);
 fill(0,0,0);
 text(latestData, 10, 10);
 // Polling method
 

makeImg(img_r, img_g, img_b, 100, 100);
makeImg(img_r, img_g, img_b, 500, 100);
makeImg(img_r, img_g, img_b, 900, 100);
makeImg(img_r, img_g, img_b, 100, 400);
makeImg(img_r, img_g, img_b, 500, 400);
makeImg(img_r, img_g, img_b, 900, 400);






}

function makeImg(r, g, b, x , y){

 let hr = latestData/10
 const wid = 350;
 const len = 250;

 let dx = x+(hr);
 let dy = y+(hr);

 blendMode(SCREEN);
 image(r, dx, y, wid, len);
 image(g, x, dy, wid, len);
 image(b, dx, dy, wid, len);

}