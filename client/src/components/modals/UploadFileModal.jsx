import React, { useState } from 'react'
import { Modal, Button, Alert, Form } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { uploadFile } from '../../api/filesApi'
import styles from './Modal.module.css'

const UploadFileModal = (props) => {
    const [error, setError] = useState(null)
    const [files, setFiles] = useState([])

    const uploadFileHandler = (files) => {
        if (files.length === 0) {
            return setError('Виберіть хочаб 1 файл')
        }
        for (const file of files) {
            uploadFile(props.files.currentDir, file)
            .then((data) => {
                setError(null)
                props.files.addFile(data)
                props.onHide()
            })
            .catch((e) => setError(e.response.data.message))
        }
    }

    return (
        <Modal
            show={props.show}
            onHide={props.onHide}
            size="lg"
            className={styles.modal}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Завантаження файлів
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {error && 
                    <Alert variant='warning'>
                        <FontAwesomeIcon icon='triangle-exclamation' className='me-1' />
                        {error}
                    </Alert>
                }
                <Form.Control multiple={true} type='file' onChange={e => setFiles(e.target.files)} />
            </Modal.Body>
            <Modal.Footer>
                <Button className='w-100 success-button' onClick={() => uploadFileHandler(files)}>Завантажити</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default UploadFileModal