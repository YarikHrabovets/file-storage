import React, { useContext } from 'react'
import { Context } from '../../index'
import { Container, Nav, Navbar, Button, Image } from 'react-bootstrap'
import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom'
import Logo from '../../assets/latkrok-logo.png'
import DefaultProfile from '../../assets/default-profile.jpg'
import { LOGIN_ROUTE, INDEX_ROUTE, PROFILE_ROUTE } from '../../utils/constants'
import styles from './NavBar.module.css'

const NavBar = observer(() => {
    const { employee } = useContext(Context)
    const navigate = useNavigate()
    const avatar = employee.employee.avatar ? `${process.env.REACT_APP_API_URL}media/${employee.employee.avatar}` : DefaultProfile

    return (
        <Navbar className={'shadow p-3 mb-5 bg-white mx-lg-5 mt-lg-3 rounded ' + styles.navbar}>
            <Container>
                <Navbar.Brand href={INDEX_ROUTE}>
                    <Image style={{height: '40px'}} src={Logo} alt='logo' />
                </Navbar.Brand>
                {employee.isAuth ?
                    <Nav>
                        <Nav.Link href={PROFILE_ROUTE}>
                            <Image src={avatar} alt='Фото профілю' className='avatar avatar-header' />
                        </Nav.Link>
                    </Nav>
                    :
                    <Nav>
                        <Button className='info-button' onClick={() => navigate(LOGIN_ROUTE)}>Авторизуватися</Button>
                    </Nav>
                }
            </Container>
        </Navbar>
    )
})

export default NavBar