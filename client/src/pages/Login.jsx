import React, { useContext, useState } from 'react'
import { Form, Col, Button, Alert, Container, InputGroup } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { Context } from '../index'
import { login } from '../api/employeeApi'
import { PROFILE_ROUTE } from '../utils/constants'

const Login = observer(() => {
    const { employee } = useContext(Context)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const [passwordIcon, setPasswordIcon] = useState(faEyeSlash)
    const [passwordFieldType, setPasswordFieldType] = useState('password')
    const navigate = useNavigate()

    const authorize = async () => {
        try {
            setError(null)
            const data = await login(username, password)
            employee.setEmployee(data)
            employee.setIsAuth(true)
            navigate(PROFILE_ROUTE)
        } catch (error) {
            setError(error.response.data.message)
        }
    }

    return (
        <Container className='d-flex justify-content-center' fluid>
            <Col sm='12' md='8' className='shadow-sm p-3 mb-5 bg-white rounded'>
                <p className='fs-2 text-center roboto-bold'>Авторизація</p>
                <hr />
                <Form>
                    {error && 
                        <Alert variant='warning' className='w-50 text-center mx-auto'>
                            <FontAwesomeIcon icon='triangle-exclamation' className='me-1' />
                            {error}
                        </Alert>
                    }
                    <Form.Control
                        className='mb-3'
                        placeholder='Введіть Ваш логін...'
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        type='text'
                    />
                    <InputGroup className='mb-3'>
                        <Form.Control
                            placeholder='Введіть Ваш пароль...'
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            type={passwordFieldType}
                        />
                        <Button
                            className='info-solid-button'
                            onClick={() => {
                                if (passwordIcon === faEye) {
                                    setPasswordIcon(faEyeSlash)
                                    setPasswordFieldType('password')
                                } else {
                                    setPasswordIcon(faEye)
                                    setPasswordFieldType('text')
                                }
                            }}
                        >
                            <FontAwesomeIcon icon={passwordIcon} />
                        </Button>
                    </InputGroup>
                    <Button
                        className='success-button w-100'
                        onClick={() => authorize()}
                    >
                        Увійти
                    </Button>
                </Form>
            </Col>
        </Container>
    )
})

export default Login