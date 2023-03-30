import express from 'express'

import auth from '../controllers/auth.js'
import blockGet from '../controllers/blockGet.js'

const router = express.Router()

router.get('/', auth, blockGet)

export default router 