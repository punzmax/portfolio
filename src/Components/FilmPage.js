import { Carousel } from 'flowbite-react';
import React, { useState, forwardRef } from 'react';
import {ProjectPage} from "./ProjectPage";
import {ReactP5Wrapper} from "react-p5-wrapper";
import {InView, useInView} from "react-intersection-observer";
import YoutubeEmbed from "./YoutubeEmbed";
import {filmPageSketch2} from "./unusedSketch";
function filmPageSketch(p5) {

}
export function FilmPage() {


    const [ref, inView, entry] = useInView({ threshold: 0.0 });
    const [t, setT] = useState(false);

    function filmPageSketch(p5) {
        let width = document.getElementById('filmPage').offsetWidth;
        let height = document.getElementById('filmPage').offsetHeight;
        let te;

        let state = {
            paused: false
        }
        p5.updateWithProps = props => {
            state = Object.assign(state, props)
        };

        let resized = false;

        let col1 = ['#FB6376', '#86EE37', '#F34C9A'];
        let col2 = ['#D7142B', '#FFDA33', '#EA0DA8'];

        let numEnts = 3;
        let grow;
        let change;
        let size;
        let offset;
        let colGrow;

        function init(){
            grow = new Array();
            change = new Array();
            size = new Array();
            offset = new Array();
            colGrow = new Array();
            te = new Array();


            for(let i = 0; i < 3; i++){
                grow.push(p5.random(true, false));
                change.push(p5.random(0, 1));
                colGrow.push(true);
                size.push(p5.random(10, 200));
                te.push(p5.random(0, 10));
            }
        }

        p5.windowResized = () => {
            width = document.getElementById('filmPage').offsetWidth;
            height = document.getElementById('filmPage').offsetHeight;
            p5.resizeCanvas(width, height);

            resized = true;

            init();
        }

        p5.setup = () => {
            p5.createCanvas(width, height);
            init();
        }

        p5.draw = () => {
            if(resized){
                p5.background(p5.color('#A2FFE2'));
                resized = false;
            }

            if(!state.paused) {

                p5.background(p5.color('#A2FFE2'), 5);

                for (let i = 0; i < 3; i++) {
                    let x = width * p5.noise(te[i]);
                    let y = height * p5.noise(te[i] + 5);


                    //p5.noFill();

                    p5.fill(p5.lerpColor(p5.color(col1[i]), p5.color(col2[i]), change[i]));

                    if (grow[i]) {
                        size[i] = size[i] + 1;
                    } else {
                        size[i] = size[i] - 1;
                    }

                    if (colGrow[i]) {
                        change[i] = change[i] + 0.01;
                    } else {
                        change[i] = change[i] - +0.01;
                    }

                    if (size[i] > 400) {
                        grow[i] = false;
                    } else if (size[i] < 20) {
                        grow[i] = true;
                    }

                    if (change[i] > 1) {
                        colGrow[i] = false;
                    } else if (change[i] < 0) {
                        colGrow[i] = true;
                    }

                    p5.ellipse(x, y, size[i], size[i]);

                    te[i] = te[i] + 0.002;
                }
            }

        }
    }

    return (
        <div id="filmPage" className={"flex z-10 snap-start absolute relative h-[calc(100dvh)] w-screen items-center justify-center"}>
            <div className="blur-xl z-0 flex items-center justify-center">
                <InView onChange={(inView, entry) => setT(!inView)} className="blur-sm">
                    <ReactP5Wrapper sketch={filmPageSketch} paused={t}/>
                </InView>
            </div>
            <div id={"filmCont"} className="p-2 absolute z-5 max-h-[calc(100dvh)] h-[calc(100dvh)] w-screen flex flex-col items-center justify-center select-none space-x-5 space-y-5 visible">
                <div className={"text-xl text-center md:text-4xl 4xl:text-8xl font-blueocean"}>Short Films and Animation</div>
                    <div className={"h-auto w-auto md:w-3/4 lg:w-1/2 sm:grid sm:grid-rows-2 sm:grid-cols-2 items-center justify-center"}>
                        <div className={"relative h-full text-xs sm:text-sm md:text-base 4xl:text-xl col-span-2 lg:col-span-1 row-span-1 lg:row-span-2 text-slate-900"}>
                            <div className={""}>
                                I also participated in a some short-film projects. My 2 favorite being <a href={"https://www.youtube.com/watch?v=nuZHCw0U-No&embeds_referring_euri=http%3A%2F%2Flocalhost%3A3000%2F&source_ve_path=MjM4NTE&feature=emb_title"} className="hover:opacity-50 font-bold">"The Adventures of Justiceman"</a> and <a href={"https://www.youtube.com/watch?v=_Mi1cmITPnc&embeds_referring_euri=http%3A%2F%2Flocalhost%3A3000%2F&source_ve_path=MjM4NTE&feature=emb_title"} className={"hover:opacity-50 font-bold"}>"The Disappearance of Dora D."</a><br/> < br className={"hidden sm:inline"}/>
                                <a href={"https://www.youtube.com/watch?v=nuZHCw0U-No&embeds_referring_euri=http%3A%2F%2Flocalhost%3A3000%2F&source_ve_path=MjM4NTE&feature=emb_title"} className="hover:opacity-50 font-bold">"The Adventures of Justiceman"</a>  was an animation I did for the FH with <a href={"https://florianwinkler.at/"} className={"hover:opacity-50 font-bold"}> Florian Winkler</a>. Meaning I came up with the idea and he did all the manual labour, haha. I also did the music and sound and I had my voice acting debut as the thief, who, for some reason, has a fake french accent.<br/>
                                <div className={"hidden sm:block"}> It's been shown at the Crossing Europe Film festival and received an honorable mention at the "Best Austrian Animation Award", which is a huge honor.</div> <br className={"hidden sm:inline"}/>
                                <div className="aspect-w-16 aspect-h-9 sm:hidden">
                                    <iframe src='https://www.youtube.com/embed/nuZHCw0U-No?si=F5xxsgwtQrbjxHfw' frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen/>
                                </div>
                                <a href={"https://www.youtube.com/watch?v=_Mi1cmITPnc&embeds_referring_euri=http%3A%2F%2Flocalhost%3A3000%2F&source_ve_path=MjM4NTE&feature=emb_title"} className={"hover:opacity-50 font-bold"}>"The Disappearance of Dora D."</a> is a short film, for which I wrote the script. <div className={"hidden sm:inline"}>I read a lot of post-modern authors at the time, such as Philipp K. Dick, Kurt Vonnegut and David Foster Wallace, which inspired me to write something that uses an unsual medium (like in my case a fake youtube compilation) to tell a story. It makes sense when you watch it, I promise.</div> <br className={"block sm-hidden"}/>
                                I co-directed it with <a href={"https://florianwinkler.at/"} className={"hover:opacity-50 font-bold"}> Florian Winkler</a>. (Again, I did all the music, sounddesign, mixing as well as the mastering myself)<br/><br className={"hidden sm:inline"}/>
                                Check them out if you're ever bored!
                            </div>
                        </div>
                        <div className="aspect-w-16 aspect-h-9 hidden sm:block">
                            <iframe src='https://www.youtube.com/embed/nuZHCw0U-No?si=F5xxsgwtQrbjxHfw' frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen/>
                        </div>
                        <div className="aspect-w-16 aspect-h-9 hidden sm:block">
                            <iframe src='https://www.youtube.com/embed/_Mi1cmITPnc?si=O2MZgECb9O-kxBJn' frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen></iframe>
                        </div>
                </div>
            </div>
        </div>

    );





}


