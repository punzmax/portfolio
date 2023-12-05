import React from "react";
import PropTypes from "prop-types";

const YoutubeEmbed2 = ({ embedId }) => {
    let width = window.innerWidth;
    let height = window.innerHeight;
    let h = 0;
    let w = 0;


    let smallerOne = height;
    if(height > width){
        smallerOne = width;
    }


    if(smallerOne > 1000){
        w = 560 * 1.2;
        h = 315 * 1.2;
    } else if (smallerOne > 900){
        w = 560;
        h=315;
    } else if (smallerOne > 700){
        w = 560 * 0.9;
        h=315 * 0.9;
    }else if (smallerOne > 500){
        w = 560 * 0.7;
        h=315 * 0.7;
    } else {
        w = 560 * 0.5;
        h=315 * 0.5;
    }

    return (
        <div className="video-responsive" >
            <iframe
                width={w}
                height={h}
                src={`https://www.youtube.com/embed/${embedId}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Embedded youtube"
                className={"w-full aspect-video"}
            />
        </div>
    );
}

YoutubeEmbed2.propTypes = {
    embedId: PropTypes.string.isRequired
};

export default YoutubeEmbed2;
