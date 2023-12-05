import { ReactP5Wrapper } from "react-p5-wrapper";
import React, { useState, useRef} from 'react';
import {useInView} from "react-intersection-observer";
import { InView } from 'react-intersection-observer';

function sketch(p5) {
    let state = {
        paused: false,
    }
    p5.updateWithProps = props => {
        state = Object.assign(state, props)
    };

    let width = document.getElementById('startPage').offsetWidth;
    let height = document.getElementById('startPage').offsetHeight;
    let numElements = Math.ceil(width*0.026);


    let objectsX;
    let objectsY;
    let objectsSpeed;
    let objectsSize;

    let minX;
    let minY;
    let maxX;
    let maxY;

    p5.windowResized = () => {
        width = document.getElementById('musicPage').offsetWidth;
        height = document.getElementById('musicPage').offsetHeight;

        p5.resizeCanvas(width, height);
        numElements = Math.ceil(width*0.026);

        init();
    }

    function init(){
        minX = - (width/2);
        minY = - (height/2);
        maxX = width / 2;
        maxY = height / 2;

        objectsX = new Array();
        objectsY = new Array();
        objectsSpeed = new Array();
        objectsSize = new Array();
        for(let i = 0; i < numElements; i++){
            objectsX[i] = p5.random(minX, maxX);
            objectsY[i] = p5.random(minY, maxY);
            objectsSpeed[i] = p5.random(1, 10);
            objectsSize[i] = p5.random(1, 100);
        }
    }

    p5.setup = () => {
        p5.createCanvas(width, height, p5.WEBGL);


        init();
    }

    p5.draw = () => {
        if(!state.paused){
            p5.background(255);
            for(let i = 0; i < numElements; i++){
                p5.ellipse(objectsX[i], objectsY[i], objectsSize[i]);
                objectsY[i] = objectsY[i] + objectsSpeed[i];
                if(objectsY[i] > maxY){
                    objectsY[i] = minY;
                }
            }
        }
    };
}

export function StartPage() {
    const [ref, inView, entry] = useInView({ threshold: 0.0 });
    const [t, setT] = useState(false);


    return (
        <div id="startPage" className="z-20 overflow-hidden snap-start relative h-[calc(100dvh)] w-screen flex items-center justify-center">
            <div className="blur-sm" >
                <ReactP5Wrapper sketch={sketch} paused={t}/>
            </div>
            <InView as="div" onChange={(inView, entry) => setT(!inView)} className="absolute h-[calc(100dvh)] w-screen flex flex-col items-center justify-center text-5xl select-none">
                <p className="z-10 text-8xl center text-center font-bold">Hi, I'm Max!</p>
                <p className="z-10 text-2xl text-center text-slate-500">Welcome to my website.</p>
                <img src={require('../Images/me_2.png')} className={"absolute h-2/6 bottom-0"}/>
            </InView>
        </div>


    );
}
