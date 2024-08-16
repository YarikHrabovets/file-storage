import { makeAutoObservable } from 'mobx'

export default class FilesStore {
    constructor() {
        this._files = []
        this._currentDir = null
        this._dirStack = []
        makeAutoObservable(this)
    }

    setFiles(files) {
        this._files = files
    }

    addFile(file) {
        this._files.push(file)
    }

    get files() {
        return this._files
    }
    
    setCurrentDir(dir) {
        this._currentDir = dir
    }

    get currentDir() {
        return this._currentDir
    }

    pushToStack(dir) {
        this._dirStack.push(dir)
    }

    popFromStack() {
        this._dirStack.pop()
        return this._dirStack[this._dirStack.length - 1]
    }

    get dirStack() {
        return this._dirStack
    }
}