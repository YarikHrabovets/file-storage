import React from 'react'
import { Modal } from 'react-bootstrap'
import styles from './Modal.module.css'

const LoginDetailsModal = (props) => {
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
                    Деталі для входу
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p><span className='roboto-bold'>Логін: </span>{props.loginDetails.username}</p>
                <p><span className='roboto-bold'>Пароль: </span>{props.loginDetails.password}</p>
                <p><span className='roboto-bold'>Роль: </span>{props.loginDetails.role}</p>
            </Modal.Body>
        </Modal>
    )
}

export default LoginDetailsModal