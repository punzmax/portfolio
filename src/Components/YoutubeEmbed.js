import React from "react";
import PropTypes from "prop-types";

const YoutubeEmbed = ({ embedId }) => {
    let width = window.innerWidth;
    let height = window.innerHeight;
    let h = 315;
    let w = 560;


    let smallerOne = height;

    if(height > width){
        smallerOne = width;
    }



    return (

        <div className="aspect-w-16 aspect-h-9">
            <iframe src='https://www.youtube.com/embed/${embedId}' frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen></iframe>
        </div>
    );
}

YoutubeEmbed.propTypes = {
    embedId: PropTypes.string.isRequired
};

export default YoutubeEmbed;
