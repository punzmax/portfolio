import React, { useState, forwardRef } from 'react';

export function ProgrammingGalery() {
    return (
        <div className="snap-start bg-green h-screen w-screen flex items-center justify-center text-5xl">
            <div className="flex h-screen w-screen bg-white">
                <div className="relative bg-yellow-200 h-max w-1/3 ">
                    <div className="z-0 blur hover:blur-none h-screen items-center justify-center text-5xl grid grid-cols-2 grid-rows-3 gap-4">
                        <div className={"place-self-stretch bg-yellow-100"}>
                            <img src={require('../Images/paths_1.png')} className={"inset-0 h-full w-full object-cover object-center rounded-lg"}/>
                        </div>
                        <div className={"place-self-stretch bg-yellow-300"}>
                            <img src={require('../Images/paths_2.png')} className={"inset-0 h-full w-full object-cover object-center rounded-lg"}/>
                        </div>
                        <div className={"place-self-stretch bg-yellow-400"}>
                            <img src={require('../Images/paths_3.png')} className={"inset-0 h-full w-full object-cover object-center rounded-lg"}/>
                        </div>
                        <div className={"place-self-stretch bg-yellow-300"}>
                            <img src={require('../Images/paths_4.jpg')} className={"inset-0 h-full w-full object-cover object-center rounded-lg"}/>
                        </div>
                        <div className={"place-self-stretch bg-yellow-200"}>
                            <img src={require('../Images/paths_5.png')} className={"inset-0 h-full w-full object-cover object-center rounded-lg"}/>
                        </div>
                        <div className={"place-self-stretch bg-yellow-300"}>
                            <img src={require('../Images/paths_6.png')} className={"inset-0 h-full w-full object-cover object-center rounded-lg"}/>
                        </div>
                    </div>
                </div>
                <div className="relative bg-yellow-200 h-screen w-1/3 ">
                    <div className="absolute z-10 h-screen w-full flex items-center justify-center text-5xl">Semesterprojekt Oktav</div>
                    <div className="z-0 h-screen items-center justify-center text-5xl grid grid-cols-2 grid-rows-3 gap-4">
                        <div className={"place-self-stretch bg-yellow-100"}>
                            <img src={require('../Images/paths_1.png')} className={"inset-0 h-full w-full object-cover object-center rounded-lg"}/>
                        </div>
                        <div className={"place-self-stretch bg-yellow-300"}>
                            <img src={require('../Images/paths_2.png')} className={"inset-0 h-full w-full object-cover object-center rounded-lg"}/>
                        </div>
                        <div className={"place-self-stretch bg-yellow-400"}>
                            <img src={require('../Images/paths_3.png')} className={"inset-0 h-full w-full object-cover object-center rounded-lg"}/>
                        </div>
                        <div className={"place-self-stretch bg-yellow-300"}>
                            <img src={require('../Images/paths_4.jpg')} className={"inset-0 h-full w-full object-cover object-center rounded-lg"}/>
                        </div>
                        <div className={"place-self-stretch bg-yellow-200"}>
                            <img src={require('../Images/paths_5.png')} className={"inset-0 h-full w-full object-cover object-center rounded-lg"}/>
                        </div>
                        <div className={"place-self-stretch bg-yellow-300"}>
                            <img src={require('../Images/paths_6.png')} className={"inset-0 h-full w-full object-cover object-center rounded-lg"}/>
                        </div>
                    </div>
                </div>
                <div className="relative bg-yellow-200 h-screen w-1/3 ">
                    <div className="absolute z-10 h-screen w-full flex items-center justify-center text-5xl">Emoji Portrait</div>
                    <div className="z-0 h-screen items-center justify-center text-5xl grid grid-cols-2 grid-rows-3 gap-4">
                        <div className={"place-self-stretch bg-yellow-100"}>
                            <img src={require('../Images/paths_1.png')} className={"inset-0 h-full w-full object-cover object-center rounded-lg"}/>
                        </div>
                        <div className={"place-self-stretch bg-yellow-300"}>
                            <img src={require('../Images/paths_2.png')} className={"inset-0 h-full w-full object-cover object-center rounded-lg"}/>
                        </div>
                        <div className={"place-self-stretch bg-yellow-400"}>
                            <img src={require('../Images/paths_3.png')} className={"inset-0 h-full w-full object-cover object-center rounded-lg"}/>
                        </div>
                        <div className={"place-self-stretch bg-yellow-300"}>
                            <img src={require('../Images/paths_4.jpg')} className={"inset-0 h-full w-full object-cover object-center rounded-lg"}/>
                        </div>
                        <div className={"place-self-stretch bg-yellow-200"}>
                            <img src={require('../Images/paths_5.png')} className={"inset-0 h-full w-full object-cover object-center rounded-lg"}/>
                        </div>
                        <div className={"place-self-stretch bg-yellow-300"}>
                            <img src={require('../Images/paths_6.png')} className={"inset-0 h-full w-full object-cover object-center rounded-lg"}/>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );



}