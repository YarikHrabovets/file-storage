import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button, Image, Row, Col, Alert } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Context } from '../index'
import { uploadAvatar, deleteAvatar, updateLogin } from '../api/employeeApi'
import { PROFILE_ROUTE } from '../utils/constants'
import { observer } from 'mobx-react-lite'

const AccountSettings = observer(() => {
    const { employee } = useContext(Context)
    const navigate = useNavigate()
    const [newLogin, setNewLogin] = useState(employee.employee.username)
    const [file, setFile] = useState(null)
    const [changeButtonPressed, setChangeButtonPressed] = useState(false)
    const [deleteButtonPressed, setDeleteButtonPressed] = useState(false)
    const [error, setError] = useState(null)
    const avatar = `${process.env.REACT_APP_API_URL}media/${employee.employee.avatar}`

    const changeProfileHandler = () => {
        setChangeButtonPressed(true)
        if (newLogin !== employee.employee.username) {
            updateLogin(newLogin)
            .then((data) => {
                employee.setEmployee(data)
                navigate(PROFILE_ROUTE)
            })
            .catch((e) => setError(e.response.data.message.errors[0].msg))
        }
        if (file) {
            uploadAvatar(file)
            .then((data) => {
                employee.setEmployee(data)
                navigate(PROFILE_ROUTE)
            })
            .catch((e) => setError(e.response.data.message))
        }
    }

    const deleteAvatarHandler = () => {
        setDeleteButtonPressed(true)
        deleteAvatar()
        .then((data) => {
            employee.setEmployee(data)
            navigate(PROFILE_ROUTE)
        })
        .catch((e) => setError(e.response.data.message))
    }

    if (!employee.employee.avatar) {
        return (
            <>
                <h1 className='text-center roboto-bold'>Налаштування аккаунту</h1>
                <hr />
                {error && 
                    <Alert variant='warning' className='mx-5'>
                        <FontAwesomeIcon icon='triangle-exclamation' className='me-1' />
                        {error}
                    </Alert>
                }
                <Form className='w-50 mx-auto'>
                    <Form.Group className='mb-3'>
                        <Form.Label className='roboto-bold'>Новий логін</Form.Label>
                        <Form.Control 
                            type='text'
                            value={newLogin}
                            onChange={(e) => setNewLogin(e.target.value)} 
                        />
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label className='roboto-bold'>Нове фото профілю</Form.Label>
                        <Form.Control type='file' accept='image/*' onChange={(e) => setFile(e.target.files[0])} />
                    </Form.Group>
                    <Button className='success-button w-100 mt-3' onClick={() => changeProfileHandler()}>Змінити</Button>
                </Form>
            </>
        )
    }

    if (employee.employee.avatar) {
        return (
            <>
                <h1 className='text-center roboto-bold'>Налаштування аккаунту</h1>
                <hr />
                {error && 
                    <Alert variant='warning' className='mx-5'>
                        <FontAwesomeIcon icon='triangle-exclamation' className='me-1' />
                        {error}
                    </Alert>
                }
                <Row className='mx-3'>
                    <Col md='5' className='align-self-end'>
                        <Form>
                            <Form.Group className='mb-3'>
                                <Form.Label className='roboto-bold'>Новий логін</Form.Label>
                                <Form.Control 
                                    type='text'
                                    value={newLogin}
                                    onChange={(e) => setNewLogin(e.target.value)} 
                                />
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Form.Label className='roboto-bold'>Нове фото профілю</Form.Label>
                                <Form.Control type='file' accept='image/*' onChange={(e) => setFile(e.target.files[0])} />
                            </Form.Group>
                            <Button className='success-button w-100 mt-3' onClick={() => changeProfileHandler()} disabled={deleteButtonPressed}>Змінити</Button>
                        </Form>
                    </Col>
                    <Col md='2' className='text-center'>
                        <div className='vr h-50'></div>
                        <h3>АБО</h3>
                        <div className='vr h-50'></div>
                    </Col>
                    <Col md='5'>
                        <div className='text-center'>
                            <Image src={avatar} alt='Фото профілю' className='img-thumbnail' />
                        </div>
                        <Button className='danger-button w-100 mt-3' onClick={() => deleteAvatarHandler()} disabled={changeButtonPressed}>Видалити фото</Button>
                    </Col>
                </Row>
            </>
        )
    }
})

export default AccountSettings