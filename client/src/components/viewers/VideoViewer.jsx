import React from 'react'
import { Ratio } from 'react-bootstrap'

const VideoViewer = ({video}) => {
    return (
        <Ratio aspectRatio='16x9'>
            <video controls>
                <source src={video} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </Ratio>
    )
}

export default VideoViewer