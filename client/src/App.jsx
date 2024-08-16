import React, { useContext, useEffect, useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTriangleExclamation, faSquareShareNodes, faPeopleGroup, faBusinessTime, faList } from '@fortawesome/free-solid-svg-icons'
import { observer } from 'mobx-react-lite'
import { Spinner, Alert, Container } from 'react-bootstrap'
import AppRouter from './components/AppRouter'
import NavBar from './components/navbar/NavBar'
import { Context } from './index'
import { authentication } from './api/employeeApi'

library.add(faTriangleExclamation, faSquareShareNodes, faPeopleGroup, faPeopleGroup, faBusinessTime, faList)

const App = observer(() => {
    const { employee } = useContext(Context)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        authentication()
        .then((data) => {
            setError(null)
            employee.setEmployee(data)
            employee.setIsAuth(true)
        })
        .catch((e) => setError(e.response.data.message))
        .finally(() => setLoading(false))
    }, [])

    if (loading) {
        return (
            <div className='position-absolute top-50 start-50 translate-middle'>
                <Spinner animation='border' variant="dark" />
            </div>
        )
    }

    return (
        <BrowserRouter>
            <NavBar />
            {error && 
                <Container>
                    <Alert variant='warning' dismissible>
                        <FontAwesomeIcon icon='triangle-exclamation' className='me-1' />
                        {error}
                    </Alert>
                </Container>
            }
            <AppRouter />
        </BrowserRouter>
    )
})

export default App
