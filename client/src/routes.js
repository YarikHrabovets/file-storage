import { LOGIN_ROUTE, REGISTRATION_ROUTE, INDEX_ROUTE, PROFILE_ROUTE, DISK_ROUTE, ACCOUNT_ROUTE, SECURITY_ROUTE } from './utils/constants'
import Index from './pages/Index'
import Login from './pages/Login'
import Registration from './pages/Registration'
import Profile from './pages/Profile'
import Disk from './pages/Disk'
import AccountSettings from './pages/AccountSettings'
import SecuritySettings from './pages/SecuritySettings'


export const authRoutes = [
    {
        path: PROFILE_ROUTE,
        component: Profile
    },
    {
        path: DISK_ROUTE,
        component: Disk
    },
    {
        path: ACCOUNT_ROUTE,
        component: AccountSettings
    },
    {
        path: SECURITY_ROUTE,
        component: SecuritySettings
    }
]

export const chiefRoutes = [
    {
        path: REGISTRATION_ROUTE,
        component: Registration
    }
]

export const publicRoutes = [
    {
        path: INDEX_ROUTE,
        component: Index
    },
    {
        path: LOGIN_ROUTE,
        component: Login
    }
]