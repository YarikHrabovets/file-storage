import React, { useContext } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { INDEX_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE } from '../utils/constants'
import { authRoutes, chiefRoutes, publicRoutes } from '../routes'
import { Context } from '../index'
import Footer from './footer/Footer'

const AppRouter = () => {
    const { employee } = useContext(Context)
    const currentUrl = useLocation().pathname
    const isFooter = currentUrl !== LOGIN_ROUTE && currentUrl !== REGISTRATION_ROUTE

    return (
        <>
            <div style={{flex: '1 1 auto'}} className='mt-5'>
                <Routes>
                    {employee.isAuth && authRoutes.map(({path, component}) =>
                        <Route key={path} path={path} Component={component} exact />
                    )}
                    {employee.employee.role === 'CHIEF' && chiefRoutes.map(({path, component}) =>
                        <Route key={path} path={path} Component={component} exact />
                    )}
                    {publicRoutes.map(({path, component}) =>
                        <Route key={path} path={path} Component={component} exact />
                    )}
                    <Route path='*' element={<Navigate to={INDEX_ROUTE} />} />
                </Routes>
            </div>
            {isFooter && <Footer />}
        </>
    )
}

export default AppRouter