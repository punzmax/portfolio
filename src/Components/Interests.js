import React, { useState, forwardRef } from 'react';
import {ReactP5Wrapper} from "react-p5-wrapper";
import {InView, useInView} from "react-intersection-observer";

function interestsSketch(p5) {

    let state = {
        color: 0,
        paused: false,
    }

    p5.updateWithProps = props => {
        state = Object.assign(state, props)
    };

    const colorPalettes = [
        ['#FFFFFF', '#A7FFF5', '#FFEF85', '#FFFFFF', '#FFFFFF'],
        ['#16697A','#82C0CC','#FFA62B','#EDE7E3','#489FB5'],
        ['#2F2F2F','#DC7F9B','#F7A1C4','#E0B7B7','#94BFA7'],
        ['#FFBA49','#20A39E','#EF5B5B','#23001E','#A4A9AD'],
    ]
    const possibleColors = ['lavender ', 'lightcoral', 'lightblue', 'lightseagreen', 'deeppink']

    let width = document.getElementById('leftContainer').offsetWidth;
    let height = document.getElementById('leftContainer').offsetHeight;

    let mobile = false;
    if(height > width){
        mobile = true;
    }

    let numElements = Math.ceil(width*0.104166);

    let objectsX;
    let objectsY;
    let objectsSpeed;
    let objectsSize;
    let objectsLiveTime;
    let objectsColors;

    let maxLivetime = 300;

    let minX;
    let minY;
    let maxX;
    let maxY;

    let speed = 0.5;

    p5.windowResized = () => {
        width = document.getElementById('leftContainer').offsetWidth;
        height = document.getElementById('leftContainer').offsetHeight;

        p5.resizeCanvas(width, height);

        numElements = Math.ceil(width*0.104166);

        init();
    }


    function init(){
        let numElements = 200;

        objectsX = new Array();
        objectsY = new Array();
        objectsSpeed = new Array();
        objectsSize = new Array();
        objectsLiveTime = new Array();
        objectsColors = new Array();

        minX = - (width/2);
        minY = - (height/2);
        maxX = width / 2;
        maxY = height / 2;

        speed = 0.5;

        for(let i = 0; i < numElements; i++){
            objectsSize[i] = p5.random(1, 100);
            objectsX[i] = p5.random(minX - (objectsSize[i] /2), maxX);
            objectsY[i] = p5.random(minY - (objectsSize[i] /2), maxY);
            objectsSpeed[i] = p5.random(1, 10);
            objectsColors[i] = Math.floor(p5.random(1, 5));
            objectsLiveTime[i] = p5.random(0, maxLivetime)
        }
    }
    p5.setup = () => {
        p5.createCanvas(width, height, p5.WEBGL);

        init();
    }

    p5.draw = () => {
        if(!state.paused){

            if(mobile == false){
                p5.background(colorPalettes[state.color][0]);
            } else {
                p5.background(colorPalettes[3][0]);
            }


            for(let i = 0; i < numElements; i++){
                if(objectsSize[i] <= 0){
                    objectsSize[i] = 1;
                    objectsLiveTime[i] = 0;
                }else if(objectsLiveTime[i] <= (maxLivetime / 2)){
                    objectsSize[i] = objectsSize[i] + speed;
                    objectsLiveTime[i] = objectsLiveTime[i] + speed;
                } else if(objectsLiveTime[i] > (maxLivetime / 2)){
                    objectsSize[i] = objectsSize[i] - speed;
                    objectsLiveTime[i] = objectsLiveTime[i] + speed;
                }

                if(objectsColors[i] !== undefined){
                    if(mobile === false){
                        p5.fill(colorPalettes[state.color][objectsColors[i]]);
                    } else {
                        p5.fill(colorPalettes[3][objectsColors[i]]);
                    }
                }


                p5.rect(objectsX[i] - (objectsSize[i] / 2), objectsY[i]- (objectsSize[i] / 2), objectsSize[i], objectsSize[i]);
            }
        }
    };
}

export function Interests() {
    const [imgKey, setImgName] = useState(0);

    const menuPointClassName = "relative transition ease-in-out hover:scale-105 duration-50 group ";
    const programmingPage = document.getElementById('programmingPage');
    const musicPage = document.getElementById('musicPage');
    const filmPage = document.getElementById('filmPage');

    const [color, setColor] = useState(0);
    const [ref, inView, entry] = useInView({ threshold: 0.0 });
    const [t, setT] = useState(false);

    const leftSideText = [
        "Hover over categories to learn more.",
        "In my time at the FH Hagenberg I learnt a lot about different kinds of programming. Click to find out more about my favourite projets I've worked on.",
        "The past year I dove deep into different AI topics. I've trained LLMs, as well as reinforcement-learning based agents.",
        "I spend all of my freetime playing and writing music.",
        "I also participated in some film and animation work. I tried my hand at directing a short film.",
    ];


    const onHover = (val) => {
        setImgName(val)
    }
    const scrollToProgramming = () => programmingPage.scrollIntoView({ behavior: 'smooth' });

        return (
            <div className="relative flex snap-start h-[calc(100dvh)] w-screen bg-white ">
                <div id="leftContainer" className="h-[calc(100dvh)] w-screen flex items-center justify-center text-5xl">
                    <div className="relative flex items-center justify-center">
                        <InView as="div" onChange={(inView, entry) => setT(!inView)} className="opacity-50 blur">
                            <ReactP5Wrapper sketch={interestsSketch} color={color} paused={t}/>
                        </InView>
                    </div>
                </div>
                <div className="p-5 sm:p-0 absolute h-[calc(100dvh)] w-screen flex items-center justify-center text-5xl 4xl:text-6xl  select-none">
                    <ul>
                        <li className="text-9xl font-bold">I Do:</li>
                        <li onMouseOver={() => setColor(1)} className={menuPointClassName} onClick={() => programmingPage.scrollIntoView({ behavior: 'smooth' })}>
                            Programming
                        </li>
                        <li onMouseOver={() => setColor(2)} className={menuPointClassName} onClick={() => musicPage.scrollIntoView({ behavior: 'smooth' })}>Music & Sound

                        </li>
                        <li onMouseOver={() => setColor(3)} className={menuPointClassName} onClick={() => filmPage.scrollIntoView({ behavior: 'smooth' })}>Animation & Film
                        </li>
                    </ul>
                </div>
            </div>
        );



}