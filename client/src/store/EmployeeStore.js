import { makeAutoObservable } from 'mobx'

export default class EmployeeStore {
    constructor() {
        this._isAuth = false
        this._employee = {}
        makeAutoObservable(this)
    }

    setIsAuth(status) {
        this._isAuth = status
    }

    get isAuth() {
        return this._isAuth
    }

    setEmployee(employee) {
        this._employee = employee
    }

    get employee() {
        return this._employee
    }
}