import { Carousel } from 'flowbite-react';
import React, { useState, forwardRef } from 'react';
import {Spotify} from "react-spotify-embed";
import {ProjectPage} from "./ProjectPage";
import {ReactP5Wrapper} from "react-p5-wrapper";
import {InView, useInView} from "react-intersection-observer"
import {sidebarTheme} from "flowbite-react/lib/esm/components/Sidebar/theme";
import YoutubeEmbed from "./YoutubeEmbed";
import {musicPageSketch2} from "./unusedSketch";
import YoutubeEmbed2 from "./YoutubeEmbedd2";


export function MusicPage() {
    const [ref, inView, entry] = useInView({ threshold: 0.0 });
    const [t, setT] = useState(false);
    const [project, setProject] = useState(0);

    function musicPageSketch(p5) {
        let width = document.getElementById('musicPage').offsetWidth;
        let height = document.getElementById('musicPage').offsetHeight;
        let maxDist = Math.sqrt((width * width) + (height * height));

        let mobile = false;

        let state = {
            paused: false
        }
        p5.updateWithProps = props => {
            state = Object.assign(state, props)
        };


        let tx;
        let ty;
        let growX;
        let growY;


        let numElements = Math.ceil(width * 0.02);
        let posX = new Array();
        let posY = new Array();
        let sizes = new Array();
        let grow = new Array();
        let p = Math.floor(width/numElements);

        p5.windowResized = () => {
            width = document.getElementById('musicPage').offsetWidth;
            height = document.getElementById('musicPage').offsetHeight;
            numElements = Math.ceil(width * 0.02)
            p5.resizeCanvas(width, height);
            maxDist = Math.sqrt((width * width) + (height * height));
            p = Math.floor(width/numElements)
            minSize = p * 0.75;

            initArrays();
        }

        const c = ['#DA4167', '#F4D35E', '#0F5DAF', '#FF6464'];

        let movX = p5.random(0, width);
        let movY = p5.random(0, width);

        let c1 = '#FFFCC7';
        let c2 = '#F84AA7';
        let c3 = '#FF3562';

        let minSize = p * 0.75;

        function initArrays(){
            posX = new Array();
            posY = new Array();
            sizes = new Array();
            grow = new Array();

            tx = width/2;
            ty = 0;
            growX = true;
            growY = true;

            mobile = false;
            if(height > width){
                mobile = true;
            }

            for(let x = 0; x*p < width; x++){
                for(let y = 0; y*p < height; y++){
                    posX.push(x * p);
                    posY.push(y * p);
                    sizes.push(p5.random(minSize, p));
                    grow.push(true);
                }
            }
        }
        p5.setup = () => {
            p5.createCanvas(width, height);

            initArrays();


        }

        const checkGrow = (val) => {
            if(sizes[val] > p){
                sizes[val] = p;
                grow[val] = false;
            } else if(sizes[val] < minSize){
                grow[val] = true;
                sizes[val] = minSize;
            }
        }

        p5.draw = () => {
            if(!state.paused){
                p5.background(c1);
                p5.noStroke();

                for(let i = 0; i < posX.length; i++){

                    let x = posX[i] + (p/2);
                    let y = posY[i] + (p/2);

                    let l;

                    if(mobile){

                        l = Math.sqrt(( tx- x)*( tx- x) +  (ty - y) *  (ty - y));


                        if(growY){
                            ty += 0.02;
                        }else {
                            ty -= 0.1;
                        }

                        if(ty > height *1.5 ){
                           // growY = !growY;
                            ty = -height/2;
                        }
                        /*
                        if(growX){
                            tx += 0.1;
                        } else {
                            tx -= 0.1;
                        }

                        if(tx > width|| tx < 0){
                            growX = !growX;
                        }

                        if(p5.random(0.1, 1) > 0.995){
                            growX = !growX;
                        }
                        if(p5.random(0.1, 1) > 0.995){
                            growY = !growY;
                        }
                        */


                    } else {
                        l = Math.sqrt((p5.mouseX - x)*(p5.mouseX - x) +  (p5.mouseY - y) *  (p5.mouseY - y));
                    }


                    p5.fill(p5.lerpColor(p5.color(c1), p5.color(c2),  (1 - ((l / maxDist) * 3))));
                    p5.circle(x,y, sizes[i]);


                    if(grow[i]){
                        sizes[i] += 0.1;
                    } else {
                        sizes[i] -= 0.1;
                    }

                    checkGrow(i);

                }
            } else {

            }
        }
    }


    return (
        <div id="musicPage" className={"flex z-20 snap-start absolute relative h-[calc(100dvh)] w-screen items-center justify-center overflow-hidden"}>
            <div className="blur-sm z-0 flex items-center justify-center">
                <InView onChange={(inView, entry) => setT(!inView)} className="">
                    <ReactP5Wrapper sketch={musicPageSketch} paused={t}/>
                </InView>
            </div>
            <div id={"projectSelector"} className="absolute z-5 h-max w-screen flex flex-col items-center justify-center select-none space-x-5 space-y-5 visible">
                <div className={"text-center text-4xl sm-text-5xl md:text-6xl xl:text-8xl font-panic"}>Music and Sound</div>
                <div className={"text-xs md:text-base lg:text-base w-4/5 sm:w-4/5 4xl:text-xl lg:w-1/2 text-slate-900"}>
                    I spend all of my freetime writing music in <b className={"font-bold"}>Ableton Live</b>, playing every instrument myself. I think it's 8 years now? Not sure.<br/>
                    I'm also in an art-pop band that is sometimes called "Sweaty Men", where I sing and play guitar. <div className={"hidden sm:inline"}>We had a concert in Hagenberg, which means we're <b className={"font-bold"}>music industry big-shots</b> now. We don't have a single song on the internet & we don't have any social media, which makes us as indie as it gets, haha.</div><br />
                    I'm still somewhat shy about sharing music, so I'll limit myself to a song that I've written and recorded in 2020 (we made a music video as a project at uni)
                    I even came up with the concept & story! Feels like it's been ages and my style has evolved drastically, but I'm still really proud of this one.
                    I also wrote all of the music for the short films in the next section (and I do the sounddesign, mixing and mastering too). <br/><br/>
                    <div className="aspect-w-16 aspect-h-9 ">
                        <iframe src='https://www.youtube.com/embed/y3WJRdr4qNk?si=DwhjpOMw1d0aei_w' frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen/>
                    </div>
                </div>

            </div>
        </div>

    );





}


