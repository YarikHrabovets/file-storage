import React, { useEffect, useState } from 'react'
import { ProgressBar } from 'react-bootstrap'
import { fetchDiskSpace } from '../../api/employeeApi'
import formatBytes from '../../utils/formatBytes'

const DiskSpaceBar = () => {
    const [space, setSpace] = useState({})
    const [usedPersent, setUsedPersent] = useState(0)

    useEffect(() => {
        fetchDiskSpace()
        .then((data) => {
            setSpace(data)
            const persent = Math.round(data.spaceUsed / data.diskSpace * 100)
            setUsedPersent(persent)
        })
    }, [])

    return (
        <>
            <p className='roboto-bold text-center m-0'>Інформація про пам'ять на диску</p>
            <div className='d-flex justify-content-between'>
                <div>{formatBytes(space.spaceUsed)}</div>
                <div>{formatBytes(space.diskSpace)}</div>
            </div>
            <ProgressBar animated variant='success' now={usedPersent} label={`${usedPersent}%`}></ProgressBar>
        </>
    )
}

export default DiskSpaceBar