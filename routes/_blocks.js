import express from 'express'

import blockGet from '../controllers/_blockGet.js'
import blockAppend from '../controllers/_blockAppend.js'
import blockEdit from '../controllers/_blockEdit.js'

const router = express.Router()

router.get('/', blockGet)
router.patch('/:blockId', blockEdit)
router.patch('/', blockAppend)
// router.post('/', auth, blockCreate)
// router.patch('/', auth, blockUpdate)

export default router 