import {ReactP5Wrapper} from "react-p5-wrapper";
import React, { useState, forwardRef } from 'react';

function sketch(p5){
    let width = document.getElementById('imageContainer').offsetWidth;
    let height = document.getElementById('imageContainer').offsetHeight;
    let offset = width / 2;

    p5.setup = () => {
        p5.createCanvas(width, height, p5.WEBGL);




        p5.background(255);
    }

    p5.draw = () => {

        p5.background(255);
        p5.noStroke();

        for (var x = 0; x < width; x += 1) {
            for (var y = 0; y < height; y += 1) {
                var c = 255 * p5.noise(0.1 * x, 0.1 * y);
                p5.fill(c);
                p5.rect(x - offset, y - offset, 1, 1);
            }


        }

    }
}

export function DomainWarpingSketch(){

    return(
        <div id="domainWarping" className="h-[40vh] drop-shadow-lg rounded-md center object-fit">
            <ReactP5Wrapper sketch={sketch}/>
        </div>
    );
}