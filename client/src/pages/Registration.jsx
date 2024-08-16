import React, { useState } from 'react'
import { Button, Form, Alert } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { register } from '../api/employeeApi'
import LoginDetailsModal from '../components/modals/LoginDetailsModal'

const Registration = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isChecked, setIsChecked] = useState(false)
    const [detailsModal, setDetailsModal] = useState(false)
    const [loginDetails, setLoginDetails] = useState({})
    const [errors, setErrors] = useState([])
    const [disabled, setDisabled] = useState(false)

    const registerHandler = () => {
        setDisabled(true)
        setErrors([])
        setUsername('')
        setPassword('')
        const role = isChecked ? 'CHIEF' : 'EMPLOYEE'
        register(username, password, role)
        .then((data) => {
            setLoginDetails(data)
            setDetailsModal(true)
            setDisabled(false)
        })
        .catch((e) => {
            setDisabled(false)
            if (!!e.response.data.message.errors) {
                setErrors(e.response.data.message.errors)
            } else {
                setErrors([{msg: e.response.data.message}])
            }
        })
    }

    return (
        <>
            <h1 className='text-center roboto-bold'>Форма додавання співробітника</h1>
            <hr />
            {errors.map((error) => 
                <Alert variant='warning' className='mx-5'>
                    <FontAwesomeIcon icon='triangle-exclamation' className='me-1' />
                    {error.msg}
                </Alert>
            )}
            <Form className='w-50 mx-auto'>
                <Form.Group className='mb-3'>
                    <Form.Label className='roboto-bold'>Логін</Form.Label>
                    <Form.Control type='text' value={username} onChange={(e) => setUsername(e.target.value)} />
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label className='roboto-bold'>Пароль</Form.Label>
                    <Form.Control type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>
                <Form.Check 
                    className='roboto-bold' 
                    type='checkbox'
                    label='Надати права адміна'
                    checked={isChecked}
                    onChange={() => setIsChecked(!isChecked)}
                />
                <Button className='success-button w-100 mt-3' onClick={() => registerHandler()} disabled={disabled}>Створити</Button>
            </Form>
            <LoginDetailsModal loginDetails={loginDetails} show={detailsModal} onHide={() => setDetailsModal(false)} />
        </>
    )
}

export default Registration