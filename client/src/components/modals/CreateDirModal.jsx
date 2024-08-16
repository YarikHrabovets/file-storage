import React, { useState } from 'react'
import { Modal, Button, Alert, Form } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { createDir } from '../../api/filesApi'
import styles from './Modal.module.css'

const CreateDirModal = (props) => {
    const [error, setError] = useState(null)
    const [dirName, setDirName] = useState('')

    const createDirHandler = (dirName) => {
        if (dirName.length > 0) {
            createDir(props.files.currentDir, dirName)
            .then((data) => {
                setError(null)
                props.files.addFile(data)
                props.onHide()
            })
            .catch((e) => setError(e.response.data.message))
        } else if (dirName.length === 0) {
            setError('Заповніть всі поля')
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
                    Створення нової папки
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {error && 
                    <Alert variant='warning'>
                        <FontAwesomeIcon icon='triangle-exclamation' className='me-1' />
                        {error}
                    </Alert>
                }
                <Form.Label>Введіть назву</Form.Label>
                <Form.Control onChange={e => setDirName(e.target.value)} />
            </Modal.Body>
            <Modal.Footer>
                <Button className='w-100 success-button' onClick={() => createDirHandler(dirName)}>Створити</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default CreateDirModal