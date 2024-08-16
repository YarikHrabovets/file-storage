import React, { useState } from 'react'
import { Form, Button, Alert } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { updatePassword } from '../api/employeeApi'

const SecuritySettings = () => {
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [errors, setErrors] = useState([])
    const [success, setSuccess] = useState(null)

    const updatePasswordHandler = () => {
        updatePassword(currentPassword, newPassword)
        .then((data) => {
            setErrors([])
            setSuccess(data.message)
        })
        .catch((e) => {
            setSuccess(null)
            if (!!e.response.data.message.errors) {
                setErrors(e.response.data.message.errors)
            } else {
                setErrors([{msg: e.response.data.message}])
            }
        })
    }

    return (
        <>
            <h1 className='text-center roboto-bold'>Налаштування безпеки</h1>
            <hr />
            {success && 
                <Alert variant='success' className='mx-5'>
                    <FontAwesomeIcon icon={faCircleCheck} className='me-1' />
                    {success}
                </Alert>
            }
            {errors.map((error) => 
                <Alert variant='warning' className='mx-5'>
                    <FontAwesomeIcon icon='triangle-exclamation' className='me-1' />
                    {error.msg}
                </Alert>
            )}
            <Form className='w-50 mx-auto'>
                <Form.Group className='mb-3'>
                    <Form.Label className='roboto-bold'>Дійсний пароль</Form.Label>
                    <Form.Control type='password' value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label className='roboto-bold'>Новий пароль</Form.Label>
                    <Form.Control type='password' value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                </Form.Group>
                <Button className='success-button w-100 mt-3' onClick={() => updatePasswordHandler()}>Змінити пароль</Button>
            </Form>
        </>
    )
}

export default SecuritySettings