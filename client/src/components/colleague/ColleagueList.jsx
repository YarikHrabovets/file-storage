import React, { useEffect, useState } from 'react'
import { ListGroup, Alert } from 'react-bootstrap'
import { fetchColleagues } from '../../api/employeeApi'
import ColleagueItem from './ColleagueItem'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'

const ColleagueList = ({action, file}) => {
    const [colleagues, setColleagues] = useState([])
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)

    useEffect(() => {
        fetchColleagues()
        .then((data) => setColleagues(data))
        .catch((e) => setError(e.response.data.message))
    }, [])

    if (colleagues.length === 0) {
        return (
            <p className='text-center p-2'>Наразі нікого немає</p>
        )
    }

    return (
        <>
            {error && 
                <Alert variant='warning'>
                    <FontAwesomeIcon icon='triangle-exclamation' className='me-1' />
                    {error}
                </Alert>
            }
            {success && 
                <Alert variant='success'>
                    <FontAwesomeIcon icon={faCircleCheck} className='me-1' />
                    {success}
                </Alert>
            }
            <ListGroup>
                {colleagues.map((colleague) =>
                    <ColleagueItem
                        key={colleague.id}
                        colleague={colleague}
                        action={action}
                        file={file}
                        setError={setError}
                        setSuccess={setSuccess}
                    />
                )}
            </ListGroup>
        </>
    )
}

export default ColleagueList