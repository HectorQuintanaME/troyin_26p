const INTRO = 0;
const FLASH = 1;
const CALIBRACION = 2;
let currentState = INTRO;
let flashRadius = 0;
let flashAlpha = 255;
let flashActive = false;
let bodyPose;
let video;
let poses = [];
let connections;

function preload() {
  bodyPose = ml5.bodyPose();
}

function setup() {

    createCanvas(windowWidth, windowHeight);
    textAlign(CENTER, CENTER);
    ellipseMode(CENTER);
     
    video = createCapture(VIDEO);
    video.size(640, 480);
    video.hide();
    bodyPose.detectStart(video, gotPoses);
    connections = bodyPose.getSkeleton();
}

function draw() {
    background(0);

    switch (currentState) {
        case INTRO:
            drawIntro();
            break;
        case FLASH:
            drawFlash();
            break;
        case CALIBRACION:
            drawCalibration();
            break;
    }

    //ESQUELETO DE CONEXIONES

    for (let i = 0; i < poses.length; i++) {
    let pose = poses[i];
    for (let j = 0; j < connections.length; j++) {
      let pointAIndex = connections[j][0];
      let pointBIndex = connections[j][1];
      let pointA = pose.keypoints[pointAIndex];
      let pointB = pose.keypoints[pointBIndex];
      if (pointA.confidence > 0.1 && pointB.confidence > 0.1) {
        stroke(255, 0, 0);
        strokeWeight(2);
        line(pointA.x, pointA.y, pointB.x, pointB.y);
      }
    }
  }

    //DIBUJAR CONEXIONES 

  for (let i = 0; i < poses.length; i++) {
    let pose = poses[i];
    for (let j = 0; j < pose.keypoints.length; j++) {
      let keypoint = pose.keypoints[j];
      if (keypoint.confidence > 0.1) {
        fill(0, 255, 0);
        noStroke();
        circle(keypoint.x, keypoint.y, 10);
      }
    }
  }

}
function drawIntro() {
    fill(255);
    textSize(24);
    text("Haz clic para comenzar", width / 2, height / 2);
}

function drawFlash() {
    noStroke();
    fill(255, flashAlpha);
    circle(width / 2, height / 2, flashRadius);
    flashRadius += 80;
    flashAlpha -= 4;
    if (flashAlpha <= 0) {
        currentState = CALIBRACION;
    }
}


function drawCalibration() {
    fill(255);
    textSize(28);
    text("Preparando calibración...", width / 2, height / 2 - 40);
    textSize(18);
    fill(180);
    text("Optimizando experiencia", width / 2, height / 2 + 10);
    text("Analizando dispositivo", width / 2, height / 2 + 40);
}

function mousePressed() {
    if (currentState === INTRO) {
        currentState = FLASH;
        flashRadius = 0;
        flashAlpha = 255;
    }

}

function windowResized() {
    resizeCanvas(windowWidth,windowHeight);
}

function gotPoses(results) {
    poses = results;
}