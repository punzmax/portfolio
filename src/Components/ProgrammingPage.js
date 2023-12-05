import { Carousel } from 'flowbite-react';
import React, { useState, forwardRef } from 'react';
import {ProjectPage} from "./ProjectPage";
import {ReactP5Wrapper} from "react-p5-wrapper";
import {InView, useInView} from 'react-intersection-observer';

export function ProgrammingPage() {

    const [project, setProject] = useState(0);



    function programmingPageSketch(p5) {
        let width = document.getElementById('programmingBG').offsetWidth;
        let height = document.getElementById('programmingBG').offsetHeight;

        let state = {
            paused: false,
        }

        p5.updateWithProps = props => {
            state = Object.assign(state, props)
        };

        const vals = ['#', '*', '/', ' ', '?', '!', '|', '0', '1', '0', '1', '0', '1', '0', '1', '0', '1', '0', '1', '0', '1' ];

        let running = false;

        let valSize = 32;

        let posX;
        let posY;

        let symbols;

        let cubeHeight;
        let ticks = 10;
        let active = 0;

        function init(){
            symbols = new Array();

            for(let x = 0; x < width + valSize; x  = x + valSize){
                let t = new Array();
                for(let y = 0; y < height; y  = y + valSize){
                    t.push(p5.random(vals));
                }
                symbols.push(t);
            }

        }

        p5.setup = () => {
            p5.createCanvas(width, height);
            init();
        }

        p5.windowResized = () => {
            width = document.getElementById('programmingBG').offsetWidth;
            height = document.getElementById('programmingBG').offsetHeight;

            p5.resizeCanvas(width, height);

            init();
        }

        p5.draw = () => {
                if(!state.paused){
                    p5.background(255);
                    p5.fill(100);

                    p5.textFont('Roboto');
                    p5.textSize(valSize);

                    let i1 = 0;
                    let i2 = 0;

                    for(let x = 0; x < width; x = x + valSize){
                        for(let y = 0; y < height; y = y + valSize) {
                            if(symbols[i1] != undefined){
                                if (p5.random(0, 200) < 1) {
                                    symbols[i1][i2] = p5.random(vals);
                                }

                                p5.text(symbols[i1][i2], x, y + (valSize * 0.9));
                                i2++;
                            }
                        }
                        i2 = 0;
                        i1++;
                    }
                } else {
                    console.log("it gets paused?!");
                }
        }
    }

    function slideInPage(t){
        setProject(t);
        document.getElementById('projectSelector').classList.toggle('invisibility');
        document.getElementById('projectPage').classList.toggle('translate-x-full');
    }
        const [ref, inView, entry] = useInView({ threshold: 0.0 });
        const [t, setT] = useState(false);

        return (
            <div id="programmingPage" className={"bg-slate-400 snap-start absolute relative h-[calc(100dvh)] w-screen flex items-center justify-center "}>
                <InView as="div" id="programmingBG" onChange={(inView, entry) => setT(!inView)} className="z-0 h-[calc(100dvh)] w-screen flex items-center justify-center">
                    <div className="overflow-hidden"><div className="blur-sm">
                        <ReactP5Wrapper sketch={programmingPageSketch} paused={t}/>
                    </div></div>

                </InView>
                <div id={"projectSelector"} className="absolute z-5 h-[calc(100dvh)] w-screen flex flex-col items-center justify-center select-none space-x-5 space-y-5 visible">
                        <div className={"text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-led font-bold text-center"}>Programming Projects</div>
                        <div className={"w-4/5 sm:3/5 md:w-4/5 lg:w-3/5 grid grid-rows-3 grid-cols-2 md:grid-cols-3 md:grid-rows-2 gap-2 sm:gap-4 md:gap-5 lg:gap-10"}>
                                <div className={"static relative group items-center justify-center aspect-w-1 aspect-h-1 order-1"} onClick={() => slideInPage(1)}>
                                    <img src={require('../Images/paths_5.png')} className={"absolute transition ease-in-out group-hover:opacity-50 group-hover:scale-105 duration-50 h-full w-full object-cover object-center"}/>
                                    <div className={"absolute text-sm md:text-l lg:text-xl text-center font-roboto group-hover:opacity-100 opacity-0 h-full w-full flex items-center justify-center "}>Procedural Generation <br /> GameProgramming<br /> (Unity, C#)<br />2022</div>
                                </div>
                                <div className={"static relative group items-center justify-center col-span-2 order-3 md:order-2"} onClick={() => slideInPage(3)}>
                                    <img src={require('../Images/impressionist_landscape_2.png')} className={"absolute transition ease-in-out group-hover:opacity-40 group-hover:scale-105 duration-50 h-full w-full object-cover object-center"}/>
                                    <div className={"absolute text-sm md:text-l lg:text-xl text-center font-roboto group-hover:opacity-100 opacity-0 h-full w-full flex items-center justify-center "}>Impressionism Generator <br/> Generative Arts <br/>(Processing, P5.js)<br/>2020 / 2023</div>
                                </div>
                                <div className={"static relative group items-center justify-center aspect-w-1 aspect-h-1  order-2 md:order-3"} onClick={() => slideInPage(2)}>
                                    <img src={require('../Images/slicing.png')} className={"absolute transition ease-in-out group-hover:opacity-40 group-hover:scale-105 duration-50 h-full w-full object-cover object-center"}/>
                                    <div className={"absolute text-sm md:text-l lg:text-xl text-center font-roboto group-hover:opacity-100 opacity-0 h-full w-full flex items-center justify-center "}>Sheet Music Slicing<br /> Computervision <br />(Typescript, OpenCV)<br />2021</div>
                                </div>
                                <div className={"static relative group items-center justify-center aspect-w-1 aspect-h-1 order-4"} onClick={() => slideInPage(4)}>
                                    <img src={require('../Images/talk12.png')} className={"absolute transition ease-in-out group-hover:opacity-40 group-hover:scale-105 duration-50 h-full w-full object-cover object-center"}/>
                                    <div className={"absolute text-sm md:text-l lg:text-xl text-center font-roboto group-hover:opacity-100 opacity-0 h-full w-full flex items-center justify-center "}>Master Thesis:<br/> Emotional Chatbots<br/> Machine Learning <br/>(Python, Pytorch, DialoGPT)<br/>2022-2023</div>
                                </div>
                                <div className={"static relative group items-center justify-center aspect-w-1 aspect-h-1 order-5"} onClick={() => slideInPage(5)}>
                                    <img src={require('../Images/reinforcementlearning.png')} className={"absolute transition ease-in-out group-hover:opacity-40 group-hover:scale-105 duration-50 h-full w-full object-cover object-center"}/>
                                    <div className={"absolute text-sm md:text-l lg:text-xl text-center font-roboto group-hover:opacity-100 opacity-0 h-full w-full flex items-center justify-center "}>Self-Driving Car <br/> Reinforcement Learning <br/>(Unity, MLAgents)<br/>2022</div>
                                </div>
                        </div>

                </div>
                <div id={"projectPage"} className={"absolute z-5 duration-500 ease-in ease-out transition-all bg-slate-300 h-[calc(100dvh)] w-screen translate-x-full"}>
                    <ProjectPage project={project} back={() => slideInPage(1)}/>
                </div>
            </div>

        );





}


