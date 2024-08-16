const Router = require('express')
const router = new Router()
const fileController = require('../controllers/fileController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('', authMiddleware, fileController.createDir)
router.post('/upload', authMiddleware, fileController.uploadFile)
router.post('/share-file', authMiddleware, fileController.shareFile)
router.post('/move-file', authMiddleware, fileController.moveFile)
router.get('', authMiddleware, fileController.fetchFiles)
router.get('/download', authMiddleware, fileController.downloadFile)
router.get('/search', authMiddleware, fileController.searchFile)
router.get('/dirs', authMiddleware, fileController.fetchDirs)
router.delete('/delete', authMiddleware, fileController.deleteFile)

module.exports = router