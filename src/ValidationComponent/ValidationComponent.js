import React from 'react';

const validaitonComponent = (props) => {
    let textOutput;
    if(props.length < 5) {
        textOutput = "Text too short";
    } else {
        textOutput = "Text long enough";
    }

    return (
        <div>
            {textOutput}
        </div>
    )
}

export default validaitonComponent;