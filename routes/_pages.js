import express from 'express'

import pageCreate from '../controllers/_pageCreate.js'
import pageGetById from '../controllers/_pageGetById.js'
import pagesGet from '../controllers/_pagesGet.js'

const router = express.Router()

router.get('/:id', pageGetById)
router.get('/', pagesGet)
router.post('/', pageCreate)

export default router 