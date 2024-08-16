import { authHost } from './index'

export const fetchFiles = async (dirId, sort) => {
    let url = 'server/files/'
    if (dirId) {
        url = `server/files?parent=${dirId}`
    }
    if (sort) {
        url = `server/files?sort=${sort}`
    }
    if (dirId && sort) {
        url = `server/files?parent=${dirId}&sort=${sort}`
    }
    const { data } = await authHost.get(url)
    return data
}

export const createDir = async (dirId, name) => {
    const { data } = await authHost.post('server/files', {name, type: 'dir', parent: dirId})
    return data
}

export const uploadFile = async (dirId, file) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('parent', dirId)
    const { data } = await authHost.post('server/files/upload', formData)
    return data
}

export const downloadFile = async (file) => {
    const { data } = await authHost.get(`server/files/download?id=${file.id}`, {responseType: 'blob'})
    return data
}

export const deleteFile = async (file) => {
    const { data } = await authHost.delete(`server/files/delete?id=${file.id}`)
    return data
}

export const searchFile = async (value) => {
    const { data } = await authHost.get(`server/files/search?search=${value}`)
    return data
}

export const shareFile = async (recipient, file) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('recipient', recipient)
    const { data } = await authHost.post('server/files/share-file', formData)
    return data.message
}

export const fetchDirs = async () => {
    const { data } = await authHost.get('server/files/dirs')
    return data
}

export const moveFile = async (fileId, dir) => {
    const { data } = await authHost.post('server/files/move-file', {fileId, dir})
    return data.message
}