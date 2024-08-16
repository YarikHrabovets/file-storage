import React, { useState } from 'react'
import { Modal, ButtonGroup, Button, Alert, Spinner } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload, faTrashCan, faRightLeft, faSquareShareNodes } from '@fortawesome/free-solid-svg-icons'
import { downloadFile, deleteFile } from '../../api/filesApi'
import AudioViewer from '../viewers/AudioViewer'
import VideoViewer from '../viewers/VideoViewer'
import ImageViewer from '../viewers/ImageViewer'
import TextViewer from '../viewers/TextViewer'
import PdfViewer from '../viewers/PdfViewer'
import styles from './Modal.module.css'
import ColleagueList from '../colleague/ColleagueList'

const FileViewerModal = (props) => {
    const [error, setError] = useState(null)
    const [base64String, setBase64String] = useState(null)
    const [isShare, setIsShare] = useState(false)
    const viewers = {
        png: <ImageViewer image={base64String} filename={props.file.name} />,
        jpeg: <ImageViewer image={base64String} filename={props.file.name} />,
        jpg: <ImageViewer image={base64String} filename={props.file.name} />,
        bmp: <ImageViewer image={base64String} filename={props.file.name} />,
        gif: <ImageViewer image={base64String} filename={props.file.name} />, 
        mp3: <AudioViewer audio={base64String} />, wav: <AudioViewer audio={base64String} />,
        ogg: <AudioViewer audio={base64String} />, mp4: <VideoViewer video={base64String} />,
        txt: <TextViewer textBase64={base64String} />, pdf: <PdfViewer pdf={base64String} />
    }

    if (props.show) {
        downloadFile(props.file)
        .then((data) => {
            setError(null)
            const reader = new FileReader()
            reader.readAsDataURL(data)
            reader.onloadend = () => {
                setBase64String(reader.result)
            }
        })
        .catch((e) => setError(e.response.data.message))
    }

    const hideModal = () => {
        props.onHide()
        setBase64String(null)
        setIsShare(false)
    }

    const download = () => {
        const link = document.createElement('a')
        link.href = base64String
        link.download = props.file.name
        link.click()
        link.remove()
    }

    const remove = () => {
        deleteFile(props.file)
        .then((data) => {
            setError(null)
            const filtered = props.files.files.filter((file) => file.id !== props.file.id)
            props.files.setFiles(filtered)
            hideModal()
        })
        .catch((e) => setError(e.response.data.message))
    }

    const share = () => setIsShare(true)

    const getFileObject = () => {
        let arr = base64String.split(',')
        let mime = arr[0].match(/:(.*?);/)[1]
        let data = arr[1]

        let dataStr = atob(data)
        let n = dataStr.length
        let dataArr = new Uint8Array(n)

        while (n--) {
            dataArr[n] = dataStr.charCodeAt(n)
        }

        let file = new File([dataArr], props.file.name, { type: mime })
        return file
    }

    return (
        <Modal
            show={props.show}
            onHide={() => hideModal()}
            size="lg"
            className={styles.modal}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.file.name}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className='text-center'>
                {error && 
                    <Alert variant='warning'>
                        <FontAwesomeIcon icon='triangle-exclamation' className='me-1' />
                        {error}
                    </Alert>
                }
                {base64String === null ?
                    <Spinner animation='border' variant="dark" />
                    :
                    viewers[props.file.type] || <p>Неможливо відкрити цей файл</p>
                }
                {isShare &&
                    <div className='mt-3 mx-5'>
                        <h3>Виберіть кому надістати файл</h3>
                        <ColleagueList action={true} file={getFileObject()} />
                    </div>
                }
            </Modal.Body>
            <Modal.Footer>
                <ButtonGroup className='w-100'>
                    <Button className='success-button' onClick={() => download()} disabled={base64String === null}>
                        <FontAwesomeIcon icon={faDownload} className='me-1' />
                        Завантажити
                    </Button>
                    <Button variant='outline-info' onClick={() => share()} disabled={base64String === null}>
                        <FontAwesomeIcon icon={faSquareShareNodes} className='me-1' />
                        Поділитися
                    </Button>
                    <Button className='danger-button' onClick={() => remove()} disabled={base64String === null}>
                        <FontAwesomeIcon icon={faTrashCan} className='me-1' />
                        Видалити
                    </Button>
                    <Button className='info-button' onClick={() => hideModal()}>
                        <FontAwesomeIcon icon={faRightLeft} className='me-1' />
                        Закрити
                    </Button>
                </ButtonGroup>
            </Modal.Footer>
        </Modal>
    )
}

export default FileViewerModal