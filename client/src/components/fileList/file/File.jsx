import React from 'react'
import { Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolderOpen, faFileImage, faFileAudio, faFileVideo, faFileWord, faFilePdf, faFile, faTrashCan, faArrowRightArrowLeft } from '@fortawesome/free-solid-svg-icons'
import './File.css'
import formatBytes from '../../../utils/formatBytes'

const File = ({ file, viewType, deleteDir, moveFile }) => {
    const fileIcons = {
        png: faFileImage, jpeg: faFileImage, jpg: faFileImage, bmp: faFileImage,
        gif: faFileImage, mp3: faFileAudio, wav: faFileAudio, ogg: faFileAudio,
        mp4: faFileVideo, txt: faFileWord, pdf: faFilePdf, dir: faFolderOpen
    }

    if (viewType === 'list') {
        return (
            <>
                <FontAwesomeIcon icon={fileIcons[file.type] ?? faFile} size='2x' />
                <div className='roboto-medium name'>{file.name}</div>
                <div className='roboto-medium date'>{file.createdAt.slice(0, 10)}</div>
                <div className='roboto-medium size'>
                    {file.type === 'dir' ?
                        <div className='button-container'>
                            <Button className='danger-button' onClick={(event) => deleteDir(event, file)}>
                                <FontAwesomeIcon className='me-1' icon={faTrashCan} />
                                Видалити
                            </Button>
                        </div>
                        :
                        <>
                            <div className='file'>
                                {formatBytes(file.size)}
                            </div>
                            <div className='button-container'>
                                <Button className='info-button' onClick={(event) => moveFile(event, file)}>
                                    <FontAwesomeIcon className='me-1' icon={faArrowRightArrowLeft} />
                                    Перемістити
                                </Button>
                            </div>
                        </>
                    }
                </div>
            </>
        )
    }

    if (viewType === 'grid') {
        return (
            <div className='text-center'>
                <FontAwesomeIcon icon={fileIcons[file.type] ?? faFile} size='4x' />
                <div className='roboto-medium name'>{file.name}</div>
                {file.type === 'dir' ?
                    <div className='button-container'>
                        <Button className='danger-button' onClick={(event) => deleteDir(event, file)}>
                            <FontAwesomeIcon className='me-1' icon={faTrashCan} />
                            Видалити
                        </Button>
                    </div>
                    :
                    <>
                        <div className='file'>
                            {formatBytes(file.size)}
                        </div>
                        <div className='button-container'>
                            <Button className='info-button' onClick={(event) => moveFile(event, file)}>
                                <FontAwesomeIcon className='me-1' icon={faArrowRightArrowLeft} />
                                Перемістити
                            </Button>
                        </div>
                    </>
                }
            </div>
        )
    }
}

export default File