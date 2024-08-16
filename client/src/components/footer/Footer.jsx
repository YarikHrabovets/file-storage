import React from 'react'
import { Image } from 'react-bootstrap'
import Logo from '../../assets/footprints-128.png'
const Footer = () => {
    return (
        <footer className='d-flex justify-content-between align-items-center px-3 mt-5 bg-white shadow '>
            <Image src={Logo} style={{height: '50px'}} alt='logo' />
            <div className='roboto-light'>&copy; Усі права захищені {new Date().getFullYear()}</div>
        </footer>
    )
}

export default Footer