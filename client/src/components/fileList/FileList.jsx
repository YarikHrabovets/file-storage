import React, { useContext, useState, useMemo, createRef } from 'react'
import { ListGroup, ToastContainer, Col } from 'react-bootstrap'
import File from './file/File'
import MsgToast from '../toasts/MsgToast'
import FileViewerModal from '../modals/FileViewerModal'
import MoveFileModal from '../modals/MoveFileModal'
import { Context } from '../../index'
import { deleteFile } from '../../api/filesApi'
import { observer } from 'mobx-react-lite'
import styles from './FileList.module.css'
import './FileList.css'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

const FileList = observer(({viewType, update}) => {
    const { files, employee } = useContext(Context)
    const [file, setFile] = useState('')
    const [fileViewerShow, setFileViewerShow] = useState(false)
    const [fileMoveShow, setFileMoveShow] = useState(false)
    const [toasts, setToasts] = useState([])

    const fileRefs = useMemo(() => files.files.map(() => createRef(null)), [files])

    const openDir = (id) => {
        files.setCurrentDir(id)
        files.pushToStack(id)
        setToasts([])
    }

    const openFile = (file) => {
        setFile(file)
        setFileViewerShow(true)
    }

    const deleteDir = (event, file) => {
        event.stopPropagation()
        deleteFile(file)
        .then((data) => {
            setToasts([...toasts, {'bg': 'light', 'message': data.message}])
            const filtered = files.files.filter((item) => item.id !== file.id)
            files.setFiles(filtered)
        })
        .catch((e) => setToasts([...toasts, {'bg': 'light', 'message': e.response.data.message}]))
    }

    const moveFile = (event, file) => {
        event.stopPropagation()
        setFile(file)
        setFileMoveShow(true)
    }

    if (files.files.length === 0) {
        return (
            <div className='text-center fs-4'>Наразі немає файлів</div>
        )
    }

    return (
        <>
            {viewType === 'list' ?
                <ListGroup variant='flush'>
                    <ListGroup.Item className={styles.listheader}>
                        <div className={'roboto-bold ' + styles.name}>Назва</div>
                        <div className={'roboto-bold ' + styles.date}>Дата</div>
                        <div className={'roboto-bold ' + styles.size}>Розмір</div>
                    </ListGroup.Item>
                    <TransitionGroup>
                        {files.files.map((file, index) => 
                            <CSSTransition key={file.id} nodeRef={fileRefs[index]} timeout={500} exit={false} classNames='file'>
                                <ListGroup.Item ref={fileRefs[index]} className='list-item' onClick={file.type === 'dir' ? () => openDir(file.id) : () => openFile(file)}>
                                    <File
                                        file={file}
                                        viewType={viewType}
                                        deleteDir={deleteDir}
                                        moveFile={moveFile}
                                    />
                                </ListGroup.Item>
                            </CSSTransition>
                        )}
                    </TransitionGroup>
                </ListGroup>
                :
                <TransitionGroup className='row'>
                    {files.files.map((file, index) => 
                        <CSSTransition key={file.id} nodeRef={fileRefs[index]} timeout={500} exit={false} classNames='file'>
                            <Col ref={fileRefs[index]} md={3} className='grid-item mb-3' onClick={file.type === 'dir' ? () => openDir(file.id) : () => openFile(file)}>
                                <File
                                    file={file}
                                    viewType={viewType}
                                    deleteDir={deleteDir}
                                    moveFile={moveFile}
                                />
                            </Col>
                        </CSSTransition>
                    )}
                </TransitionGroup>
            }
            <ToastContainer className='p-3' position='top-end' style={{ zIndex: 3 }}>
               {toasts.map((toast, index) => 
                    <MsgToast key={index} bg={toast.bg} message={toast.message} />
               )}
            </ToastContainer>
            <FileViewerModal 
                username={employee.employee.username}
                files={files}
                file={file}
                show={fileViewerShow}
                onHide={() => setFileViewerShow(false)}
            />
            <MoveFileModal
                file={file}
                update={update}
                show={fileMoveShow}
                onHide={() => setFileMoveShow(false)}
            />
        </>
    )
})

export default FileList