import React from 'react'

const AudioViewer = ({audio}) => {
    return (
        <audio controls>
            <source src={audio} type="audio/mpeg" />
            Your browser does not support the audio element.
        </audio>
    )
}

export default AudioViewer