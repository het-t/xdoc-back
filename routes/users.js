import express from 'express'

import auth from '../controllers/auth.js'

import userCreate from '../controllers/userCreate.js'
import userList from '../controllers/userList.js'
import userDelete from '../controllers/userDelete.js'

const router = express.Router()

router.post('/', auth, userCreate)
router.get('/', auth, userList)
router.delete('/', auth, userDelete)

export default router