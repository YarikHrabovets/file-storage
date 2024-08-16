import React from 'react'
import { Container, Row, Col, Image } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import Shield from '../assets/shield.svg'
import Sync from '../assets/sync.svg'
import Storage from '../assets/storage.svg'

const Index = () => {
    return (
        <Container fluid className='mb-5'>
            <p className='text-center fs-1'>Файлове сховище компанії <strong>Латкрок-Сервіс</strong></p>
            <Row className='mt-5'>
                <Col md='4' className='d-flex flex-column text-center justify-content-center'>
                    <Image style={{height: '150px'}} src={Shield} alt='Shied' />
                    <p className='roboto-medium mt-3'>Надійне та безпечне рішення</p>
                </Col>
                <Col md='4' className='d-flex flex-column text-center justify-content-center'>
                    <Image style={{height: '150px'}} src={Sync} alt='Sync' />
                    <p className='roboto-medium mt-3'>Ділися файлами + Віддалений доступ</p>
                </Col>
                <Col md='4' className='d-flex flex-column text-center justify-content-center'>
                    <Image style={{height: '150px'}} src={Storage} alt='Storage' />
                    <p className='roboto-medium mt-3'>Місцевий хостинг</p>
                </Col>
            </Row>
            <Row className='background-dark mt-5 p-5 text-white'>
                <Col md='6'>
                    <h4>Корпоративне сховище файлів та співпраця</h4>
                    <hr />
                    <p className='roboto-thin'>
                        Ласкаво просимо до нашого корпоративного сховища файлів — рішення, 
                        яке забезпечує папки, файли, безпечний обмін і співпрацю.
                        З нашим сервісом ви отримуєте доступ до файлів 24/7, з будь-якого місця та на будь-якому пристрої.
                        Наш простий та інтуїтивний інтерфейс полегшує організацію та управління документами.
                    </p>
                </Col>
                <Col md='6' className='d-flex justify-content-center'>
                    <div className='me-5'>
                        <div className='text-center'>
                            <FontAwesomeIcon className='mb-3' icon='list' size='2xl' />
                            <p>Мої файли</p>
                        </div>
                        <div className='text-center'>
                            <FontAwesomeIcon icon='people-group' size='2xl' />
                            <p>Моя команда</p>
                        </div>
                    </div>
                    <div>
                        <div className='text-center'>
                            <FontAwesomeIcon className='mb-3' icon='business-time' size='2xl' />
                            <p>Доступність 24/7</p>
                        </div>
                        <div className='text-center'>
                            <FontAwesomeIcon icon='square-share-nodes' size='2xl' />
                            <p>Відправлення файлів</p>
                        </div>
                    </div>
                </Col>
            </Row>
            <Row className='background-blue p-2 text-center'>
                <div className='d-flex justify-content-center color-gold'>
                    {
                        [...Array(5)].map((index, i) => (
                            <FontAwesomeIcon key={i} icon={faStar} className='me-1' size='sm' />
                        ))
                    }
                </div>
            </Row>
        </Container>
    )
}

export default Index