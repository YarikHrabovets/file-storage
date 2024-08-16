import React, { useEffect, useContext, useState } from 'react'
import { Container, Button, ButtonGroup, Alert, Form, Spinner } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleLeft, faFolderPlus, faFileArrowUp, faGrip } from '@fortawesome/free-solid-svg-icons'
import { Context } from '../index'
import { fetchFiles, searchFile } from '../api/filesApi'
import FileList from '../components/fileList/FileList'
import CreateDirModal from '../components/modals/CreateDirModal'
import UploadFileModal from '../components/modals/UploadFileModal'
import { observer } from 'mobx-react-lite'

const Disk = observer(() => {
    const { files } = useContext(Context)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)
    const [dirModalShow, setDirModalShow] = useState(false)
    const [uploadModalShow, setUploadModalShow] = useState(false)
    const [sort, setSort] = useState('')
    const [search, setSearch] = useState('')
    const [searchTimeout, setSearchTimeout] = useState(false)
    const [viewType, setViewType] = useState('list')

    const fetchFilesHandler = () => {
        fetchFiles(files.currentDir, sort)
        .then((data) => {
            setError(null)
            files.setFiles(data)
        })
        .catch((e) => setError(e.response.data.message))
        .finally(() => setLoading(false))
    }

    useEffect(() => {
        fetchFilesHandler()
    }, [files.currentDir, sort])

    const returnBack = () => {
        const prevDir = files.popFromStack() || null
        files.setCurrentDir(prevDir)
    }

    const searchHandler = (e) => {
        setSearch(e.target.value)
        if (searchTimeout !== false) {
            clearTimeout(searchTimeout)
        }
        if (e.target.value === '') {
            setLoading(false)
            fetchFilesHandler()
        } else {
            setLoading(true)
            setSearchTimeout(setTimeout((value) => {
                searchFile(value)
                .then((data) => {
                    setError(null)
                    files.setFiles(data)
                })
                .catch((e) => setError(e.response.data.message))
                .finally(() => setLoading(false))
            }, 500, e.target.value))
        }
    }

    return (
        <Container>
            {error && 
                <Alert variant='warning'>
                    <FontAwesomeIcon icon='triangle-exclamation' className='me-1' />
                    {error}
                </Alert>
            }
            <div className='d-flex justify-content-between mt-3'>
                <ButtonGroup>
                    {files.currentDir && 
                        <Button className='info-button' onClick={() => returnBack()}>
                            <FontAwesomeIcon icon={faCircleLeft} className='me-2' />
                            Назад
                        </Button>
                    }
                    <Button className='info-button' onClick={() => setDirModalShow(true)}>
                        <FontAwesomeIcon icon={faFolderPlus} className='me-2' />
                        Створити папку
                    </Button>
                    <Button className='info-button' onClick={() => setUploadModalShow(true)}>
                        <FontAwesomeIcon icon={faFileArrowUp} className='me-2' />
                        Завантажити файли
                    </Button>
                </ButtonGroup>
                <Form.Control
                    value={search}
                    onChange={(e) => searchHandler(e)}
                    className='w-50'
                    placeholder='Введіть назву файлу...'
                    type='text'
                />
            </div>
            <div className='d-flex mt-3'>
                <Form.Select value={sort} onChange={(e) => setSort(e.target.value)}>
                    <option>Виберіть сортування</option>
                    <option value="name">По імені</option>
                    <option value="type">По типу</option>
                    <option value="date">По даті</option>
                </Form.Select>
                <Button className='icon-button' onClick={() => setViewType('list')}>
                    <FontAwesomeIcon icon='list' size='xl' />
                </Button>
                <Button className='icon-button' onClick={() => setViewType('grid')}>
                    <FontAwesomeIcon icon={faGrip} size='xl' />
                </Button>
            </div>
            <hr />
            {loading ? 
                <div className='mt-5 text-center'>
                    <Spinner animation='border' variant="dark" />
                </div>
                :
                <FileList viewType={viewType} update={fetchFilesHandler} />
            }
            <CreateDirModal files={files} show={dirModalShow} onHide={() => setDirModalShow(false)} />
            <UploadFileModal files={files} show={uploadModalShow} onHide={() => setUploadModalShow(false)} />
        </Container>
    )
})

export default Disk