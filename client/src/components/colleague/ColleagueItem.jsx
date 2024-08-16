import React from 'react'
import { ListGroupItem, Image } from 'react-bootstrap'
import { shareFile } from '../../api/filesApi'
import DefaultProfile from '../../assets/default-profile.jpg'

const ColleagueItem = ({colleague, action, file, setError, setSuccess}) => {
    const avatar = colleague.avatar ? `${process.env.REACT_APP_API_URL}media/${colleague.avatar}` : DefaultProfile

    const shareFileHandler = (recipient) => {
        shareFile(recipient, file)
        .then((data) => {
            setError(null)
            setSuccess(data)
        })
        .catch((e) => {
            setSuccess(null)
            setError(e.response.data.message)
        })
    }

    if (action) {
        return (
            <ListGroupItem action className='d-flex align-items-center' onClick={() => shareFileHandler(colleague.id)}>
                <Image src={avatar} alt='Фото профілю' className='avatar-list' />
                <span className='fs-6 color-blue ms-2'>{colleague.username}</span>
            </ListGroupItem>
        )
    }

    return (
        <ListGroupItem className='d-flex align-items-center top-not-rounded'>
            <Image src={avatar} alt='Фото профілю' className='avatar-list' />
            <span className='fs-6 color-blue ms-2'>{colleague.username}</span>
        </ListGroupItem>
    )
}

export default ColleagueItem