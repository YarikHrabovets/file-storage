import React, { useState } from 'react'
import { Toast, Image } from 'react-bootstrap'
import Logo from '../../assets/footprints-128.png'

const MsgToast = (props) => {
    const [show, setShow] = useState(true)

    return (
        <Toast bg={props.bg} show={show} onClose={() => setShow(false)} delay={3000} autohide>
            <Toast.Header>
                <div className='w-100'>
                    <Image className='me-2' style={{height: '20px'}} src={Logo} alt='logo' />
                    <strong>Повідомлення</strong>
                </div>
            </Toast.Header>
            <Toast.Body>{props.message}</Toast.Body>
        </Toast>
    )
}

export default MsgToast