import { host, authHost } from './index'
import { jwtDecode } from 'jwt-decode'


export const register = async (username, password, role) => {
    const { data } = await authHost.post('server/employee/registration', {username, password, role})
    return data
}

export const login = async (username, password) => {
    const { data } = await host.post('server/employee/login', {username, password})
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const authentication = async () => {
    const { data } = await authHost.get('server/employee/authentication')
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const updatePassword = async (currentPassword, newPassword) => {
    const { data } = await authHost.post('server/employee/update-password', {currentPassword, newPassword})
    return data
}

export const updateLogin = async (newLogin) => {
    const { data } = await authHost.post('server/employee/update-login', {newLogin})
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const uploadAvatar = async (file) => {
    const formData = new FormData()
    formData.append('file', file)
    const { data } = await authHost.post('server/employee/upload', formData)
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const deleteAvatar = async () => {
    const { data } = await authHost.delete('server/employee/delete')
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const fetchColleagues = async () => {
    const { data } = await authHost.get('server/employee/colleagues')
    return data
}

export const fetchDiskSpace = async () => {
    const { data } = await authHost.get('server/employee/disk-space')
    return data
}

export const fetchNotifications = async () => {
    const { data } = await authHost.get('server/employee/notifications')
    return data
}

export const deleteNotification = async (id) => {
    const { data } = await authHost.delete(`server/employee/notification-delete?id=${id}`)
    return data.message
}