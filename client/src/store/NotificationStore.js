import { makeAutoObservable } from "mobx";

export default class NotificationStore {
    constructor() {
        this._notifications = []
        makeAutoObservable(this)
    }

    setNotifications(notifications) {
        this._notifications = notifications
    }

    deleteNotification(id) {
        this._notifications = this._notifications.filter((item) => item.id !== id)
    }

    get notifications() {
        return this._notifications
    }
}