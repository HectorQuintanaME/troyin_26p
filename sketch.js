const INTRO = 0;
const FLASH = 1;
const CALIBRACION = 2;
let currentState = INTRO;
let flashRadius = 0;
let flashAlpha = 255;
let flashActive = false;

function setup() {

    createCanvas(windowWidth, windowHeight);
    textAlign(CENTER, CENTER);
    ellipseMode(CENTER);
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
}

function drawIntro() {
    fill(255);
    textSize(24);
    text(
        "Haz clic para comenzar",
        width / 2,
        height / 2
    );
}

function drawFlash() {
    noStroke();
    fill(255, flashAlpha);
    circle(
        width / 2,
        height / 2,
        flashRadius
    );
    flashRadius += 80;
    flashAlpha -= 4;
    if (flashAlpha <= 0) {
        currentState = CALIBRACION;
    }
}


function drawCalibration() {
    fill(255);
    textSize(28);
    text(
        "Preparando calibración...",
        width / 2,
        height / 2 - 40
    );
    textSize(18);
    fill(180);
    text(
        "Optimizando experiencia",
        width / 2,
        height / 2 + 10
    );
    text(
        "Analizando dispositivo",
        width / 2,
        height / 2 + 40
    );
}

function mousePressed() {
    if (currentState === INTRO) {
        currentState = FLASH;
        flashRadius = 0;
        flashAlpha = 255;
    }

}

function windowResized() {

    resizeCanvas(
        windowWidth,
        windowHeight
    );

}