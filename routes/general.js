import express from 'express'
import login from '../controllers/login.js'
import keepMeLogin from '../controllers/keepMeLogin.js'

const router = express.Router()

router.get('/', keepMeLogin)
router.post('/', login)

export default router