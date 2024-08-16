import React, { useState } from 'react'
import { Modal, Button, Alert, ListGroup } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightLeft, faCircleCheck, faFolderOpen } from '@fortawesome/free-solid-svg-icons'
import { fetchDirs, moveFile } from '../../api/filesApi'
import styles from './Modal.module.css'

const MoveFileModal = (props) => {
    const [dirs, setDirs] = useState([])
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)

    if (props.show) {
        fetchDirs()
        .then((data) => setDirs(data))
        .catch((e) => setError(e.response.data.message))
    }

    const moveFileHandler = (dir) => {
        moveFile(props.file.id, dir)
        .then((data) => {
            setError(null)
            setSuccess(data)
            props.update()
        })
        .catch((e) => {
            setSuccess(null)
            setError(e.response.data.message)
        })
    }

    const modalHide = () => {
        props.onHide()
        setError(null)
        setSuccess(null)
    }

    return (
        <Modal
            show={props.show}
            onHide={() => modalHide()}
            size="lg"
            className={styles.modal}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Виберіть папку
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {error && 
                    <Alert variant='warning'>
                        <FontAwesomeIcon icon='triangle-exclamation' className='me-1' />
                        {error}
                    </Alert>
                }
                {success && 
                    <Alert variant='success'>
                        <FontAwesomeIcon icon={faCircleCheck} className='me-1' />
                        {success}
                    </Alert>
                }
                <ListGroup>
                    {dirs.map((dir) =>
                        <ListGroup.Item
                            key={dir.id}
                            action
                            className='color-blue d-flex align-items-center'
                            onClick={() => moveFileHandler(dir)}
                        >
                            <FontAwesomeIcon icon={faFolderOpen} className='me-2' size='2x' />
                            <p className='roboto-medium m-0'>{dir.name}</p>
                        </ListGroup.Item>
                    )}
                </ListGroup>
            </Modal.Body>
            <Modal.Footer>
                <Button className='w-100 info-button' onClick={() => modalHide()}>
                    <FontAwesomeIcon icon={faRightLeft} className='me-2' />
                    Закрити
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default MoveFileModal