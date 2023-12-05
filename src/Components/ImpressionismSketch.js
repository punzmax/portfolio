import React, { useState, forwardRef } from 'react';
import {ReactP5Wrapper} from "react-p5-wrapper";
import {InView, useInView} from "react-intersection-observer"




function sketch(p5){
    let button;

    let state = {
        paused: false,
        impressionismMode: true
    }
    p5.updateWithProps = props => {
        state = Object.assign(state, props)
    };

    let width = document.getElementById('imageContainer').offsetWidth * 0.8;
    let height = document.getElementById('imageContainer').offsetWidth * 0.8;
    let offset = width / 2;
    let centerX = 0;
    let centerY = 0;
    let pic;
    let numBrushes = 5;
    let brushes = new Array();
    let actionsPerTick = 1;

    let minBrushSize = 8;
    let maxBrushSize = 24;

    //stuff for the emoji mode
    const emojiSize = 64;
    const actutalSize = 12;
    const toleranceControll = 50;
    let cTolerance = toleranceControll;
    let emojis;
    let avgColors = new Array();
    let indexList = new Array();

    let paused = false;
    let lastTick = true;

    let resized = false;

    p5.windowResized = () => {
        width = document.getElementById('imageContainer').offsetWidth;
        height = document.getElementById('imageContainer').offsetHeight;

        p5.resizeCanvas(width, height);
        offset = width / 2;



        resized=true;

    }


    p5.preload = () => {
        p5.loadImage(require("../Images/me_2.png"), img => {
            pic = img;
            if(pic.height > pic.width){
                let w = pic.width / pic.height;
                pic.resize(height * w - (maxBrushSize),height- (maxBrushSize));
            } else {
                let w = pic.height / pic.width;
                pic.resize(height - (maxBrushSize),height * w - (maxBrushSize));
            }
        }, () => {console.log("Well......")});

        p5.loadImage(require("../Images/emoji.png"), img => {
            fillEmojiArray(img);
        }, ()=>{console.log("Emoji spritesheet couldnt be loaded")});

        p5.loadStrings(require("../TextFiles/colorValues.txt"), texttext => {
            for(let i = 0; i < texttext.length; i = i + 3){
                if(texttext[i] != "NaN" && texttext[i + 1] != "NaN" &&  texttext[i + 2] != "NaN"){
                    let a = p5.color(texttext[i], texttext[i + 1], texttext[i + 2]);

                    avgColors.push(a);
                } else {

                    break;
                }

            }

        } )

        for(let i = 1; i < numBrushes + 1; i++){
            p5.loadImage(require("../Images/Brushes/brush_" + i + ".png"), img => {

                for(let x = 0; x < 10; x++){
                    let p = img;
                    let t = Math.floor(p5.random(minBrushSize, maxBrushSize));
                    p.resize(t, t);


                    brushes.push(p);
                }

            }, () => {console.log("Well......")});
        }


    }

    const colorMatches = (c, t) => {
        let red = false;
        let green = false;
        let blue = false;

        let t_red = p5.red(t);
        let t_green = p5.green(t);
        let t_blue = p5.blue(t);
        let c_red = p5.red(c);
        let c_green = p5.green(c);
        let c_blue = p5.blue(c);





        if(p5.red(t) === 0 && p5.green(t) === 0 && p5.blue(t) === 0){
            return false;
        }




        //check if colors are inside of tolerance boundries

        if((Math.abs(c_red - t_red) <= cTolerance ) && (Math.abs(t_red - c_red) <= cTolerance )){
            red = true;
        }

        if((Math.abs(c_green - t_green) <= cTolerance ) && (Math.abs(t_green - c_green) <= cTolerance )){
            green = true;
        }
        if((Math.abs(c_blue - t_blue) <= cTolerance ) && (Math.abs(t_blue - c_blue) <= cTolerance )){
            blue = true;
        }

        if(red === true && green === true && blue === true){

            return true;
        } else {
            return false;
        }
    }

    const fillEmojiArray = (emojiSpriteSheet) =>
    {

        let t = new Array();

        //so we can calculate the average later
        let sumR = 0;
        let sumG = 0;
        let sumB = 0;
        let numColoredPixels = 0;


        //draw the emojisheet
        //p5.image(emojiSpriteSheet, 0, 0);

       for(let x = 0; x < 40; x++) {
            for(let y = 0; y < 40; y++) {
                let emoji = emojiSpriteSheet.get(emojiSize * x + 1, emojiSize * y, emojiSize, emojiSize)
                emoji.resize(actutalSize, actutalSize);

                t.push(emoji);
            }
       }

       emojis = t;
    }


    const center = () => {
        centerX = (width - pic.width) / 2;
        centerY = (width - pic.height) / 2;
    }

    let impressionismMode = true;
    let slider;
    let skipButton;

    p5.setup = () => {
        p5.createCanvas(width, height, p5.WEBGL);


        center();
    }

    const checkVisible = (c) => {
        if(p5.alpha(c) === 0) {
            return false;
        }
        return true;

    }
    //putting this outside of draw to manually trigger it
    const tick = () => {
        if(resized){
            p5.clear();
            resized = false;
        }

        if(state.impressionismMode){
            for(let q = 0; q < brushes.length; q++){
                let randX = Math.floor(p5.random(0, pic.width));
                let randY = Math.floor(p5.random(0, pic.height));
                //console.log(pic[randX - centerX][randY - centerY]);

                p5.tint(pic.get(randX, randY));
                p5.image(brushes[q], randX + centerX  - offset - (brushes[q].width / 2), randY + centerY - offset - (brushes[q].width / 2));
            }
        } else {
            for(let q = 0; q < 20; q++){
                let randX = Math.floor(p5.random(0, pic.width));
                let randY = Math.floor(p5.random(0, pic.height));
                //console.log(pic[randX - centerX][randY - centerY]);

                let c = pic.get(randX, randY);

            if(checkVisible(c)){
                while(indexList.length === 0 ){
                    //pick an emoji with a simmilar color;



                    for(let x = 0; x < avgColors.length; x++){

                        if(colorMatches(c, avgColors[x])){
                            indexList.push(x);
                        }


                    }


                    cTolerance = cTolerance * 2;
                }

                cTolerance = toleranceControll;
                let tempMoji = p5.random(indexList);


                //p5.image(emojis[tempMoji],randX + centerX  - offset - (actutalSize.width / 2), randY + centerY - offset - (actutalSize.width / 2));
                p5.image(emojis[tempMoji],randX + centerX -offset, randY + centerY - offset);
                indexList = new Array();
            }

            }
        }
    }

    p5.draw = () => {
        //p5.image(pic, 0 - offset + centerX, 0 - offset + centerY);

        if(!state.paused){
            if(lastTick != state.impressionismMode){
                p5.clear();
            }
            for(let i = 0; i < actionsPerTick; i++){
                tick();
            }

            lastTick = state.impressionismMode;
        } else {
            console.log("paused");
        }

    }
}






export function ImpressionismSketch(){

    const [ref, inView, entry] = useInView({ threshold: 0.0 });
    const [t, setT] = useState(false);
    const [impressionism, setImpressionism] = useState(true);


    return(
        <div>
            <InView onChange={(inView, entry) => setT(!inView)}  id="domainWarping" className="static drop-shadow-lg rounded-md center object-fit">
                <ReactP5Wrapper sketch={sketch} paused={t} impressionismMode={impressionism}/>
            </InView>
            <button className={"absolute bottom-0 p-5 hover:opacity-50"} onClick={() => {setImpressionism(!impressionism)}}>Switch Mode</button>
        </div>

    );
}