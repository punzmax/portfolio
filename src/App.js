import React, { useState, useRef, useEffect } from 'react';
import {StartPage} from "./Components/StartPage";
import {ProgrammingPage} from "./Components/ProgrammingPage";
import {ProjectPage} from "./Components/ProjectPage";
import {Interests} from "./Components/Interests";
import {ProgrammingGalery} from "./Components/ProgrammingGalery";
import Loadable from "@loadable/component"
import {MusicPage} from "./Components/MusicPage";
import {FilmPage} from "./Components/FilmPage";
import {accordionTheme} from "flowbite-react/lib/esm/components/Accordion/theme";


export default function App() {


    const moveButton = '<';
    const activePage = 0;

    const onClick = () => {
        console.log('click')
    }


    const scrollToProgramming = (programmingPage) => programmingPage.current.scrollIntoView();

    let scrolling = false;


    const activateSketches = () => {
       console.log("tst")
    }

    const fullPageClassName = "snap-start h-[calc(100dvh)] w-screen flex items-center justify-center text-5xl";
    const menuPointClassName = "transition ease-in-out hover:opacity-50 hover:scale-110 duration-50";

    return (
        <div className="absolute inset-0">
            <div  className={"relative h-[calc(100dvh)] w-screen inset-0"}>
                <div className="absolute snap-mandatory snap-y h-[calc(100dvh)] w-screen overflow-x-hidden">
                    <StartPage/>
                    <Interests/>
                    <div id={"programmingPage"}><ProgrammingPage/></div>
                    <MusicPage/>
                    <FilmPage/>
                </div>

                <div className={"hidden md:block absolute z-20 p-1 left-0 bottom-0 text-xs font-bold text-slate-800"}>© Maximilian Punz 2023</div>
            </div>
        </div>
    )
}