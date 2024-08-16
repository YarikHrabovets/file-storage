import React, { useContext, useState } from 'react'
import { Modal, Button, Alert, ListGroup } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightLeft, faTrashCan, faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { observer } from 'mobx-react-lite'
import { Context } from '../../index'
import { deleteNotification } from '../../api/employeeApi'
import styles from './Modal.module.css'

const NotificationModal = observer((props) => {
    const { notifications } = useContext(Context)
    const [success, setSuccess] = useState(null)
    const [error, setError] = useState(null)

    const deleteNotificationHandler = (id) => {
        deleteNotification(id)
        .then((data) => {
            setError(null)
            setSuccess(data)
            notifications.deleteNotification(id)
        })
        .catch((e) => {
            setSuccess(null)
            setError(e.response.data.message)
        })
    }

    const hideModal = () => {
        props.onHide()
        setSuccess(null)
        setError(null)
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
                    Повідомлення
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
                {notifications.notifications.length === 0 &&
                    <p className='text-center m-0'>Нових повідомлень немає</p>
                }
                <ListGroup>
                    {notifications.notifications.map((item) =>
                        <ListGroup.Item className='color-blue roboto-light'>
                            <p className='mb-2'>Відправник: {item.sender}</p>
                            <div className='d-flex justify-content-between align-items-center'>
                                <p className='roboto-regular mb-1'>{item.message}</p>
                                <Button className='danger-button' onClick={() => deleteNotificationHandler(item.id)}>
                                    <FontAwesomeIcon icon={faTrashCan} className='me-1' />
                                    Видалити
                                </Button>
                            </div>
                            <p className='mb-1'>{item.createdAt.slice(0, 10)}</p>
                        </ListGroup.Item>
                    )}
                </ListGroup>
            </Modal.Body>
            <Modal.Footer>
                <Button className='w-100 info-button' onClick={() => hideModal()}>
                    <FontAwesomeIcon icon={faRightLeft} className='me-2' />
                    Закрити
                </Button>
            </Modal.Footer>
        </Modal>
    )
})

export default NotificationModal