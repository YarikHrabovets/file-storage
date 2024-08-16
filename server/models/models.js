const { sequelize } = require('../db')
const { DataTypes } = require('sequelize')
const disk = require('diskusage')
const os = require('os')

let path = os.platform() === 'win32' ? 'c:' : '/'
let info = disk.checkSync(path)

const Employee = sequelize.define('Employee', {
    id: {type: DataTypes.STRING, primaryKey: true},
    username: {type: DataTypes.STRING, unique: true, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false},
    role: {type: DataTypes.STRING, defaultValue: 'EMPLOYEE'},
    diskSpace: {type: DataTypes.BIGINT, defaultValue: info.total},
    spaceUsed: {type: DataTypes.BIGINT, defaultValue: info.available},
    avatar: {type: DataTypes.STRING}
})

const File = sequelize.define('File', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    type: {type: DataTypes.STRING},
    size: {type: DataTypes.BIGINT, defaultValue: 0},
    path: {type: DataTypes.STRING, defaultValue: ''}
})

const Notification = sequelize.define('Notification', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    message: {type: DataTypes.STRING, allowNull: false},
    sender: {type: DataTypes.STRING, allowNull: false}
})

Employee.hasMany(File, {as: 'files', foreignKey: 'employeeId'})
File.belongsTo(Employee, {as: 'employee', foreignKey: 'employeeId'})

File.hasMany(File, {as: 'children', foreignKey: 'parentId'})
File.belongsTo(File, {as: 'parent', foreignKey: 'parentId'})

Employee.hasMany(Notification, {as: 'notifications', foreignKey: 'recipientId'})
Notification.belongsTo(Employee, {as: 'recipient', foreignKey: 'recipientId'})

module.exports = {
    Employee,
    File,
    Notification
}