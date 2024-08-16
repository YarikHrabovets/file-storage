import React, { useContext, useEffect, useState } from 'react'
import { Container, Row, Col, Button, ListGroup, Image, Alert, Spinner, Badge } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faShieldHalved, faUserPlus, faServer } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { Context } from '../index'
import DefaultProfile from '../assets/default-profile.jpg'
import { LOGIN_ROUTE, DISK_ROUTE, SECURITY_ROUTE, ACCOUNT_ROUTE, REGISTRATION_ROUTE } from '../utils/constants'
import { fetchNotifications } from '../api/employeeApi'
import ColleagueList from '../components/colleague/ColleagueList'
import DiskSpaceBar from '../components/DiskSpaceBar/DiskSpaceBar'
import NotificationModal from '../components/modals/NotificationModal'

const Profile = observer(() => {
    const { employee, notifications } = useContext(Context)
    const [modalShow, setModalShow] = useState(false)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const navigate = useNavigate()
    const avatar = employee.employee.avatar ? `${process.env.REACT_APP_API_URL}media/${employee.employee.avatar}` : DefaultProfile

    useEffect(() => {
        fetchNotifications()
        .then((data) => {
            setError(null)
            notifications.setNotifications(data)
        })
        .catch((e) => setError(e.response.data.message))
        .finally(() => setLoading(false))
    }, [])

    const logout = () => {
        employee.setEmployee({})
        employee.setIsAuth(false)
        localStorage.setItem('token', '')
        navigate(LOGIN_ROUTE)
    }

    if (loading) {
        return (
            <div className='position-absolute top-50 start-50 translate-middle'>
                <Spinner animation='border' variant="dark" />
            </div>
        )
    }

    return (
        <Container>
            {error && 
                <Alert variant='warning' dismissible>
                    <FontAwesomeIcon icon='triangle-exclamation' className='me-1' />
                    {error}
                </Alert>
            }
            <Row className='gap-5 justify-content-center'>
                <Col md='7' className='shadow-sm p-3 mb-5 bg-white rounded' style={{height: '465px'}}>
                    <h1 className='text-center roboto-bold'>{employee.employee.username}</h1>
                    <hr />
                    <div className='d-flex gap-5 align-items-center mb-5'>
                        <Image src={avatar} alt='Фото профілю' className='avatar' />
                        <div>
                            <p><span className='roboto-bold'>ID працівника: </span>{employee.employee.id}</p>
                            <p><span className='roboto-bold'>Роль працівника: </span>{employee.employee.role}</p>
                        </div>
                    </div>
                    <DiskSpaceBar />
                    <Button className='w-100 danger-button mt-5' onClick={() => logout()}>
                        Вийти з облікового запису
                    </Button>
                </Col>
                <Col md='3'>
                    <div className='shadow-sm mb-3 bg-white rounded'>
                        <div className='background-dark top-rounded text-white p-2'>
                            Меню
                        </div>
                        <ListGroup variant='flush'>
                            <ListGroup.Item action className='color-blue' onClick={() => setModalShow(true)}>
                                <Badge bg='danger' className='me-2'>{notifications.notifications.length}</Badge>
                                Повідомлення
                            </ListGroup.Item>
                            <ListGroup.Item action className='color-blue' href={DISK_ROUTE}>
                                <FontAwesomeIcon icon={faServer} className='me-2' />
                                Файловий менеджер
                            </ListGroup.Item>
                            <ListGroup.Item action className='color-blue' href={ACCOUNT_ROUTE}>
                                <FontAwesomeIcon icon={faUser} className='me-2' />
                                Аккаунт
                            </ListGroup.Item>
                            <ListGroup.Item action className='rounded color-blue' href={SECURITY_ROUTE}>
                                <FontAwesomeIcon icon={faShieldHalved} className='me-2' />
                                Безпека
                            </ListGroup.Item>
                            {employee.employee.role === 'CHIEF' &&
                                <ListGroup.Item action className='rounded color-blue' href={REGISTRATION_ROUTE}>
                                    <FontAwesomeIcon icon={faUserPlus} className='me-2' />
                                    Додати нового співробітника
                                </ListGroup.Item>
                            }
                        </ListGroup>
                    </div>
                    <div className='shadow-sm mb-5 bg-white rounded'>
                        <div className='background-dark top-rounded text-white p-2'>
                            Мої колеги
                        </div>
                        <ColleagueList action={false} />
                    </div>
                </Col>
            </Row>
            <NotificationModal show={modalShow} onHide={() => setModalShow(false)} />
        </Container>
    )
})

export default Profile