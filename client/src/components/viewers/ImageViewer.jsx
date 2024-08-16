import React from 'react'
import { Image } from 'react-bootstrap'
import styles from './Viewers.module.css'

const ImageViewer = ({image, filename}) => {
    return (
        <Image className={styles.image} src={image} alt={filename} />
    )
}

export default ImageViewer