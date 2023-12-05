export function filmPageSketch2(p5) {
    let width = document.getElementById('leftContainer').offsetWidth;
    let height = document.getElementById('leftContainer').offsetHeight;

    let posX;
    let posY;
    let rot = 0;

    let grow = true;
    let colors = ['#0F7173', '#DF3B57', '#EE4B6A', '#F0FF50', '#AFF0FF'];
    let c1 = p5.random(colors);
    let c2 = p5.random(colors);
    let maxCubeHeight = height/4;



    let cubeHeight;

    p5.setup = () => {
        p5.angleMode(p5.DEGREES);
        p5.createCanvas(width, height, p5.WEBGL);

        cubeHeight = p5.random(2, maxCubeHeight);
        posX = -cubeHeight;
        posY = p5.random(0, height);

        while(c1 == c2){
            c1 = p5.random(colors);
            c2 = p5.random(colors);
        }


    }

    p5.draw = () => {


        let c = p5.lerpColor(p5.color(c1), p5.color(c2), (width - posX) / width);
        p5.strokeWeight(2);
        p5.stroke(c);


        p5.push();
        p5.translate(posX - (width / 2), posY - (height / 2));
        p5.rotate(rot);
        p5.rect(-cubeHeight / 2, -cubeHeight / 2, cubeHeight, cubeHeight);
        posX += 10;

        if(grow){
            cubeHeight += 1;
        } else {
            cubeHeight -= 1;
        }

        if(cubeHeight > maxCubeHeight){

            grow = false;
        } else if(cubeHeight < (height / 10)){
            grow = true;
        }
        rot += 5;

        if(posX - (cubeHeight*2) > width){

            c1 = p5.random(colors);
            c2 = p5.random(colors);

            while(c1 == c2){
                c1 = p5.random(colors);
                c2 = p5.random(colors);
            }

            posX = posX = -cubeHeight;
            posY = posY = p5.random(0, height);
            cubeHeight = p5.random(2, maxCubeHeight);
        }
        p5.pop();



    }
}


export function musicPageSketch2(p5) {
    let width = document.getElementById('musicPage').offsetWidth;
    let height = document.getElementById('musicPage').offsetHeight;

    let circlePosX = new Array();
    let circlePosY = new Array();
    let elementSpeed = new Array();
    let elementVelocityX = new Array();
    let elementVelocityY = new Array();
    let elementSize = 16;
    let cursor;

    let numElements = 100;

    p5.setup = () => {
        p5.createCanvas(width, height);

        for(let i = 0; i < numElements; i++){
            circlePosX.push(Math.floor(p5.random(0, width)));
            circlePosY.push(Math.floor(p5.random(0, height)));
            elementSpeed.push(p5.random(0.5, 6))
            elementVelocityX.push(0);
            elementVelocityY.push(0);
        }
    }

    p5.preload = () => {
        p5.loadImage(require("../Images/cursor64.png"), img => {
            cursor = img;
            cursor.resize(elementSize, elementSize);
        }, () => {
            console.log("Well......")
        });
    }

    p5.mouseClicked = () => {
        for(let i = 0; i < numElements; i++){


            let x = (p5.mouseX - circlePosX[i]);
            if(x > elementSpeed[i]){
                x = elementSpeed[i];
            } else if(x < -elementSpeed[i]){
                x = -elementSpeed[i];
            }

            let y = (p5.mouseY - circlePosY[i]);
            if(y > elementSpeed[i]){
                y = elementSpeed[i];
            } else if(y < -elementSpeed[i]){
                y = -elementSpeed[i];
            }

            let mod = 8;
            elementVelocityX[i] = Math.floor(p5.random(-elementSpeed[i] * mod, elementSpeed[i]  * mod)) - (x * mod) / Math.floor(x);
            elementVelocityY[i] = Math.floor(p5.random(-elementSpeed[i] * mod, elementSpeed[i] * mod))  - (y * mod) / Math.floor(x);
        }
    }
    p5.draw = () => {
        p5.background(255);
        p5.fill(0);

        for(let i = 0; i < numElements; i++){

            let x = (p5.mouseX - circlePosX[i]);
            if(x > elementSpeed[i]){
                x = elementSpeed[i];
            } else if(x < -elementSpeed[i]){
                x = -elementSpeed[i];
            }

            let y = (p5.mouseY - circlePosY[i]);
            if(y > elementSpeed[i]){
                y = elementSpeed[i];
            } else if(y < -elementSpeed[i]){
                y = -elementSpeed[i];
            }

            elementVelocityX[i] = (elementVelocityX[i] * 19 + x) / 20;
            elementVelocityY[i] = (elementVelocityY[i] * 19 + y) / 20;

            circlePosX[i] = circlePosX[i] + elementVelocityX[i];
            circlePosY[i] = circlePosY[i] + elementVelocityY[i];

            //p5.circle(circlePosX[i], circlePosY[i], elementSize);
            p5.image(cursor, circlePosX[i], circlePosY[i]);
        }
    }
}


/*
 var x = width * noise(t);
  var y = height * noise(t+5);
  var r = 255 * noise(t+10);
  var g = 255 * noise(t+15);
  var b = 255 * noise(t+20);

  noStroke();
  fill(r, g, b);
  ellipse(x, y, 120, 120);

  t = t + 0.01;
 */