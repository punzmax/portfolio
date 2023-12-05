import React, { useState, useRef, useEffect } from 'react';
import {DomainWarpingSketch} from "./DomainWarpingSketch";
import {ImpressionismSketch} from "./ImpressionismSketch";
import {InView, useInView} from "react-intersection-observer"
import YoutubeEmbed from "./YoutubeEmbed";

export function ProjectPage(props) {
    const lButton = '<';
    const rButton = '>';
    let activeProject = 0;
    const [activePage, setActivePage] = useState(0);
    const [selectedImage, setSelectedImage] = useState();
    let leftHidden = true;
    let rightHidden = false;


    if(props.project !== undefined){
        activeProject = props.project;
    }


    const {
        project = 123,
        back = () => {}
    } = props;

    const init= [
        'a',
        'b',
        'c'
    ];
    const proceduralGenerationText= [
        <div>In early 2022, as part of my degree in Interactive Media in Hagenberg, I started work on the "Procedural Generation Project".
            < br />
            On the surface, it looks very much like a Minecraft clone in Unity, which (granted) it kindof is. Buuuut, I made some interesting improvements which I'll explain in the following pages.
            < br />
            <div className={"hidden sm:inline"}> The thing that sparked my interest in the topics of procedural generation is the fact that you can create very complex and organic things by interweaving a couple of simple rules and processes.
                The whole thing is based on voxels because they can provide a level of abstraction that lends itself to procedural generation. </div>
            To create the terrain, I used a couple of Perlin-Noise functions, which can modulate eachother by feeding the result of one noise into the input of another (this is called domain warping).
            Through this, a realistic looking height map can be created.
        </div>,
        <div>
            One of the issues that arose was performance. The main reason for this was the fact, that Unity was tasked with generating a huuuuge number of polygons at runtime. Which it then had to render in realtime.< br />
            I already tried to preempt this, by looking which of the faces are even visible. A voxel is basically a point in space that holds some information (think of a 3D Pixel), which means we can represent it how we choose to. Going the cube-route means that, if 2 voxels touch each other, there are 4 faces which are invisible (2 for each side). I check which sides are visible and hide the unnecessary faces. However, this is still not enough.< br />
            <div className={"hidden sm:inline"}>This is why I tried to come up with an algorithm, that groups together as many faces as possible, while still being rather light-weight. < br />
            The result can be seen on the picture: It is not perfect, but it does it's job just fine. < br />
            The actual algorithm is a variation of the flood fill algorithm, that tries to fill as big of a space as possible (while only using squares, as to ensure the simplicity of the resulting faces).</div>
            <div className={"inline sm:hidden"}>To solve this, I wrote an algorithm that groups faces together.</div>
        </div>,
        <div>
            To further improve the generation of natural looking terrain I implemented a simple voxel-based erosion system. This system is mostly based on at article "Simulating hydraulic erosion" by John Talle (which you can find <a href={"https://jobtalle.com/simulating_hydraulic_erosion.html"} className={"hover:opacity-50 underline"}>here</a>).< br />
            <br className={"hidden sm:inline"}/>
            <div className={"hidden sm:inline"}> It works like this:  <br />
            <ul class="list-disc">
                <li>Pick a point on the heightmap (preferably higher up). </li>
                <li>Look at its 8 neighbors, and pick the lowest.</li>
                <li>Decend to that neighbor. By chance: Remove voxel at last position. Save that removed voxel in agent as sediment.</li>
                <li>If all neighbors are the same height or higher: deposit saved sediments at current position until a lower neighbor exists.</li>
                <li>If all neighbors are too high and there is no sediment to deposit: Terminate Agent and move it to a new position at heightmap.</li>
            </ul>
            </div>
        </div>,
        <div>
            I also implemented some roads and tunnels, on which i placed randomly generated buildings. <br/>
            The road-creation is also agent based. The agents are placed on random positions with random directions to go in. They split off at 90 degree angles at preset random intervals. These agents and streets are terminated if they collide with each other or start closely together in parallel (we dont want them to cover everything). After all of them are terminated, tunels are created between closest points in roads that are not conected, untill all roads form a singular network. It was important to me that every point on on any road could reach any other point by following this network. <br/>
        </div>,
        <div>
            The standard shading in Unity did not match well with the pixelated look of the voxels and textures I created, which is why I wrote my own render pipeline (based on what I learned in the computer graphics course at the FH Hagenberg). <br/>
            The important thing was, that the shading is also grid based, and that this grid would match up with the pixels on the textures. <br/>
            <div className={"hidden sm:inline"}>With a custom render pipeline, this is very easy: <br/>
            All you need to do is quantify brightness values in the fragment shader in a grid of predefined size. This means that when the renderer works on the brightness value of a face at the position [0, 0] (relative to the face) it sets the same value to all of the positions on that face inside the grid ([0,1], [0,2].... [x,x]). If a texture is the size of 16x16, then the grid can be set to the same size, meaning that every point texture recieves its own lighting uniformly. <br/>
            The result can be seen on the picture on the left, especially on the shaded area in the middle.</div>
        </div>
    ];

    const sheetMusicSlicingText= [
        <div>
           One of my Semester Projects at the FH was a collaboration with the Linz-based company Oktav. <br/>
            They are a sheet music subscription service (like Netflix but for music notation). The problem they have is that all of their sheet music is in A4 format, which looks fine on a computer screen. However, people usually dont have their computerscreen next too the intstrument they are learning- But they A4 format is nearly unreadable on a mobile phone. <br/>
            To solve this, me and 2 collegues where tasked with creating a way to automatically cut out the notation lines, which allows us to arrange them horizontally, one after another into a kind of "Infinte Sausage", which can then be viewed on a mobile screen. Detecting the bar lines allows us to even scroll this sausage according to a metronome.<br/>
            <div className={"hidden sm:inline"}>We acomplished the slicing, by using the OpenCV implementation of the Hugh-Lines algorithm, which converts everything in an image into a representation made up solely of vectorized lines. We then stripped away all non-horizontal lines under a certain threshold, and only left those that where parallel to each other: These are the lines in a staff, and by looking at the distances to eachother, it is easy to tell which lines belong to the same staff. The same approach also works on bar-lines and repetition signs.</div> <br/>
        </div>,
        <div>
            One of my Semester Projects at the FH was a collaboration with the Linz-based company Oktav. <br/>
            They are a sheet music subscription service (like Netflix but for music notation). The problem they have is that all of their sheet music is in A4 format, which looks fine on a computer screen. However, people usually dont have their computerscreen next too the intstrument they are learning- But they A4 format is nearly unreadable on a mobile phone. <br/>
            To solve this, me and 2 collegues where tasked with creating a way to automatically cut out the notation lines, which allows us to arrange them horizontally, one after another into a kind of "Infinte Sausage", which can then be viewed on a mobile screen. Detecting the bar lines allows us to even scroll this sausage according to a metronome.<br/>
            <div className={"hidden sm:inline"}>We acomplished the slicing, by using the OpenCV implementation of the Hugh-Lines algorithm, which converts everything in an image into a representation made up solely of vectorized lines. We then stripped away all non-horizontal lines under a certain threshold, and only left those that where parallel to each other: These are the lines in a staff, and by looking at the distances to eachother, it is easy to tell which lines belong to the same staff. The same approach also works on bar-lines and repetition signs.</div> <br/>
        </div>,
    ];

    const genArtText= [
        <div>One of my favorite things that I've ever done is the Impressionism Generator, which turns any picture you feed into it into an impressionist painting (maybe pointilist if we're splitting hairs, haha).
            < br />
            At the time of making this, I was obsessed with Monet and Roman Mosaics (still am), and how they create the illusion of a fully formed image from a collection of dots.
            < br />
            The idea of treating images as pure color and shadow (rather than a collection of objects) is very appealing to me, which inspired me to apply the impressionists techniques to generative art.
            < br />
            <div className={"hidden sm:block"}>I also made a variation on this, where the picture is made up of Emojis, rather than dots. (click the "Switch Mode" button below the image)</div><div className={"block sm:hidden"}>Visit this page on a desktop device to see the real time version!</div>
            The original version was done in Java using Processing, but I converted it to run on the browser using P5.js.  <br/>
        </div>
    ];

    const reinforcementLearningText = [
        <div>
        Another noteworthy project I made was the "Selfdriving Car" in Unity, which also came about through a course at the FH Hagenberg. < br />
        The task basically boiled down to: "Here is a road, a car and a finishline. Try to reach it." < br />
        For this we used "ML Agents", a reinforcement-learning library for Unity. This means having an agent trying out something for so long, till it figures it out by chance. The agent learns through reward and punishment, and how these are distributed is the most important part. <br/>
        So the first task is defining when to reward the agent. My solution to this was: 1. Reward when it drives in the middle of the road (less likely to fall off). 2. Reward when it reaches the finishline. 3. Penalize when it drives of track. <br/>
        The first problem is telling where the middle of the road even is- How do we show the car where it is in relation to the road? The approach to this, was creating an array of sensors at the bumper of the car that fan out- each shooting a ray in a direction. These rays are arranged in such a way, that they all collide with the road when the optimal condition is met (middle of the road). From this we can reward the car depending on the number sensors that return a favourable result. < br />
        After letting the training process run for a couple of days, the result was a car that consistently follows the road its on, even if its a road it wasn't trained on.
        At the end of the course we compared all of the different solutions we came up with and raced the cars against each other. <br/>
        <div className={"hidden sm:inline"}>My car won by a slight margin (the others where waaaaay faster than mine, which caused them to fall off the road haha).</div>
        </div>];
    const sadChatbotsText = [<div>
        In September 2022 I started work on my master's project, which I called "Emotional Chatbots".
        The goal was to create dialogue agents that respond with a predefined emotion. One would always be sad, one would be happy, another one would act disgusted and so on. <br/>
        My idea on how to accomplish this was the following: Get a dialogue based language model and train it further on specific emotional data. The problem with this was that such a dataset does not exist. There are sets that contain dialog data (which is preferable for a chatbot, because it takes previous turns in the conversation into account) with emotional labels, but they are waaaaaaay to small to create the desired effect.
        This meant that my main task would be to procure such a dataset myself. For this i used various sources, ranging from movie-scripts to  Reddit and Twitter threads, anything I could get my hands on that has multiple lines of conversation. I then ran this data through a transformer based emotion-classifier, which helped me label the individual lines. I then finetuned separate versions of DialoGPT (which is based on GPT-2). <br/>
        <br/>
        <div className={"hidden sm:inline"}>My masters-thesis consisted of comparing this approach to modern models such as ChatGPT which came out a couple of months later, in their capabilities to answer in a consistent emotional tone. This required me to build a system that allows me to automatically evaluate the performance on this task. <br/>
        My models fought bravely, but needless to say, they had no chance against the newer and much bigger ChatGPT.</div>
    </div>
    ];

    const text = [
        init,
        proceduralGenerationText,
        sheetMusicSlicingText,
        genArtText,
        sadChatbotsText,
        reinforcementLearningText
    ];

    const titles = [
        [''],
        ['Procedural Generation', 'Optimizing Mesh Geometry', 'Erosion', 'Roads & Buildings', 'Custom Shading'],
        ['Sheet Music Slicing', 'Sheet Music Slicing'],
        ['Impressionism Generator', 'w'],
        ['Emotional Chatbots'],
        ['Self Driving Car (Unity)']
    ];


    const proceduralGenerationImages = [
        require('../Images/paths_1.png'),
        require('../Images/paths_2.png'),
        require('../Images/paths_9.png'),
        require('../Images/paths_3.png'),
        require('../Images/paths_6.png')
    ];

    const chatbotImages = [
        require('../Images/talk123.png')
    ];

    const genArtImages = [
        require('../Images/impressionist_landscape.png'),
        require('../Images/impressionist_portrait_2.png')
    ];
    const sheetMusicImages = [
        require('../Images/slicing2.png'),
        require('../Images/slicing.png')
    ];

    const reinforcementLearningImage = [];

    const images = [
        proceduralGenerationImages,
        proceduralGenerationImages,
        sheetMusicImages,
        genArtImages,
        chatbotImages,
        reinforcementLearningImage,
    ];




    function hideArrows(v){
        if(activePage === 0){   //disable left arrow
            document.getElementById('leftArrow').classList.toggle('hidden');
            leftHidden = true;
        } else if(leftHidden){
            leftHidden = false;
            document.getElementById('leftArrow').classList.toggle('hidden');
        }

        if(activePage + 1 === text[activeProject].length){  //disable right arrow
            document.getElementById('rightArrow').classList.toggle('hidden');
            console.log('yes');
            rightHidden = true;
        } else if(rightHidden){
            rightHidden = false;
            document.getElementById('rightArrow').classList.toggle('hidden');
        }
    }


    const onClick = (v) => {

        setActivePage(activePage + v);
        hideArrows();
    }


    const makeBottomImages = () => {
        let ims = Array();




        for(let i = 0; i < images[activeProject].length; i++){
            ims.push(
                <div className={"transition ease-in-out drop-shadow-lg duration-50 h-14 w-14 hover:opacity-60 hover:rounded-md rounded-full flex items-center justify-center "}>
                    <img key={i} src={images[activeProject][i]} onClick={() => {
                        setActivePage(i)
                    }} className={"h-14 w-14 hover:opacity-60 hover:rounded-md rounded-full object-cover  "}/>
                </div>
            );
        }

        if(activeProject != 3 && activeProject != 5  && activeProject != 4 ){
            return(<div className={"relative h-24 w-auto flex grid grid-flow-col auto-cols-max gap-5 items-center justify-center place-content-center"}>{ims}</div>);
        }

    }


    const placeImg = () => {
        if(activeProject === 3){
            return(
                <div>
                    <div className={"overflow-hidden block sm:hidden h-[30vh] md:h-[50vh]  flex drop-shadow-lg rounded-md items-center justify-center object-fit text-center"}>
                        <img src={images[activeProject][activePage]} className={"md:w-4/5 self-end rounded-md center object-fit"} alt={"asd"}/>
                    </div>
                    <div className={"hidden sm:block"}>
                        <ImpressionismSketch/>
                    </div>
                </div>
            );
        } else if(activeProject === 5) {
            return(<video className={"w-[80vh] center object-fit"} src={require('../Video/IMG_7340.MP4')} autoPlay="true" loop={true} />);
        }else if(activeProject === 2 && activePage==0) {
            return(<video className={"h-[30vh] md:h-[50vh] center object-fit"} src={require('../Video/sheetMusicSlicing(1).mp4')} autoPlay="true" loop={true} />);
        }else {
            return(
                <div className={"h-[30vh] md:h-[50vh] overflow-hidden  flex drop-shadow-lg rounded-md items-center justify-center object-fit text-center"}>
                    <img src={images[activeProject][activePage]} className={"md:w-4/5 self-end rounded-md center object-fit"} alt={"asd"}/>
                </div>

            );
        }
    }

    return (
        <div className="h-[calc(100dvh)] bg-white flex flex-col md:flex-row w-screen relative items-center justify-center select-none">
            <div id="imageContainer" className={"relative h-[40vh] md:h-[calc(100dvh)] md:w-1/2 flex items-center justify-center grid grid-row-2 place-content-center"}>
                <div className={"h-fit flex items-center justify-center place-content-center"}>
                    {placeImg()}
                </div>
                 {makeBottomImages()}
            </div>
            <div className={"h-[calc(100dvh)] drop-shadow-xl bg-slate-100 relative w-5/6 md:w-1/2 flex top-0 md:items-center justify-center"}>
                <div className={"absolute md:center-0 md:p-2 md:w-5/6"}>
                    <div className={"text-xl sm:text-2xl md:text-5xl lg:text-7xl 4xl:text-8xl font-bold sm:py-5"} >{titles[activeProject][activePage]}<br/></div>
                    <div className={"lg:w-4/5 text-xs md:text-base lg:text:lg 4xl:text-xl font-normal"} >{text[activeProject][activePage]}</div>
                </div>
            </div>

            <div className={"absolute h-[calc(100dvh)] left-0 flex items-center justify-center"}>
                <div onClick={() => {setActivePage(0); props.back()}} className={"center text-6xl hover:opacity-50"}>{lButton}</div>
            </div>

        </div>
    );


}

