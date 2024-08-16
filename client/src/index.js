import React, { createContext } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import EmployeeStore from './store/EmployeeStore'
import FileStore from './store/FilesStore'
import NotificationStore from './store/NotificationStore'

export const Context = createContext(null)

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Context.Provider value={{
    employee: new EmployeeStore(),
    files: new FileStore(),
    notifications: new NotificationStore()
  }}>
    <App />
  </Context.Provider>
)
