











import React, { useState, useRef, useEffect } from 'react';


export function ProjectPage(props) {
    const lButton = '<';
    const rButton = '>';
    let activeProject = 0;
    const [activePage, setActivePage] = useState(0);
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
        'Maybe my favorite Project was the Procedural Generation Project.',
        'proceduralGenerationText222222222222222222222222222222222222222222222222222',
        'proceduralGenerationText333333333333333333333333333333333333333333333333333333'
    ];

    const sheetMusicSlicingText= [
        'sheetMusicSlicingText1111111111111111111111111111111111111111111111111',
        'sheetMusicSlicingText222222222222222222222222222222222222222222222222222',
        'sheetMusicSlicingText333333333333333333333333333333333333333333333333333333'
    ];

    const genArtText= [
        "Maybe my favorite course that I've ever had we",
        'genArtText222222222222222222222222222222222222222222222222222',
        'genArtText333333333333333333333333333333333333333333333333333333'
    ];


    const text = [
        init,
        proceduralGenerationText,
        sheetMusicSlicingText,
        genArtText
    ];

    const proceduralGenerationImages = [
        '../Images/paths_1.png',
        '../Images/paths_2.png',
        '../Images/paths_3.png',
    ];

    const images = [
        proceduralGenerationImages,
        proceduralGenerationImages,
        proceduralGenerationImages,
        proceduralGenerationImages
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


    return (
        <div className="h-screen bg-white flex grid-col-2 gap-10 w-screen relative items-center justify-center select-none grid-col-2">
            <div className={"relative h-screen flex items-center justify-center"}>
                <img src={require('../Images/paths_5.png')} className={""}/>
                <div id={'leftArrow'} className={"absolute h-screen left-0 flex items-center justify-center hidden"}>
                    <div onClick={()=> {onClick(-1)}} className={"center text-4xl hover:opacity-50"}>{lButton}</div>
                </div>
                <div id={'rightArrow'} className={"absolute h-screen right-5 flex items-center justify-center"}>
                    <div onClick={()=> {onClick(1)}} className={"text-4xl hover:opacity-50"}>{rButton}</div>
                </div>
            </div>
            <div className={"h-screen p-20 flex items-center justify-center"}>
                <div>{text[activeProject][activePage]}</div>
            </div>
            <div className={"absolute h-screen left-0 flex items-center justify-center"}>
                <div onClick={() => props.back()} className={"center text-6xl hover:opacity-50"}>{lButton}</div>
            </div>
        </div>
    );


}
